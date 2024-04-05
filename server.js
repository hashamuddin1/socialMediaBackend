/* eslint-disable no-console */
const express = require('express');

const app = express();
require('dotenv').config();

const port = process.env.PORT;
require('./config/db');
const cors = require('cors');
const userRouter = require('./router/userRoute');
const postRouter = require('./router/postRoute');

app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([userRouter, postRouter]);

app.listen(port, () => {
  console.log(
    `Our Server is running at port ${port} in Development Environment`,
  );
});
