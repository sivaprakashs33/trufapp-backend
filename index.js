const express = require("express");
const ConnectDB = require('./config/db');
require('dotenv').config();
const usersRouter = require('./routers/userRouter');
const trufRouter = require('./routers/adminRouter')
const bookingRouter = require('./routers/bookingRouter');
const cors = require("cors");
// const PORT = 4000;


const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/user", usersRouter);
app.use("/api/truf", trufRouter);
app.use("/api/booking", bookingRouter);


const { default: mongoose } = require("mongoose");



app.get("/",(req,res)=>{
    res.send("hello world");
});


ConnectDB();

app.listen(process.env.PORT, () =>
     console.log(`server started on port:$(process.env.PORT)`));





