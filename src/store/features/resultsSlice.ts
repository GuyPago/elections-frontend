import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vote from "../../models/electionModels/Vote";
import VoteStat from "../../models/electionModels/VoteStat";

interface partyStats {
  stats: VoteStat[];
  selectedParty: string;
}

const initialState: partyStats = {
  stats: [],
  selectedParty: "",
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
    updateSelectedParty: (state, action: PayloadAction<string>) => {
      state.selectedParty = action.payload;
    },
  },
});

export const { overridePartyStats, incrementPartyFromVote, updateSelectedParty } =
  resultsSlice.actions;
export default resultsSlice.reducer;
