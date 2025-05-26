
const STRIPE = require('stripe')("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");
const { body, query, validationResult } = require('express-validator');
const USERMODEL = require('../models/userDatasModel');

// const stripe = require("stripe")(
//     "sk_test_51NPjiESHAneY3ywZfHHgWtXPTiHoWWNrKaDVBGrkAS1qjpaZkCftjGKtTv3yFkcWVfk5ibQrp2qEUf8M6ZwVkjP1004PgoF741"
// );
// const User = require("../models/userDatasModel");
// const bcrypt = require("bcrypt");
// const fs = require("fs");
// // var fp = fs.readFileSync("../");

// //BALANCE OBJECT

// exports.balance = async (req, res) => {
//     try {
//         const balance = await stripe.balance.retrieve();
//         if (!balance) {
//             return res.status(404).json({ message: "Something went wrong" });
//         }
//         res.status(201).json(balance);
//     } catch (err) {
//         console.log(err);
//     }
// };

// // CREATE CUSTOMER OBJECT

exports.createCustomer = async (req, res) => {
    try {
        const customer = await STRIPE.customers.create({
            email: req.user.Email,
            name: req.user.fullName,
            metadata: {
                userid: req.user.id,
            },
            phone: req.user.phoneNumber,
            description: "This is new client description ",
        });
        console.log(customer);
        await USERMODEL.updateOne({ _id: req.user.id }, { stripeCustomerId: customer.ids });

        res.status(201).json({ status: 201, data: customer });
    } catch (err) {
        console.log(err);
    }
};
// exports.retrieve = async (req, res) => {
//     try {
//         const customers = await stripe.customers.list({
//             limit: 2,
//             email: req.user.Email,
//         });
//         res.status(201).json(customers.data);
//     } catch (err) {
//         console.log(err);
//     }
// };

// EVENT HANDLER IN STRIIPE

// exports.eventHandler = async (req, res) => {
//     try {
//         // const id = req.params.id
//         const events = await stripe.events.list({
//             type: "customer.created",
//             limit: 4,
//         });
//         console.log(events);
//         res.status(201).json(events);
//     } catch (err) {
//         console.log(err);
//     }
// };

// // FILE HANDLER IN STRIPE(IN RESPONSE WE GET A FILE URL WHERE THE FILE IS UPLOADED IN STRIPE ACCOUNT)

// exports.fileHandler = async (req, res) => {
//     try {
//         var file = await stripe.files.create({
//             purpose: "dispute_evidence",
//             file: {
//                 data: fp,
//                 name: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
//                 type: "application/octet-stream",
//             },
//         });
//         console.log(file);
//         res.status(201).json(file);
//     } catch (err) {
//         console.log(err);
//     }
// };
// exports.fileHandlerToRetrieve = async (req, res) => {
//     try {
//         const id = req.params.id;
//         var file = await stripe.files.retrieve(id);
//         console.log(file);
//         res.status(201).json(file);
//     } catch (err) {
//         console.log(err);
//     }
// };

// //FILE LINK CREATE HANDLER FOR THE NON-AUTHENTICATION USER

// exports.linkCreator = async (req, res) => {
//     try {
//         const fileLink = await stripe.fileLinks.create({
//             file: "file_1NQNbvSDHZWobBACQKYYzryN",
//         });
//         console.log(fileLink.url);
//         res.status(201).json(fileLink.url);
//     } catch (err) {
//         console.log(err);
//     }
// };

// exports.listLink = async (req, res) => {
//     try {
//         const fileLinks = await stripe.fileLinks.list({
//             limit: 3,
//         });
//         console.log(fileLinks);
//         res.status(201).json(fileLinks);
//     } catch (err) {
//         console.log(err);
//     }
// };

// // MANDATE HANDLER (MANDATE IS RECORD OF PERMISSIONS A CUSTOMER HAS GIVEN TO YOU TO DEBIT THEIR PAYMENT METHOD)

// exports.retrieveMandate = async (req, res) => {
//     try {
//         const mandate = await stripe.mandates.retrieve(
//             "mandate_1NQOKI2eZvKYlo2CoZRKPhl9"
//         );
//         console.log(mandate);
//         res.status(201).json(mandate);
//     } catch (err) {
//         console.log(err);
//     }
// };

// //PAYMENTINTENTS HANDLER (one PaymentIntent for each order or customer session in your system.)

// exports.createPaymentIntent = async (req, res) => {
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 2000,
//             currency: "USD",
//             statement_descriptor: "Custom descriptor",
//             payment_method_types: ["card"],
//             customer: "cus_ODbdrTN9J8PYTR",
//             receipt_email: req.user.Email,
//             setup_future_usage: "off_session",
//         });
//         console.log(paymentIntent.client_secret);
//         res.status(201).json(paymentIntent);
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error", data: err });
//         console.log(err);
//     }
// };

