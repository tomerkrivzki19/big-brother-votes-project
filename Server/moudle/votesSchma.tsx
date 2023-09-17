import mongooseClientVote from "mongoose";
import { VotesClient } from "./Interface";

const userVoteSchema = new mongooseClientVote.Schema<VotesClient>({
  voteOne: Number,
  voteTwo: Number,
  voteThree: Number,
  voteFour: Number,
  voteFive: Number,
});

var voteSchema = mongooseClientVote.model<VotesClient>("votes", userVoteSchema);
module.exports = voteSchema;
