import { Request, Response, NextFunction } from "express";
import jwt = require("jsonwebtoken");
require("dotenv").config();

const accessVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1] || "";
  if (!accessToken) {
    return next();
  } else {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET || "",
      async (err, paylod) => {
        if (!err) return res.status(200);
        else return res.sendStatus(401);
      }
    );
  }
};

export default accessVerify;
