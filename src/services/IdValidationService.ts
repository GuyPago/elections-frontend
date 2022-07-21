import { BACKEND_URL } from "../config/appsettings";
import HasVotedResult from "../enums/HasVotedResult";
import axios, { AxiosError } from "axios";

export const hasAllreadyVoted = async (voterId: string): Promise<HasVotedResult> => {
  if (!voterId || !isValidIsraeliId(voterId)) {
    return HasVotedResult.No;
  }

  let hasVoted = HasVotedResult.Unknown;

  try {
    const res = await axios.get(`${BACKEND_URL}/votes/${voterId}`);
    hasVoted = res.status === 200 ? HasVotedResult.Yes : HasVotedResult.No;
  } catch (err) {
    const axiosError = err as AxiosError;
    const isNotFound = axiosError.response?.status === 404;
    hasVoted = isNotFound ? HasVotedResult.No : HasVotedResult.Unknown;
  }

  return hasVoted;
};

export const isValidIsraeliId = (id: string): boolean => {
  if (id.length === 0) id = "0";
  if (id.length > 9) return false;
  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
};
