// const express = require("express");
import express, { Request, Response } from "express";
import cors from "cors";
import { Model } from "mongoose";
import { userClient } from "./moudle/Interface";
import { json } from "node:stream/consumers";
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
    if (await ClientsModel.findOne({ $or: [{ firstName }, { lastName }] }))
      return res.status(404).send({ error: "missing/invalid info" });
    console.log("step one");

    const ClientDB = new ClientsModel({
      firstName,
      lastName,
      tel,
    });
    console.log("step two");

    await ClientDB.save().then((data) => {
      console.log("step three");
      console.log("the data has been passed back");
      return res.status(200).json({ data });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ error: error });
  }
});

app.post("/votesData", (req, res) => {
  const { voteOne, voteTwo, voteThree, voteFour, voteFive } = req.body;
  // console.log(voteOne);
  // const voteDb =
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
