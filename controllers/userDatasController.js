const USERDATASMODEL = require('../models/userDatasModel');
const CHATMODEL = require('../models/chat')
const ITEMSMODEL = require('../models/addItems')
const REVIEWMODEL = require("../models/reviewsModel")
const BOOKINGITEMMODEL = require('../models/bookingModel')
const LISTINGMODEL = require('../models/listingModel')
const SUBCATEGORY = require('../models/addSubcategoriesModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createAccountValidator,
  logInValidation,
  forgetPasswordOtpValidation,
  setNewPasswordValidator,
  addUserDataValidations,
  otpVarificationValidatios
} = require('../helper/validator')
const { default: mongoose } = require('mongoose')
const { uploadImage, uploadVideos } = require('../config/firebaseConfig')
const response = require('../helper/responseFile')
const { body, validationResult, check } = require('express-validator')
const { userAlreadyExixts,
  accountIsCreated,
  confirmPasswordNotMatch,
  pleaseEnterCorrectEmail,
  finishSetUpPlease,
  pleaseEnterCorrectPassword,
  youAreLoggedIn,
  unableToFindAccount,
  otpIsSent,
  EmailnotFoundorInvailedEmail,
  otpNotMatch,
  confirmPasswordIsNotMatch,
  passwordIsUpdated,
  enterCorrectEmail,
  phoneNumberAlreadyRegistered,
  otpIsASent,
  emailIsUpdatesd,
  emailIsUpdated,
  pleaseEnterCurrentPassword,
  pleaseEnterNewPassword,
  incorrectPassword,
  pleaseEnterValidOtp,
  accountNotFound,
  invalidPhoneNumber,
  phoneNumberIsVarified,
  listingRequeswtIsSent,
  profilePictureIsUpdated,
  dataIsAddedToProfile
} = require('../helper/constants')
const e = require('express')
const upload = require('../middleware/multerImages')
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const axios = require('axios');
const { UserRecord } = require('firebase-admin/auth')
const bucket = require('../config/firebaseConfig')
const { log } = require('firebase-functions/logger');
const { error, Console } = require('console');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;


