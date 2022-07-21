import { BACKEND_URL } from "../../config/appsettings";
import axios from "axios";
import Party from "../../models/electionModels/Party";
import VoteStat from "../../models/electionModels/VoteStat";

export const getVoteStats = async (): Promise<VoteStat[]> => {
  let voteStats: VoteStat[];

  try {
    const res = await axios.get(`${BACKEND_URL}/votes/stats`);
    voteStats = res.data;
  } catch {
    voteStats = [];
  }

  return voteStats;
};

export const getParties = async (): Promise<Party[]> => {
  let parties: Party[];
  try {
    const res = await axios.get(`${BACKEND_URL}/parties`);
    parties = res.data;
  } catch {
    parties = [];
  }

  return parties;
};
