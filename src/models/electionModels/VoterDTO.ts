import HasVotedResult from "../../enums/HasVotedResult";

export default interface VoterDTO {
  voterId: string;
  hasVoted: HasVotedResult;
  isValidId: boolean;
}
