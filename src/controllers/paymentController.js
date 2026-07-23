const axios = require("axios");

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
console.log("APP ID =", process.env.CASHFREE_APP_ID);
console.log(
  "SECRET START =",
  process.env.CASHFREE_SECRET_KEY?.substring(0, 15)
);
console.log("ENV =", process.env.CASHFREE_ENV);
    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
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
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cashfree Response =", response.data);

    res.status(200).json(response.data);

  } catch (error) {
    console.log("========== CASHFREE ERROR ==========");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to create Cashfree order",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  createOrder,
};