////////////////////////category button cars///////////////////////////////////////
exports.cars = async (req, res) => {
  try {
    const findItem = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "subcategorydatas",
          localField: "itemSubCategory",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $match: {
          "result.subCategoryName": "Cars"
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    console.log(findItem);
    return response.successResponseWithData(res, "HERE IS YOUR DATA", findItem);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
////////////////////////category button Bike///////////////////////////////////////
exports.bikes = async (req, res) => {
  try {
    // const { type } = req.query;
    const findItem = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "subcategorydatas",
          localField: "itemSubCategory",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $match: {
          "result.subCategoryName": "Bikes"
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    console.log(findItem);
    return response.successResponseWithData(res, "HERE IS YOUR DATA", findItem);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
////////////////////////category button scooter///////////////////////////////////////
exports.scooters = async (req, res) => {
  try {
    // const { type } = req.query;
    const findItem = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "subcategorydatas",
          localField: "itemSubCategory",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $match: {
          "result.subCategoryName": "Scooters"
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    // console.log(findItem);
    console.log(findItem);
    return response.successResponseWithData(res, "HERE IS YOUR DATA", findItem);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
////////////////////////category button others///////////////////////////////////////
exports.others = async (req, res) => {
  try {
    // const { type } = req.query;
    const findItem = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "subcategorydatas",
          localField: "itemSubCategory",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $match: {
          "result.subCategoryName": "others"
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    // console.log(findItem);
    console.log(findItem);
    return response.successResponseWithData(res, "HERE IS YOUR DATA", findItem);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
////////////////////////category button cycles ///////////////////////////////////////
exports.cycles = async (req, res) => {
  try {
    // const { type } = req.query;
    const findItem = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: "subcategorydatas",
          localField: "itemSubCategory",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $match: {
          "result.subCategoryName": "Cycles"
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    // console.log(findItem);
    console.log(req.user.location.coordinates, "hellllllooooooo")
    console.log(findItem);
    return response.successResponseWithData(res, "HERE IS YOUR DATA", findItem);
  } catch (err) {
    // console.log(err)
    return response.failedResponse(res, err.message);
  }
};
/////////////////////////////////CREATE ACCOUNT ////////////////////////////////////
exports.createAccount = [
  createAccountValidator,
  async (req, res) => {
    try {
      const { Email, password, confirmPassword } = req.body;

      // Check if required fields are present
      if (!Email || !password || !confirmPassword) {
        return response.failedResponse(res, "Missing required fields");
      }
      const stage = "pending";
      // Validate request body
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return response.failedResponse(res, error.array()[0].msg);
      }
      const hashedPassword = await bcrypt.hash(password, 9);
      // Check if user already exists
      const userAlreadyExists = await USERDATASMODEL.findOne({ Email });
      if (userAlreadyExists && userAlreadyExists.stage != "completed") {
        await USERDATASMODEL.updateOne({ Email }, {
          Email,
          password: hashedPassword,
          stage
        });
        return response.successResponse(res, "welcomeback");
      }
      // if (userAlreadyExists && userAlreadyExists.stage != "completed") {
      //   return response.successResponse(res, "welcomeback");
      // }
      if (userAlreadyExists && userAlreadyExists.stage == "completed") {
        return response.failedResponse(res, "User already exists");
      }
      // Check if password matches confirmPassword
      if (password !== confirmPassword) {
        return response.failedResponse(res, "Passwords do not match");
      }
      // Hash the password
      // Create user
      const newUser = await USERDATASMODEL.create({
        Email,
        password: hashedPassword,
        stage
      });

      // Prepare response data
      const data = { stage };

      return response.successResponseWithData(res, "Account is created", data);
    } catch (err) {
      return response.failedResponse(res, err.message);
    }
  }
];
///////////////////////////////////// USER LOGIN ///////////////////////////////////////
exports.loginAccount = [logInValidation,
  async (req, res) => {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return response.failedResponse(res, error.array()[1]?.msg ?? error.array()[0].msg)
      }
      const { Email, password } = req.body
      const findCurrentUser = await USERDATASMODEL.findOne({
        Email
      })
      if (findCurrentUser == null) {
        return response.failedResponse(res, pleaseEnterCorrectEmail)
      }
      if (findCurrentUser.stage != "completed") {
        let data = { stage: findCurrentUser.stage }
        return response.failedResponseWithData(res, data, finishSetUpPlease)
      }
      const compareHashedPassword = await (bcrypt.compare(password, findCurrentUser.password))
      if (compareHashedPassword == false) {
        return response.failedResponse(res, pleaseEnterCorrectPassword)
      }
      const loginToken = jwt.sign({
        id: findCurrentUser.id
      }, process.env.SECRET_TOKEN_KEY)
      let data = { stage: findCurrentUser.stage, fullName: findCurrentUser.fullName, LocationName: findCurrentUser.LocationName, id_type: findCurrentUser.id_type, userProfilePictureUrl: findCurrentUser.userProfilePictureUrl, currentUserId: findCurrentUser._id }
      return response.successResponseWithToken(res, data, loginToken, youAreLoggedIn)
    }
    catch (err) {
      return response.failedResponse(res, err.message)

    }
  }];
// /////////////////////////////// foregt Password ////////////////////////////////////////
exports.forgettPasswordGenerateOtp = [forgetPasswordOtpValidation,
  async (req, res) => {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return response.failedResponse(res, error.array()[1]?.msg ?? error.array()[0].msg)
      }
      const { Email } = req.body
      const findCurrentEmail = await USERDATASMODEL.findOne({ Email })
      if (findCurrentEmail == null) {
        return response.failedResponse(res, unableToFindAccount)
      }
      let genrateOtp = Math.floor(Math.random() * 90000) + 10000;
      // const sendedOtp = genrateOtp
      const addOtptoUser = {
        otp: genrateOtp
      }
      await USERDATASMODEL.findOneAndUpdate({ Email }, addOtptoUser, { new: true })
      return response.successResponse(res, "DONE")
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  }];
/////////////////////////////////////otp VERIFICATION///////////////////////////////////////
exports.otpVarification = [otpVarificationValidatios,
  async (req, res) => {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return response.failedResponse(res, error.array()[1]?.msg ?? error.array()[0].msg)
      }
      const { otp, Email } = req.body
      const findCurrentEmail = await USERDATASMODEL.findOne({ Email })
      if (findCurrentEmail == null) {
        return response.failedResponse(res, EmailnotFoundorInvailedEmail)
      }
      if (findCurrentEmail.Email != Email) {
        return response.failedResponse(res, pleaseEnterCorrectEmail)
      }
      if (findCurrentEmail.otp != otp) {
        return response.failedResponse(res, otpNotMatch)
      }
      // let newOtp = '1011'
      let genrateOtp = Math.floor(Math.random() * 90000) + 10000;
      findCurrentEmail.otp = genrateOtp
      findCurrentEmail.save()
      await USERDATASMODEL.updateOne({ Email: Email },
        {
          otp: null
        }
      )
      return response.successResponse(res, 'Otp is Varified...')

    } catch (err) {
      return response.failedResponse(res, err.message)
    }
  }];
///////////////////////////NEW PASSWORD ////////////////////////////////////////////
exports.setNewPassword = [setNewPasswordValidator,
  async (req, res) => {
    try {
      const { Email, newPassword, confirmPassword } = req.body
      const findCurrentEmail = await USERDATASMODEL.findOne({ Email })
      if (findCurrentEmail == null) {
        return response.failedResponse(res, EmailnotFoundorInvailedEmail)
      }
      if (findCurrentEmail.Email != Email) {
        return response.failedResponse(res, pleaseEnterCorrectEmail)
      }
      if (newPassword != confirmPassword) {
        return response.failedResponse(res, confirmPasswordIsNotMatch)
      }
      let hashedPassword = await bcrypt.hash(newPassword, 9)
      await USERDATASMODEL.findOneAndUpdate({ Email: Email }, { password: hashedPassword })
      return response.successResponse(res, passwordIsUpdated)
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  }];
////////////////////////////ADD USER DATA////////////////////////////////////////////////
exports.addUserData = [
  addUserDataValidations,
  async (req, res) => {
    try {
      const {
        phoneNumber,
        Email,
        password,
        LocationName,
        fullName,
        zipCode,
        businessName,
        id_type,
        businessNumber,
        businessWebsite,
        userRating,
        totalItems,
        businessAddress,
        location,
        lat,
        lng
      } = req.body;

      const points = [Number(lng), Number(lat)];

      const findCurrectUserWithMail = await USERDATASMODEL.findOne({ Email });

      if (!findCurrectUserWithMail) {
        return response.failedResponse(res, unableToFindAccount);
      }

      const totalRating = await REVIEWMODEL.aggregate([
        { $match: { serviceProviderId: findCurrectUserWithMail.id } },
        { $group: { _id: null, avgRating: { $avg: "$numberOfStars" } } }
      ]);

      const error = validationResult(req);

      if (!error.isEmpty()) {
        return response.failedResponse(res, error.array()[0].msg ?? error.array()[1].msg);
      }

      if (findCurrectUserWithMail.Email !== Email) {
        return response.failedResponse(res, enterCorrectEmail);
      }

      if (!(await bcrypt.compare(password, findCurrectUserWithMail.password))) {
        return response.failedResponse(res, pleaseEnterCorrectPassword);
      }

      const findPhoneNumber = await USERDATASMODEL.findOne({ phoneNumber });

      if (findPhoneNumber && findPhoneNumber.phoneNumber === phoneNumber) {
        return response.failedResponse(res, phoneNumberAlreadyRegistered);
      }

      const genrateOtp = Math.floor(Math.random() * 90000) + 10000;
      const newOtp = genrateOtp;

      const serviceProviderUser = {
        phoneNumber,
        fullName,
        zipCode,
        businessAcount: false,
        id_type,
        location: {
          type: "Point",
          coordinates: points
        },
        LocationName,
        otp: newOtp
      };

      if (id_type == 2) {
        Object.assign(serviceProviderUser, {
          userRating,
          totalItems,
          businessName,
          businessAcount: true,
          businessNumber,
          businessWebsite,
          businessAddress
        });
      }

      await USERDATASMODEL.findOneAndUpdate({ Email }, serviceProviderUser, { new: true });

      return response.successResponse(res, dataIsAddedToProfile);
    } catch (err) {
      return response.failedResponse(res, err.message);
    }
  }
];
//////////////////////////////VERIFY NUMBER/////////////////////////////
exports.varifyNumber =
  async (req, res) => {
    try {
      const stage = "completed"
      const { otp, phoneNumber } = req.body
      const findCurrentNumberAccount = await USERDATASMODEL.findOne({ phoneNumber: phoneNumber })
      if (findCurrentNumberAccount.otp == otp) {
        await USERDATASMODEL.findOneAndUpdate({ phoneNumber }, { otp: null, stage: stage })
        return response.successResponse(res, phoneNumberIsVarified)
      }
      return response.failedResponse(res, pleaseEnterValidOtp)
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
/////////////////////////////////CURRENT USER INFO//////////////////////////////////////////////////
exports.currentUserData =
  async (req, res) => {
    try {
      const serviceProviderId = req.user.id
      const findCurrentUserData = await USERDATASMODEL.aggregate([{
        $lookup: {
          from: "reviewsdatas",
          localField: "_id",
          foreignField: "serviceProviderReviewId",
          pipeline: [
            { $group: { _id: '$serviceProviderReviewId', userRating: { $avg: '$numberOfStars' }, 'count': { "$sum": 1 } } }
          ],
          as: "result",
        }
      },
      { $match: { "_id": { $in: [new mongoose.Types.ObjectId(serviceProviderId)] } } }
      ])
      return response.successResponse(res, findCurrentUserData)
    } catch (error) {
      return response.failedResponse(res, error.message)
    }
  };
//////////////////////EDIT USER PROFILE //////////////////////////////////////////////
exports.editUserProfile = async (req, res) => {
  try {
    const { fullName,
      zipCode,
      businessName,
      businessNumber,
      businessWebsite,
      businessAddress,
      id_type,
      location,
      businessAcount,
      governmentId,
      appleId,
      facebookId,
      aboutMe
    } = req.body;

    // Calculate total rating using aggregation
    const findReviews = await REVIEWMODEL.aggregate([
      { $match: { serviceProviderId: req.user.id } },
      { $group: { _id: null, totalRating: { $avg: "$numberOfStars" } } }
    ]);
    const totalRating = findReviews.length ? findReviews[0].totalRating : 0;
    const upDateData = {
      fullName,
      zipCode,
      businessName,
      businessNumber,
      businessWebsite,
      businessAddress,
      id_type,
      location,
      businessAcount,
      governmentId,
      appleId,
      facebookId,
      aboutMe,
      totalRating
    };
    // Update user profile
    const updateUserData = await USERDATASMODEL.findByIdAndUpdate(req.user.id, upDateData, { new: true });

    return response.successResponseWithData(res, dataIsAddedToProfile, updateUserData);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
// /////////////////////
// exports.emailGenerateOtp = [async (req, res) => {
//   try {
//     const error = validationResult(req)
//     if (!error.isEmpty()) {
//       return response.failedResponse(res, error.array()[1]?.msg ?? error.array()[0].msg)
//     }
//     let genrateOtp = Math.floor(Math.random() * 90000) + 10000;
//     console.log(genrateOtp,'otpPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
//     // const sendedOtp = "1234"
//     const addOtptoUser = {
//       otp: genrateOtp,
//     }
//     await USERDATASMODEL.findOneAndUpdate({ _id: req.user.id }, addOtptoUser, { new: true })
//     return response.successResponse(res, otpIsASent)
//   }
//   catch (err) {
//     return response.failedResponse(res, err.message)
//   }
// }]

//////////////////////////////////// NEW MAIL ///////////////////////////////////////////////////////
exports.setNewEmail = async (req, res) => {
  try {
    const { otp, newEmail } = req.body
    const findCurrentUser = await USERDATASMODEL.findOne(
      { _id: req.user.id }
    )
    if (findCurrentUser.otp != otp) {
      return response.failedResponse(res, pleaseEnterValidOtp)
    }
    const updateEmail = await USERDATASMODEL.updateOne({ _id: req.user.id },
      {
        Email: newEmail
      }
    )
    return response.successResponseWithData(res, emailIsUpdated, updateEmail)
  }
  catch (err) {
    return response.failedResponse(res, err.message)
  }
};
////////////////////////////////////SET NEW PASSWORD (EMAIL) //////////////////////////////////////
exports.setNewPassword_Update =
  async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body
      const findCurrentEmail = await USERDATASMODEL.findOne(
        {
          _id: req.user.id
        }
      )
      if (findCurrentEmail == null) {
        return response.failedResponse(res, unableToFindAccount)
      }
      if (!currentPassword) {
        return response.failedResponse(res, pleaseEnterCurrentPassword)
      }
      if (!newPassword) {
        return response.failedResponse(res, pleaseEnterNewPassword)
      }
      // let currentpass = req.user.password;
      const compareHashedPassword = await (bcrypt.compare(currentPassword, findCurrentEmail.password));
      // console.log(compareHashedPassword, "hehehehheheheheehehehehshshhshe");

      if (compareHashedPassword == false) {
        return response.failedResponse(res, incorrectPassword)
      }
      if (newPassword != confirmPassword) {
        return response.failedResponse(res, confirmPasswordNotMatch)
      }
      await USERDATASMODEL.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          password: newPassword
        }
      )
      return response.successResponse(res, passwordIsUpdated)
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
exports.numberGenerateOtp =
  async (req, res) => {
    try {
      const findCurrentEmail = await USERDATASMODEL.findOne(
        {
          _id: req.user.id
        }
      )
      if (findCurrentEmail == null) {
        return response.failedResponse(res, accountNotFound)
      }
      let genrateOtp = Math.floor(Math.random() * 90000) + 10000;
      console.log(genrateOtp);
      // const sendedOtp = "1234"
      const addOtptoUser =
      {
        otp: genrateOtp,
      }
      await USERDATASMODEL.findOneAndUpdate(
        {
          _id: req.user.id
        },
        addOtptoUser, { new: true }
      )
      return response.successResponse(res, otpIsASent)
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
exports.setNewNumber =
  async (req, res) => {
    try {
      const { otp, newPhoneNumber } = req.body
      const findCurrentEmail = await USERDATASMODEL.findOne(
        {
          _id: req.user.id
        }
      )
      if (findCurrentEmail == null) {
        return response.failedResponse(res, invalidPhoneNumber)
      }
      if (findCurrentEmail.otp != otp) {
        return response.failedResponse(res, pleaseEnterValidOtp)
      }
      await USERDATASMODEL.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          phoneNumber: newPhoneNumber,
          otp: null
        }
      )
      return response.successResponse(res, phoneNumberIsVarified);
    }
    catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
exports.showItemsToUser = async (req, res) => {
  try {
    const filteredCategory = req.query.filterCategory;
    const search = req.query.search;

    const matchQuery = {};
    if (search) {
      matchQuery['$or'] = [
        { nameOfItemYouAreListing: { $regex: `${search}`, $options: 'i' } },
        { subCategoryName: { $regex: `${search}`, $options: 'i' } }
      ];
    } else {
      matchQuery['$or'] = [
        { nameOfItemYouAreListing: { $regex: `[A-Z0-9]`, $options: 'i' } },
        { subCategoryName: { $regex: `[A-Z0-9]`, $options: 'i' } }
      ];
    }
    const categoryMatch = filteredCategory ? { itemSubCategory: mongoose.Types.ObjectId(filteredCategory) } : {};
    const showAllCategoriesToUser = await ITEMSMODEL.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: req.user.location.coordinates },
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
      {
        $lookup: {
          from: 'reviewsdatas',
          localField: '_id',
          foreignField: 'itemId',
          pipeline:
            [
              { $group: { _id: '$itemId ', itemRating: { $avg: '$numberOfStars' }, count: { $sum: 1 } } },
            ],
          as: 'result3'
        }
      },
      { $match: { ...matchQuery, ...categoryMatch } },
      { $sort: { nameOfItemYouAreListing: 1 } },
     
    ]);
    // console.log(req.user.location.coordinates, "hellllllooooooo")
    // console.log(showAllCategoriesToUser[1], "hello");
    const profileData = { currentUserId: req.user.id, userProfilePicture: req.user.userProfilePictureUrl, userName: req.user.fullName };

    return response.successResponseWithExtraData(res, showAllCategoriesToUser, profileData, {id:"661395b0a5e7ab46970d8c27"});
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
///////////////////////////listing Data/////////////////////////////////////////////////
exports.myListingData =
  async (req, res) => {
    try {
      const { itemId, userId, listingStatus, serviceProviderId } = req.body
      await LISTINGMODEL.create({
        itemId: itemId,
        userId: userId,
        listingStatus: listingStatus,
        serviceProviderId: serviceProviderId
      })
      return response.successResponseData(res, listingRequeswtIsSent)
    } catch (error) {
      return response.failedResponse(res, error.message)
    }
  };
////////////////////////////////user profile/////////////////////////////
exports.userProfilePicture =
  async (req, res) => {
    try {
      const userProfilePicture = req.file.filename
      const currentUser = req.user.id
      const pictureUrl = await uploadImage(req.file);
      await USERDATASMODEL.findOneAndUpdate(
        {
          _id: currentUser
        },
        {
          userProfilePictureUrl: pictureUrl,
          userProfilePicture: userProfilePicture
        }
      )
      return response.successResponseWithData(res, profilePictureIsUpdated, pictureUrl)
    } catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
/////////////////////////////////////delete account////////////////////////////////////////
exports.deleteUserAccount =
  async (req, res) => {
    try {
      await USERDATASMODEL.deleteOne({ _id: req.user.id })

      await ITEMSMODEL.deleteMany({ serviceProviderId: req.user.id })
      await BOOKINGITEMMODEL.deleteMany({
        $or:
          [
            { serviceProviderId: req.user.id },
            { clientId: req.user.id }
          ]
      })
      await REVIEWMODEL.deleteMany({ serviceProviderReviewId: req.user.id })
      await LISTINGMODEL.deleteMany({ serviceProviderReviewId: req.user.id })

    } catch (err) {
      return response.failedResponse(res, err.message)
    }
  };
////////////////////////////////////firebase////////////////////////////////
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
exports.uploadNewVideo = async (req, res) => {
  try {
    const userVideo = await uploadVideos(req.file)

    const addVideoToUser = await USERDATASMODEL.findOneAndUpdate(
      { _id: req.user.id },
      { userVideo: userVideo },
      { new: true }
    );

    function createThumbnailOfVideoFromRemoteUrl(url) {
      return new Promise((resolve, reject) => {

        axios({
          method: 'get',
          url: url,
          responseType: 'stream',
        })
          .then(async response => {
            const videoStream = response.data;
            const videoPath = path.join(__dirname, '..', 'public', req.file.filename);
            const outputPath = path.join(__dirname, 'thumbnails', `${req.file.filename}-thumbnail.png`);
            const thumbnailUrl = await bucket.uploadThumbnails(`${req.file.filename}-thumbnail.png`)
            console.log("thumbnail url: " + outputPath)
            console.log("thumbnail url111: " + thumbnailUrl)
            await USERDATASMODEL.findOneAndUpdate({ _id: req.user.id }, { videoThumbnail: thumbnailUrl, new: true })
            const videoFile = fs.createWriteStream(videoPath);
            videoStream.pipe(videoFile);

            videoFile.on('finish', async () => {
              ffmpeg(videoPath)
                .on('end', () => {
                  fs.readFile(outputPath, (err, data) => {
                    if (err) {
                      reject(err);
                    }
                    else {
                      fs.unlink(videoPath, () => { });
                      // fs.unlink(outputPath, () => { });
                      resolve(data);
                    }
                  });
                })
                .on('error', (err) => {
                  reject(err);
                })
                .screenshots({
                  count: 10,
                  folder: path.join(__dirname, 'thumbnails'), // Output folder for the thumbnail image
                  filename: `${req.file.filename}-thumbnail.png`,
                  size: '320x240', // Set the thumbnail size as needed
                  timemarks: ['5', "3"], // Time in seconds to take the thumbnail from (1 second in this case)
                });
            });
            videoFile.on('error', (err) => {
              reject(err);
            });
          })
          .catch(err => {
            console.log("here is the error.......")
            reject(err);
          });
      });
    }
    const data = await createThumbnailOfVideoFromRemoteUrl(userVideo)
    console.log("data is here >>:::>>>::.>>;", data)
    return response.successResponseWithData(res, "Video is Uploaded ", addVideoToUser);

  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
/////////////////////////ITEMSHOW /////////////////////////////
exports.itemDetails = async (req, res) => {
  try {
    const itemId = req.query.id;

    const itemAllDetails = await ITEMSMODEL.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(itemId)
        }
      },
      {
        $lookup: {
          from: 'subcategorydatas',
          localField: 'itemSubCategory',
          foreignField: '_id',
          as: "result1"
        }
      },
      {
        $lookup: {
          from: "userdatas",
          localField: 'serviceProviderId',
          foreignField: '_id',
          as: "result2"
        }
      },
    ]);
    return response.successResponseWithExtraData(res, itemAllDetails);
  } catch (err) {
    return response.failedResponse(res, err.message);
  }
};
exports.updateLoaction = async (req, res) => {
  try {
    const findUser = await USERDATASMODEL.findOne({_id:req.user.id})//_id:new mongoose.Types.ObjectId("65f95ae2d9480c9305d2bf0d")
    if (!findUser) {
      return response.failedResponse(res, "NOT_FOUND");
    }
    const data = await USERDATASMODEL.updateOne({  
      _id:req.user.id
    },{
      "location.coordinates":[req.body.lng,req.body.lat],
      LocationName: req.body.LocationName   

    } )
    console.log("hello",data);
    return response.successResponseWithData(res, "done", data)
  } catch (error) {
    return response.failedResponse(res, error.message); 
  }
};
