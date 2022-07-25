import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vote from "../../models/electionModels/Vote";
import VoteStat from "../../models/electionModels/VoteStat";

interface partyStats {
  stats: VoteStat[];
}

const initialState: partyStats = {
  stats: [],
};

const resultsSlice = createSlice({
  name: "partyStats",
  initialState,
  reducers: {
    overridePartyStats: (state, action: PayloadAction<VoteStat[]>) => {
      state.stats = action.payload;
    },
    incrementPartyFromVote: (state, action: PayloadAction<Vote>) => {
      const votedParty = action.payload.voteValue;
      const existingParty = state.stats.find((x) => x._id === votedParty);
      existingParty!.count++;
    },
  },
});

export const { overridePartyStats, incrementPartyFromVote } = resultsSlice.actions;
export default resultsSlice.reducer;