// exports.confirmPaymentIntent = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const paymentIntent = await stripe.paymentIntents.confirm(id, {
//             payment_method: "pm_card_visa",
//             return_url: "https://buy.stripe.com/test_bIY6oPe1l4c58zS3cc",
//         });
//         console.log(paymentIntent.next_action.redirect_to_url.url);
//         res.status(201).json({ id: paymentIntent.id, url: paymentIntent });
//     } catch (err) {
//         res.status(500).json({ message: "Some internal server error", data: err });
//     }
// };

// //THERE ARE MORE METHODS LIKE TO CANCEL A PAYMENT OR CAPTURE A PAYMENT AND (Increment an authorization)

// //SETUP INTENT HANDLER FOR SAVING THE PAYMENT CREDITIAL OF A USER AS SOON AS WE ARE READY TO COLLECT PAYMENT CREDIAL IN APPLICATION

// exports.setupIntent = async (req, res) => {
//     try {
//         const setupIntent = await stripe.setupIntents.create({
//             payment_method_types: ["card"],
//             payment_method: "pm_1NQQE2SDHZWobBACqqiwO7tJ",
//             customer: "cus_OCptf0rifwz2lc",
//         });
//         console.log(setupIntent.id); //seti_1NQRyFSDHZWobBAC0eauANTr
//         res.status(201).json(setupIntent);
//     } catch (err) {
//         res
//             .status(500)
//             .json({ message: `Some internal server error occur`, data: err });
//     }
// };

// exports.confirmSetupIntent = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const setupIntent = await stripe.setupIntents.confirm(id, {
//             payment_method: "pm_card_visa",
//         });
//         console.log(setupIntent); //seti_1NQRyFSDHZWobBAC0eauANTr
//         res.status(201).json({
//             message: `Setup intent confirm for customer ${setupIntent.customer}`,
//         });
//     } catch (err) {
//         res
//             .status(500)
//             .json({ message: "Some internal server error occur", data: err });
//     }
// };

// //VERIFY MICRO DEPOSITE FOR THE USER
// exports.verifyDeposit = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const setupIntent = await stripe.setupIntents.verifyMicrodeposits(id, {
//             amounts: [32, 45],
//         });
//         console.log(setupIntent);
//         res.status(201).json({ data: setupIntent, id: setupIntent.id });
//     } catch (err) {
//         res
//             .status(500)
//             .json({ message: "Some internal server error occur", data: err });
//     }
// };

// //SETUPATTEMPTS(ONE ATTEMPT CONFIRM OF A SETUPINTENT)

// exports.setupAttempts = async (req, res) => {
//     try {
//         const setupAttempts = await stripe.setupAttempts.list({
//             setup_intent: "seti_1NQRyFSDHZWobBAC0eauANTr",
//         });
//         console.log(setupAttempts);
//         res.status(201).json({ data: setupAttempts });
//     } catch (err) {
//         res
//             .status(500)
//             .json({ message: "Some internal server error occur", data: err });
//     }
// };

// //STRIPE PAYOUT HANDLER
// exports.payouthandler = async (req, res) => {
//     try {
//         const payout = await stripe.payouts.create({
//             amount: 1100,
//             currency: "inr",
//         });
//         console.log(payout);
//         res
//             .status(201)
//             .json({ message: `Funds are transfer successfully`, payout: payout });
//     } catch (err) {
//         res
//             .status(500)
//             .json({ message: `Some internal server error occur`, data: err });
//     }
// };

// //CREATE A CHECKOUT SESSION FOR THE USER
// exports.sessionCreate = async (req, res) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             success_url: 'https://example.com/success',
//             line_items: [
//                 { price: 'price_1NM5uXSDHZWobBACi89e0HKG', quantity: 2 },
//             ],
//             mode: 'payment',
//         });
//         console.log(session)
//         res.status(201).json({ data: session })
//     } catch (err) {
//         res
//             .status(201)
//             .json({ message: `Some internal server error occur`, data: err });
//     }
// };

// exports.createProduct = async (req, res) => {
//     try {
//         const stripe = require('stripe')('sk_test_51NPjiESHAneY3ywZfHHgWtXPTiHoWWNrKaDVBGrkAS1qjpaZkCftjGKtTv3yFkcWVfk5ibQrp2qEUf8M6ZwVkjP1004PgoF741');

//         const product = await stripe.products.create({
//             name: 'Gold Special',
//             url: 'https://buy.stripe.com/test_bIY6oPe1l4c58zS3cc'
//         });
//         res.status(200).json({ status: 200, data: product })
//     }
//     catch (err) {
//         return res.status(400).json({ status: 400, message: err.message })
//     }
// }





exports.createCustomerPaymentMethodId = async (req, res) => {
    try {
        const paymentMethod = await STRIPE.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2024,
                cvc: '123',
            },
        });
        console.log(paymentMethod)
        return res.status(200).json({ status: 200, data: paymentMethod })
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
}




