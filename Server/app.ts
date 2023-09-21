import express, { Request, Response } from "express";
import cors from "cors";
import { Model } from "mongoose";
import { userClient, VotesClient } from "./moudle/Interface";
import { uuid } from "uuidv4";
import { v4 } from "uuid";
import Verify from "./authenticator/authenticator";

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const ClientsModel: Model<userClient> = require("./moudle/usersMoudle");
const voteModel: Model<VotesClient> = require("./moudle/votesModel");

const app = express();
const port = 8080;
// 172.20.10.6

app.use(cors());
app.use(express.json());
app.use(Verify);

var access_token = process.env.ACCESS_TOKEN_SECRET;
var mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(mongo_uri)
  .then(() => console.log("Connected to mongoose"))
  .catch((err: { message: any }) => {
    console.log(`at mongoose connect: ${err.message}`);
  });

app.post("/user/signIn", async (req, res) => {
  try {
    const { firstName, tel } = req.body;

    if (!firstName || !tel) {
      console.log("missing data");
      res.status(404).json({
        message: "missing info",
      });
      return;
    }

    const client = await ClientsModel.find({ $or: [{ firstName }, { tel }] });
    if (!client) {
      console.log("not exist in the system");
      return res.status(404).send({ error: "missing/invalid info" });
    } else {
      res.status(200).json({
        status: "success",
        message: "authotiraize",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ error: error });
  }
});

app.put("/user/singup", async (req, res) => {
  try {
    const { firstName, lastName, tel } = req.body;

    if (!firstName || !lastName || !tel) {
      console.log("missing data");
      res.status(404).json({
        message: "missing info",
      });
      return;
    }

    if (await ClientsModel.findOne({ $or: [{ firstName }, { lastName }] }))
      return res.status(404).send({ error: "missing/invalid info" });

    const userId = v4();
    console.log(userId);

    const ClientDB = new ClientsModel({
      firstName,
      lastName,
      tel,
      userId,
    });
    const token = jwt.sign(userId, access_token || "");
    await ClientDB.save().then((data) => {
      return res.status(200).json({ data, token });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ error: error });
  }
});

app.post("/votesData", async (req, res) => {
  try {
    const votee = req.body;
    const voteDB = new voteModel({
      votee,
    });
    await voteDB.save().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.log("request failed ", error);
    return res.status(500).send({ error: error });
  }
});

app.get("/getVotes", (req, res) => {});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "not-found",
    status: "bacd request",
  });
});

app.listen(port, () => {
  console.log(`the server runing on port ${port}`);
});
