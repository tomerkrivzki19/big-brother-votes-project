// const express = require("express");
import express, { Request, Response } from "express";
import cors from "cors";
import { Model } from "mongoose";
import { userClient } from "./moudle/Interface";
const mongoose = require("mongoose");
require("dotenv").config();

const ClientsModel: Model<userClient> = require("./moudle/usersMoudle");

const app = express();
const port = 8080;
// 172.20.10.6

app.use(cors());
app.use(express.json());
var mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("Connected to mongoose"))
  .catch((err: { message: any }) => {
    console.log(`at mongoose connect: ${err.message}`);
  });

app.post("/user/singup", async (req, res) => {
  try {
    const { firstName, lastName, tel } = req.body;
    console.log(firstName);
    console.log(lastName);
    console.log(tel);
    if (!firstName || !lastName || !tel) {
      console.log("missing data");
      return;
    }
    if (
      await ClientsModel.findOne({
        $or: [{ firstName }, { lastName }, { tel }],
      })
    )
      return res.status(404).send({ error: "missing/invalid info" });
    const ClientDB = new ClientsModel({
      firstName,
      lastName,
      tel,
    });
    await ClientDB.save().then((data) => {
      return res.status(200).json({ data });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ error: error });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "not-found",
    status: "bacd request",
  });
});

app.listen(port, () => {
  console.log(`the server runing on port ${port}`);
});