exports.createCustomerAndAttachPaymentMethod = [
    body('paymentMethodId').trim().exists().notEmpty().withMessage('Payment method Id is required'),
    // body('email').trim().exists().notEmpty().isLength({ min: 1 }).withMessage('Email is required')
    //     .isEmail().withMessage('Email must be a valid email address'),
    // body('name').trim().exists().notEmpty().withMessage('Name is required'),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0]['msg'], error: errors.array() });
            }
            else {
                const { paymentMethodId, Email, Name } = req.body;

                let stripeCustomerAccount;

                if (req.user.stripeCustomerId != '') {
                    console.log('here if')
                    stripeCustomerAccount = req.user.stripeCustomerId;

                    await STRIPE.paymentMethods.attach(paymentMethodId, { customer: stripeCustomerAccount });
                }
                else {
                    console.log('here else')
                    const createCustomer = await STRIPE.customers.create({
                        email: req.user.Email,
                        name: req.user.fullName,

                        payment_method: paymentMethodId,
                        invoice_settings: {
                            default_payment_method: paymentMethodId,
                        },
                    });
                    stripeCustomerAccount = createCustomer.id;
                }
                await USERMODEL.updateOne({ _id: req.user.id }, { stripeCustomerId: "Empty@@" });
                const resData = {
                    stripeCustomerId: stripeCustomerAccount,

                }
                return res.status(400).json({ message: 'Customer created successfully', data: resData });
            }
        }
        catch (err) {
            console.log('catched errorrrrrrrrrrrrr', err);
            return res.status(400).json({ message: 'Internal Server Error!!!....' });
        }
    }];


exports.createPaymentIntent = [
    body('amount').trim().exists().notEmpty().withMessage('Amount is required'),
    //body('userId').trim().exists().notEmpty().withMessage('User Id is required'),
    body('customerId').trim().exists().notEmpty().withMessage('Customer Id is required'),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0]['msg'], error: errors.array() });
            }
            else {

                const { amount, userId, customerId } = req.body;

                const paymentIntent = await STRIPE.paymentIntents.create({
                    amount: amount * 100,
                    currency: 'INR',
                    customer: customerId,
                    metadata: { 'userId': req.user.id },
                    // transfer_data: {
                    //     destination: findOwnerUser.stripeAccountId
                    // },
                    // description: `Invoice for ${findClub.clubName}`,
                    // shipping: {
                    //     name: 'Jenny Rosen Outcoach',
                    //     address: {
                    //         line1: '510 Townsend St',
                    //         postal_code: '98140',
                    //         city: 'San Francisco',
                    //         state: 'CA',
                    //         country: 'US',
                    //     },
                    // },
                });

                const resData = {
                    clientSecret: paymentIntent.client_secret,
                    status: paymentIntent.status
                }

                return res.status(200).json({ message: 'Payment Intent created successfully', paymentIntent });
            }
        }
        catch (err) {
            console.log('catched errorrrrrrrrrrrrr', err);
            return res.status(400).json({ message: 'Internal Server Error!!!....' });

        }
    }];


exports.retrievePaymentDetail = [
    query('paymentIntentId').trim().exists().notEmpty().withMessage('Payment intent id is required'),

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0]['msg'], error: errors.array() });
            }
            else {
                const { paymentIntentId } = req.query;

                const retrievePayment = await STRIPE.paymentIntents.retrieve(paymentIntentId);
                if (retrievePayment) {

                    if (retrievePayment.status === 'succeeded') {
                        //await INVOICE.update({ invoicePaidStatus: '2', invoicePaymentMode: '1' }, { where: { id: retrievePayment.metadata.invoiceId } });
                    }
                    return res.status(200).json({ status: 200, message: 'Payment retrieved', retrievePayment });
                }
                else {
                    return res.status(400).json({ status: 400, message: 'Something went wrong!' });
                }
            }
        }
        catch (err) {
            console.log('catched errorrrrrrrrrrrrr', err);
            return res.status(400).json({ status: 400, message: 'Internal Server Error!!!....' });
        }
    }];


exports.testMethod = async (req, res) => {
    try {

        // const paymentMethod = await STRIPE.paymentMethods.create({
        //     type: 'card',
        //     card: {
        //         number: '4242424242424242',
        //         exp_month: 12,
        //         exp_year: 2025,
        //         cvc: '123',
        //     },
        // });

        // const paymentMethod = await STRIPE.confirmCardPayment("pi_3NQSFhGga6zbUjWI1w5q0Mqq_secret_HqiHvNBoBvJ6gDk6oID2gOu4P", {
        //     payment_method: "pm_1NQRs5Gga6zbUjWIQ6tqDAx2", // Use the payment method ID generated on the client-side
        // })

        const paymentMethod = await STRIPE.paymentMethods.create({
            type: 'ach_credit_transfer',
            ach_credit_transfer: {
                account_number: '000123456789', // Replace with the bank account number
                routing_number: '110000000', // Replace with the bank routing number
            },
        });

        //const paymentMethod  = await STRIPE.paymentIntents.retrieve("pi_3NQSFhGga6zbUjWI1w5q0Mqq");
        return res.status(400).json({ status: 400, message: 'Success', paymentMethod });
    }
    catch (err) {
        console.log('catched errorrrrrrrrrrrrr', err);
        return res.status(400).json({ message: 'Internal Server Error!!!....' });
    }
};