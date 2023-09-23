// Calculate the sum of votes for each individual within each object
const calculatedData = data.map((obj) => {
  const voteCalculations = {};

  // Iterate through the votee object for each object
  for (const person in obj.votee) {
    if (Object.hasOwnProperty.call(obj.votee, person)) {
      const votes = obj.votee[person];
      // Perform your calculation here for each individual (e.g., sum of votes)
      const voteSum = votes.reduce((total, vote) => total + vote, 0);
      voteCalculations[person] = voteSum;
    }
  }

  return {
    ...obj,
    voteCalculations: voteCalculations,
  };
});

//  CANCULATE EACH AND EACH VOTE, OPERATION
