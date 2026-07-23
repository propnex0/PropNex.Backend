const { Cashfree, CFEnvironment } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = CFEnvironment.PRODUCTION;

const createOrder = async (req, res) => {
  try {
    const {
      amount,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body;

    const orderId = "order_" + Date.now();

    const request = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: "INR",

      customer_details: {
        customer_id: customerId || orderId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },

      order_meta: {
        return_url:
          "https://prop-nex-frontend.vercel.app/payment-success?order_id={order_id}",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    console.log("Cashfree Response =", response.data);

    return res.status(200).json(response.data);
 } catch (error) {
  console.log("========== CASHFREE ERROR ==========");
  console.log("Message:", error.message);
  console.log("Response:", error.response?.data);
  console.log("Full Error:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    error: error.response?.data || error.message,
  });
}
};

module.exports = {
  createOrder,
};