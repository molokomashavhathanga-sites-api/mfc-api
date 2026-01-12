import express from "express";
import morgan from "morgan";
const app = express();


app.use(morgan("combined"));


function logger(req, res, next) {
  res.on('finish', () => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Status Code:", res.statusCode);
  });

  next();
}

app.use(logger);


export default logger;