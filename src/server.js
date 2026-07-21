const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);


require("dotenv").config();


const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const leadRoutes = require("./routes/leadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");



const app = express();



app.use(
  cors()
);


app.use(
  express.json()
);



// Static Images

app.use(
  "/uploads",
  express.static("uploads")
);




// Routes

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/leads",
  leadRoutes
);


app.use(
  "/api/listings",
  listingRoutes
);


app.use(
  "/api/agency",
  agencyRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);


// Test API

app.get(
  "/",
  (req,res)=>{

    res.send(
      "PropNex API Running"
    );

  }
);





const PORT =
process.env.PORT || 5000;




const startServer = async()=>{


try{


await connectDB();


app.listen(
PORT,
()=>{

console.log(
`Server running on port ${PORT}`
);

}
);



}
catch(error){


console.log(
"SERVER ERROR:",
error
);


process.exit(1);


}



};



startServer();