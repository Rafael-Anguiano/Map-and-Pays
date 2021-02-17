const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// eslint-disable-next-line func-call-spacing
// eslint-disable-next-line max-len
const Stripe = require("stripe")("sk_test_51ILAJZFlD97kQstqGeq5td0ICAEm3GVhGlscfvZoKG09GxINAtw5rpBbjYRf2HtEk3axmWtXGKDqvxIH1yIqfhu7007JUPuRRP");
// eslint-disable-next-line max-len
exports.completePaymentWithStripe = functions.https.onRequest((request, response) => {
  Stripe.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: "tok_mastercard",
  }).then((charge) => {
    response.send(charge);
  })
      .catch((error) => {
        console.log(error);
      });
});
