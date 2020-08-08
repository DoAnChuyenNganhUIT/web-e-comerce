const stripeSecretKey = 'sk_test_51HBrUzE1YyoPw89PyRgZoDRyVRonjJaUOUvb4vdszG0p3zXTlPCEGn85PGuor27viRosExsdk4PIZ10muxSNddmL00IcJYJg0S';
const stripePublishableKey = 'pk_test_51HBrUzE1YyoPw89PbIkegWW9Jg6waBhz8ID0nq2IUDw5HEhHcqSOqu8fCgeW7dyXNjl64KYQ6cSoUuZ6bUX08v3a00P4sLVLQ5';
const stripe = require('stripe')(stripeSecretKey)
const { v4: uuidv4 } = require('uuid');
const { result } = require('lodash');
let router = global.router;

router.post('/purchase', function(req, res) {
  const {product, token} = req.body;
  const idempontencyKey = uuidv4();
  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: product.totalPrice * 100,
      customer: customer.id,
      receipt_email: token.email,
      description: 'Buy product',
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    }, {idempontencyKey})
  })
  .then(result => 
    {
      req.session.card = null
    res.status(200).json(result)
    })
  .catch(err => console.log(err));
 
  // stripe.charges.create({
  //   amount: req.body.totalPrice,
  //   source: req.body.stripeTokenId,
  //   currency: 'usd'
  // }).then(function() {
  //   console.log('Charge Successful')
  //   res.json({ message: 'Successfully purchased items' })
  // }).catch(function() {
  //   console.log('Charge Fail')
  //   res.status(500).end()
  // })

})


module.exports = router;