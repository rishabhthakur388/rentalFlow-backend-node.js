const express = require("express");
const route2 = express.Router();
const varify = require('../middleware/authenticationToken')
const stripController = require("../controllers/stripeController");


// route2.get("/v1/balance", varify, stripController.balance);
route2.post("/v1/createCustomerAndAttachPaymentMethod", varify, stripController.createCustomerAndAttachPaymentMethod);
route2.post("/v1/createCustomer", varify, stripController.createCustomer);
route2.post("/v1/createCustomerPaymentMethodId", varify, stripController.createCustomerPaymentMethodId);



// route2.get("/v1/customersretrive", varify, stripController.retrieve);
// route2.post('/v1/createProduct', varify, stripController.createProduct)

// route2.get("/v1/events", varify, stripController.eventHandler);
// route2.post("/v1/files", varify, stripController.fileHandler);
// route2.get("/v1/files/:id", varify, stripController.fileHandlerToRetrieve);
// route2.post("/v1/file_links", varify, stripController.linkCreator);
// route2.get("/v1/file_links", varify, stripController.listLink);
// route2.get("/v1/mandates/:id", varify, stripController.retrieveMandate); // make a call to create a SetupIntent that includes the payment method ID and mandate details.

// route2.post("/v1/payment_intents", varify, stripController.createPaymentIntent);
// route2.post("/v1/payment_intents/:id/confirm", varify, stripController.confirmPaymentIntent);

// route2.post("/v1/setup_intents", varify, stripController.setupIntent);
// route2.post("/v1/setup_intents/:id/confirm", varify, stripController.confirmSetupIntent);
// route2.post("/v1/setup_intents/:id/verify_microdeposits", varify, stripController.verifyDeposit);

// route2.get("/v1/setup_attempts", varify, stripController.setupAttempts);
// route2.post("/v1/payouts", varify, stripController.payouthandler);

// route2.post('/v1/checkout/sessions', varify, stripController.sessionCreate)


// route2.post("/signup", stripController.signup);
// route2.post("/login", stripController.login);

module.exports = route2;