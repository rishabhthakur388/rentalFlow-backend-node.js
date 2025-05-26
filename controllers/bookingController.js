const BOOKINGITEMMODEL = require("../models/bookingModel");
const ITEMMODEL = require("../models/addItems");
const AVALIBILITYMODEL = require("../models/itemAvalibility");
const response = require("../helper/responseFile");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const {
  pleaseEnterTheCorrectItemId,
  invailedBookingTimeForBooking,
  bookingRequestIsSent,
  pleaseEnterTheBookingId,
  serviceIsOnlyAvailableForBussinessAccounts,
  pleaseEnterBookingId,
  enterBookingStatus,
  bookingIsApproved,
  bookingIsRejected,
  invailedBookingStatus,
  pleaseEnterVailedTime,
} = require("../helper/constants");

// Booking Items
exports.bookingRentalItem = async (req, res) => {
  try {
    const { itemId, startTime, paymentId, endTime, payWith, bookingStatus } = req.body;
    // Check if item detail is available
    const findItemDetail = await ITEMMODEL.findById(itemId);
    if (!findItemDetail) {
      return response.failedResponse(res, pleaseEnterTheCorrectItemId);
    };
    // Check if user is trying to book their own item
    if (findItemDetail.serviceProviderId === req.user.id) {
      return response.failedResponse(res, youCanNotBookYourOwnItem);
    };
    // Check item availability
    const findItemAvailability = await AVALIBILITYMODEL.find({
      itemId: itemId,
      day: startTime[0].day,
      StartTime: { $lte: startTime[0].Time },
      EndTime: { $gte: endTime[0].Time }
    });
    if (findItemAvailability.length === 0) {
      return response.failedResponse(res, invailedBookingTimeForBooking);
    };
    // Calculate total price
    const startTimeMoment = moment(startTime[0].Date + "T" + startTime[0].Time, "YYYY-MM-DDTHH:mm");
    const endTimeMoment = moment(endTime[0].Date + "T" + endTime[0].Time, "YYYY-MM-DDTHH:mm");
    const hoursDifference = endTimeMoment.diff(startTimeMoment, 'hours');
    const hourlyCharge = hoursDifference * findItemDetail.price;
    const transactionFee = 16;
    const serviceFee = 16;
    const totalPrice = hourlyCharge + transactionFee + serviceFee;

    // Create booking item
    const createbookItemRequest = await BOOKINGITEMMODEL.create({
      itemId: itemId,
      startTime: startTime[0].Time,
      endTime: endTime[0].Time,
      startDate: startTime[0].Date,
      startday: startTime[0].day,
      endDate: endTime[0].Date,
      endDateday: endTime[0].day,
      priceDetail: {
        deposite_inCash: findItemDetail.deposite_inCash,
        delivery_fee: findItemDetail.delivery_fee,
        hourlyCharge: hourlyCharge,
        transactionFee: transactionFee,
        serviceFee: serviceFee,
        totalPrice: totalPrice
      },
      payWith: payWith,
      bookingStatus: bookingStatus,
      clientId: req.user.id,
      serviceProviderId: findItemDetail.serviceProviderId,
      paymentId: paymentId,
      totalPrice: totalPrice,
      itemPicture: findItemDetail.pictureUrl,
      itemName: findItemDetail.nameOfItemYouAreListing,
    });

    return response.successResponseWithData(res, bookingRequestIsSent, createbookItemRequest);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
exports.sentBookingRequest = async (req, res) => {
  try {
    const { bookingId, deliveryOptions, deliveryOption } = req.body;

    // Check if bookingId is provided
    if (!bookingId) {
      return response.failedResponse(res, pleaseEnterTheBookingId);
    }

    // Upload images concurrently
    const [validDriversLicenceUrl, notesUrl] = await Promise.all([
      uploadImage(req.files[0]),
      uploadImage(req.files[1])
    ]);

    // Construct update object with provided fields
    const updateObj = {};
    if (deliveryOptions) updateObj.deliveryOptions = deliveryOptions;
    if (req.files[0]) {
      updateObj.validDriversLicence = req.files[0].originalname;
      updateObj.validDriversLicenceUrl = validDriversLicenceUrl;
    }
    if (req.files[1]) {
      updateObj.notes = req.files[1].originalname;
      updateObj.notesUrl = notesUrl;
    }
    if (deliveryOption) updateObj.deliveryOption = deliveryOption;

    // Update booking item
    await BOOKINGITEMMODEL.findOneAndUpdate(
      { _id: bookingId },
      updateObj
    );

    return response.successResponse(res, bookingRequestIsSent);
  } catch (error) {
    return response.failedResponse(res, error.message);
  }
};
exports.getBookingItemData = async (req, res) => {
  try {
    const itemId = req.query.itemId;

    const findCurrentBooingData = await BOOKINGITEMMODEL.findOne({
      _id: itemId,
    });
    return response.successResponse(res, findCurrentBooingData);
  } catch (error) {
    return response.failedResponse(res, error.message);
  }
};
exports.showListingData = async (req, res) => {
  try {
    console.log("=========",  req.user.id_type);
    const findBookingRequests = await BOOKINGITEMMODEL.aggregate([
      {
        $match: (req.user.id_type == 1)
          ? { clientId: req.user._id }
          : { serviceProviderId: req.user._id },
      },
      {
        $lookup: {
          from: "itemdatas",
          localField: "itemId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $sort: {
          bookingStatus: 1,
        },
      },
    ]).limit(10);
    if (findBookingRequests == null || findBookingRequests == undefined) {
      return response.failedResponse(
        res,
        serviceIsOnlyAvailableForBussinessAccounts
      );
    }
    return response.successResponseWithData(res, 'Here is the listing', findBookingRequests);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
exports.updateBookingModel = async (req, res) => {
  try {
    const { bookingId, bookingStatus } = req.body;
    if (bookingId == null) {
      return response.failedResponse(res, pleaseEnterBookingId);
    }
    if (bookingStatus == null) {
      return response.failedResponse(res, enterBookingStatus);
    }
    console.log(">>>>>", 169);
    const updateBookingStatus = await BOOKINGITEMMODEL.findOneAndUpdate(
      { _id: bookingId },
      { bookingStatus: bookingStatus }
    );
    console.log(">>>>>", updateBookingStatus, 171);
    if (updateBookingStatus == null) {
      return response.failedResponse(res, pleaseEnterTheBookingId);
    }
    if (bookingStatus == "2") {
      return response.successResponse(res, bookingIsApproved);
    }
    if (bookingStatus == "3") {
      return response.successResponse(res, bookingIsRejected);
    }
    if (bookingStatus == "4") {
      return response.successResponse(res, "Booking Status Completed....");
   } ///////////if retailer not responding///////////
     else {
      return response.failedResponse(res, invailedBookingStatus);
    }
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
