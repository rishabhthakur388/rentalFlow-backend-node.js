const USERDATASMODEL = require('../models/userDatasModel');
const ITEMSMODEL = require('../models/addItems');
const AVALIBILITYMODEL = require('../models/itemAvalibility');
const moment = require('moment');
const REVIEWMODEL = require("../models/reviewsModel");
const LISTINGMODEL = require('../models/listingModel');
const BOOKINGITEMMODEL = require('../models/bookingModel');
const response = require('../helper/responseFile');
const { uploadImage, uploadVideos } = require('../config/firebaseConfig');
const { default: mongoose } = require('mongoose');
const { enterTheAvailabilityOfItems,
  enterTheCorrectServiceProviderId,
  invailedItemId,
  pleaseEntertheVailedTime,
  itemAvailabilitiesAreAdded,
  pleaseEnterTheCorrectItemId,
  reviewAfterTheBookingOfTheItem,
  reviewIsAddedToItem,
  reviewAfterTheComplitionOfBooking,
  youCanDeleteYourItemsOnly,
  userReviewDataIsHere,
  itemDeleteSuccessfully } = require('../helper/constants');

exports.createItem = async (req, res) => {
  try {
    const {
      availabilityData,
      nameOfItemYouAreListing,
      locationName,
      itemDiscription,
      rating,
      rentalRules,
      itemSubCategory,
      minimumRental,
      quantity,
      price,
      deposite_inCash,
      ownerDelivery,
      delivery_fee,
      rentalPichkup,
      businessAddress,
      availability,
      lat,
      lng
    } = req.body;

    if (!availabilityData) {
      return response.failedResponse(res, enterTheAvailabilityOfItems);
    }

    const points = [Number(lng), Number(lat)];
    const pictureUrl = await uploadVideos(req.file);

    const itemPayload = {
      nameOfItemYouAreListing,
      itemDiscription,
      rentalRules,
      itemSubCategory,
      itemPicture: req.file.filename,
      pictureUrl,
      minimumRental,
      quantity,
      price,
      deposite_inCash,
      ownerDelivery,
      delivery_fee,
      rentalPichkup,
      businessAddress,
      availability,
      rating,
      location: {
        type: "Point",
        coordinates: points
      },
      serviceProviderId: req.user.id,
      locationName
    };
    const createdItem = await ITEMSMODEL.create(itemPayload);
    if (typeof availabilityData === "string") {
      const parsedAvailabilityData = JSON.parse(availabilityData);
      const availData = Object.values(parsedAvailabilityData).flat();

      const availabilityBulkData = availData.map(availability => {
        const { StartTime, EndTime, day } = availability;
        const startTimeFormatted = moment(StartTime, ['h:mma', 'H:mm']).format('HH:mm');
        const endTimeFormatted = moment(EndTime, ['h:mma', 'H:mm']).format('HH:mm');

        if (startTimeFormatted.slice(0, 2) > "9" || endTimeFormatted.slice(0, 2) > "17" || startTimeFormatted.slice(0, 2) > endTimeFormatted.slice(0, 2)) {
          throw new Error(pleaseEntertheVailedTime);
        }
        return {
          day,
          itemId: createdItem._id,
          StartTime: startTimeFormatted,
          EndTime: endTimeFormatted,
          serviceProviderId: req.user.id,
        };
      });
      await AVALIBILITYMODEL.insertMany(availabilityBulkData);
    }

    return response.successResponse(res, itemAvailabilitiesAreAdded);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
exports.showsSingleItemToUser = async (req, res) => {
  try {
    const itemId = req.query.itemId
    const findItemId = await ITEMSMODEL.findOne({ _id: itemId })
    return response.successResponseData(res, findItemId)
  } catch (err) {
    return res.failedResponse(res, err.message)
  }
};
exports.showsAllItemToUser = async (req, res) => {
  try {
    const serviceProviderId = req.user.id
    const findItemId = await ITEMSMODEL.find({ serviceProviderId: serviceProviderId })
    return response.successResponseData(res, findItemId)
  } catch (err) {
    return response.failedResponse(res, err.message)
  }
};
async function updateReviewsInUser(data) {
  const findReviews = await REVIEWMODEL.find({ serviceProviderId: data.serviceProviderId })
  let totalRating1 = 0
  for (let i = 0; i < findReviews.length; i++) {
    if (findReviews[i].serviceProviderId == data.serviceProviderId) { totalRating1 += (findReviews[i].numberOfStars) }
  }
  let totalRating = totalRating1 / findReviews.length
  await USERDATASMODEL.findOneAndUpdate({ serviceProviderReviewId: data.serviceProviderReviewId }, { userRating: totalRating })
};
async function updateReviewsInUser(data) {
  const aggregationResult = await REVIEWMODEL.aggregate([
    { $match: { serviceProviderId: data.serviceProviderId } },
    { $group: { _id: null, totalStars: { $sum: "$numberOfStars" }, count: { $sum: 1 } } }
  ]).exec();

  if (aggregationResult.length > 0) {
    const totalStars = aggregationResult[0].totalStars;
    const count = aggregationResult[0].count;
    const totalRating = count > 0 ? totalStars / count : 0;

    await USERDATASMODEL.findOneAndUpdate(
      { serviceProviderReviewId: data.serviceProviderReviewId },
      { userRating: totalRating }
    ).exec();
  }
};
exports.addReviewsToItem = async (req, res) => {
  try {
    const { Review, numberOfStars, itemId, serviceProviderReviewId, bookingId } = req.body
    const checkItemId = await ITEMSMODEL.findOne({ _id: itemId })
    if (checkItemId == null) {
      return response.failedResponse(res, pleaseEnterTheCorrectItemId)
    }
    const checkBookedData = await BOOKINGITEMMODEL.find({ serviceProviderId: serviceProviderReviewId })
    if (checkBookedData == null) {
      return response.failedResponse(res, reviewAfterTheBookingOfTheItem)
    }
    for (keys of checkBookedData) {
      if (keys.clientId == req.user.id && bookingId == keys._id && keys.itemId == itemId && keys.bookingStatus == 4 && keys.serviceProviderId != req.user.id) {
        const data = await REVIEWMODEL.create({
          userId: req.user.id,
          Review: Review,
          numberOfStars: numberOfStars,
          itemId: itemId,
          serviceProviderReviewId: serviceProviderReviewId,
          bookingId: bookingId,
          clientId: keys.clientId
        })
        updateReviewsInUser(data)
        return response.successResponse(res, reviewIsAddedToItem)
      }
    }
    return response.failedResponse(res, reviewAfterTheComplitionOfBooking)
  }
  catch (err) {
    return response.failedResponse(res, err.message)
  }
};
exports.deleteUserItem = async (req, res) => {
  try {
    const itemId = req.query.itemId
    const findItemId = await ITEMSMODEL.findOne({ _id: itemId })
    if (findItemId == null || findItemId == undefined) {
      return response.failedResponse(res, pleaseEnterTheCorrectItemId + "&...Current Item Id is " + invailedItemId)
    }
    if (findItemId.serviceProviderId != req.user.id) {
      return response.failedResponse(res, youCanDeleteYourItemsOnly)
    }
    await ITEMSMODEL.deleteOne({ _id: itemId })
    await LISTINGMODEL.deleteMany({ itemId: itemId })
    return response.successResponse(res, itemDeleteSuccessfully)
  } catch (err) {
    return response.failedResponse(res, err.message)
  }
};
exports.showSingleUserRating = async (req, res) => {
  try {
    const serviceProviderId = req.query.serviceProviderId
    if (serviceProviderId == undefined) {
      return response.successResponse(res, enterTheCorrectServiceProviderId)
    }
    const findTotatlRatingOfUser = await REVIEWMODEL.aggregate([
      {
        $group: { _id: serviceProviderId, userRating: { $avg: '$numberOfStars' }, 'count': { "$sum": 1 } }
      }
    ])
    return response.successResponseData(res, userReviewDataIsHere, findTotatlRatingOfUser)
  } catch (err) {
    return response.failedResponse(res, err.message)
  }
};
exports.SingleItemReviews = async (req, res) => {
  try {
    const itemId = req.query.itemId
    const findItemId = await ITEMSMODEL.findOne({ _id: itemId })
    if (findItemId == null) {
      return response.failedResponse(res, "please Enter the correct ItemId ....")
    }
    const showReviwesOfSingleItem = await REVIEWMODEL.aggregate([
      {
        $match: {
          itemId: { $in: [new mongoose.Types.ObjectId(itemId)] }
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: "clientId",
          foreignField: "_id",
          as: "result",
        },
      },
    ])
    return response.successResponse(res, showReviwesOfSingleItem)
  } catch (err) {
    return response.failedResponse(res, err.message)
  }
};
var cron = require('node-cron');
cron.schedule('* * * * *', async () => {
  const findBookingData = await BOOKINGITEMMODEL.find({})
  let date = ""
  for (keys of findBookingData) {
    if (keys.bookingStatus == 2) {
      console.log(keys._id)
      date = moment(keys.endDate + "T" + keys.endTime).unix()

      console.log("date", date)
      console.log(moment(new Date).unix())
      if (date < moment(new Date).unix()) {
        console.log('date.12...', date, keys._id)
        const findOneAndUpdate = await BOOKINGITEMMODEL.findOneAndUpdate({ _id: keys._id }, {
          bookingStatus: '4'
        })
      }
    }
  }
  console.log('Booking Status is Checked and Updated');
});



