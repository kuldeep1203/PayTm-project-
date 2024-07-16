const express = require('express');
const cors = require('cors');
const app = express();
const en = require('dotenv')

en.config()
app.use(express.json());
app.use(cors());
const rootRouter = require("./routes/index");
const transactionRouter = require("./routes/account");

app.use("/api/v1", rootRouter);




app.listen(process.env.PORT,()=>{
    console.log('listening on port')
});