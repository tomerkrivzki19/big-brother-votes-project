import mongooseVote from "mongoose";
import { VotesClient } from "./Interface";

const userVoteSchema = new mongooseVote.Schema<VotesClient>({
  votee: [],
});

var voteModel = mongooseVote.model<VotesClient>("votes", userVoteSchema);
module.exports = voteModel;
