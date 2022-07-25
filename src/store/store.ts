import { configureStore } from "@reduxjs/toolkit";
import { getVoteStats } from "../services/electionsApi/electionsFetchService";
import resultsReducer, { overridePartyStats } from "./features/resultsSlice";

const store = configureStore({
  reducer: {
    partyStats: resultsReducer,
  },
});

// initial fetch IIFE
(async () => {
  const fetchedVoteStats = await getVoteStats();
  store.dispatch(overridePartyStats(fetchedVoteStats));
})();

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export default store;
