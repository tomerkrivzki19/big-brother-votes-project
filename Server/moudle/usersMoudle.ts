import mongooseClient from "mongoose";
import { userClient } from "./Interface";

const clientScehma = new mongooseClient.Schema<userClient>({
  firstName: String,
  lastName: String,
  tel: Number,
});

var ClientsModel = mongooseClient.model<userClient>("Clients", clientScehma);

module.exports = ClientsModel;
