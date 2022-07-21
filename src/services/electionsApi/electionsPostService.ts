import { BACKEND_URL, DATABASE_ERROR_MSG } from "../../config/appsettings";
import axios from "axios";
import Vote from "../../models/electionModels/Vote";
import { DbError } from "../../exceptions/electionsApiExceptions";

export const postVote = async (newVote: Vote): Promise<Vote> => {
  let result: Vote;

  try {
    const res = await axios.post(`${BACKEND_URL}/votes/`, newVote);
    result = res.data;
  } catch (e) {
    // log real error to logger
    throw new DbError(DATABASE_ERROR_MSG);
  }

  return result;
};
