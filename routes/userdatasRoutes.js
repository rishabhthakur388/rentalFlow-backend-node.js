const express = require('express');
const { createAccount,
    loginAccount,
    forgettPasswordGenerateOtp,
    setNewPassword,
    addUserData,
    editUserProfile,
    showItemsToUser,
    showUserData,
    varifyNumber,
    showItemToUser,
    myListingData,
    currentUserData,
    setNewEmail,
    numberGenerateOtp,
    setNewNumber,
    setNewPassword_Update,
    userProfilePicture,
    deleteUserAccount,
    otpVarification,
    uploadNewVideo,
    cars,
    bikes,
    scooters,
    cycles,
    itemDetails,
    updateLoaction,
    others
} = require('../controllers/userDatasController');
const Router = express.Router();
const upload = require('../middleware/multerImages');
const upload2 = require("../middleware/multerFiles");
const varify = require('../middleware/authenticationToken');
const { uploadImage } = require('../config/firebaseConfig');
const { showAllCategoriesToUser,
    showAllSubCategoriesToUser
} = require('../controllers/addCategories');
const { bookingRentalItem,
    getBookingItemData,
    sentBookingRequest,
    showListingData,
    updateBookingModel
} = require('../controllers/bookingController');
const { createItem,
    addItemAvailibilities,
    addReviewsToItem,
    showsSingleItemToUser,
    showsAllItemToUser,
    deleteUserItem,
    showSingleUserRating,
    SingleItemReviews
} = require('../controllers/itemsDataController');
const { verify } = require('jsonwebtoken');
const { newController,
    newUpdateController,
    newDeleteController
} = require('../controllers/newCollectionData');
Router.post('/createAccount', createAccount);
Router.post('/loginaccount', loginAccount);
Router.put('/forgettpasswordgenerateotp', forgettPasswordGenerateOtp)
Router.put('/otpVarification', otpVarification)
Router.put('/setnewpassword', setNewPassword)
Router.post('/adduserdata', addUserData)
Router.post('/createitem', varify, upload.single('itemPicture'), createItem)
Router.put('/edituserprofile', varify, upload.single('userProfilePicture'), editUserProfile)
Router.post('/addreviewstoitem', varify, addReviewsToItem)
Router.get('/showitemstouser?:filterCategory?:search', varify, showItemsToUser)
Router.get('/itemDetails', itemDetails)
Router.post('/bookingrentalitem', varify, upload2.any(), bookingRentalItem)
// Router.post('/additemavailibilities', varify, addItemAvailibilities)
Router.put('/varifynumber', varifyNumber);
// Router.get('/showitemtouser', varify, showItemToUser)
Router.get('/showAllsubcategoriesTouser', varify, showAllSubCategoriesToUser)
Router.get('/showAllCategoriesToUser', varify, showAllCategoriesToUser)
Router.post('/mylistingdata', varify, myListingData)
Router.post('/updateLoaction', varify, updateLoaction);       
Router.get('/currentuserdata', varify, currentUserData)
Router.get('/showbookingdata', varify, getBookingItemData)
Router.get('/showssingleitemtouser?:itemId', varify, showsSingleItemToUser)

Router.put('/updateemail', varify, setNewEmail)
Router.put('/setnewnumber', varify, setNewNumber)
// Router.put('/setnewemail',varify,setNewEmail)
Router.put('/setnewpassword_update', varify, setNewPassword_Update)
Router.put('/numbergenerateotp', varify, numberGenerateOtp)
Router.put('/sentbookingrequest', varify, upload2.any(), sentBookingRequest)
Router.put('/userprofilepicture', varify, upload.single('userprofilepicture'), userProfilePicture)

Router.get('/showlistingdata', varify, showListingData)
Router.put('/updatebookingmodel', varify, updateBookingModel)
Router.get('/showsallitemtouser', varify, showsAllItemToUser)
Router.delete('/deleteu-seritem?:itemId', varify, deleteUserItem)
Router.get('/showsingleuserrating?:serviceProvierId', varify, showSingleUserRating)
Router.delete('/deleteuseraccount', varify, deleteUserAccount)

Router.post('/newcontroller', varify, newController)
Router.put('/newudatecontroller', varify, newUpdateController)
Router.put('/newDeleteController', varify, newDeleteController)
Router.get('/SingleItemReviews?:itemId', varify, SingleItemReviews)
Router.put('/uploadNewVideo', varify, upload.single('userVideo'), uploadNewVideo)
Router.get('/cars',varify, cars);
Router.get('/bikes', varify,bikes);
Router.get('/scooters',varify, scooters);
Router.get('/cycles',varify, cycles);
Router.get('/others',varify, others);




module.exports = Router;