import "./IdForm.css";
import { FC, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../config/appsettings";
import HasVotedResult from "../../enums/HasVotedResult";
import VoterDTO from "../../models/electionModels/VoterDTO";
import { hasAllreadyVoted, isValidIsraeliId } from "../../services/IdValidationService";
import { VOTE_INIT_VALUE } from "./IdFormConsts";
import { VoteMessage } from "./VoteMessage/VoteMessage";
import { VoteSelector } from "./VoteSelector/VoteSelector";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

export const IdForm: FC = () => {
  const navigate = useNavigate();
  const idInputRef = useRef<HTMLInputElement>(null);

  const partyVoteStats = useSelector((state: IRootState) => state.partyStats.stats);
  const partyNames = partyVoteStats.map((party) => party._id);

  const [voteDetails, setVoteDetails] = useState<VoterDTO>({
    voterId: VOTE_INIT_VALUE,
    hasVoted: HasVotedResult.No,
    isValidId: true,
  });
  const { voterId, hasVoted, isValidId } = voteDetails;

  const updateVoteIdFields = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const voterIdInput = idInputRef.current?.value as string;
    const isValidId: boolean = isValidIsraeliId(voterIdInput);
    const hasVoted = await hasAllreadyVoted(voterIdInput);

    setVoteDetails({
      voterId: voterIdInput,
      hasVoted: hasVoted,
      isValidId: isValidId,
    });
  };

  const isEligibleToVote: boolean =
    hasVoted === HasVotedResult.No && isValidId && ![VOTE_INIT_VALUE, ""].includes(voterId);

  return (
    <form onSubmit={updateVoteIdFields} className="id-form">
      <div className="id-form--controls">
        <label>אנא הכנס תעודת זהות</label>
        <input
          type="text"
          ref={idInputRef}
          disabled={isEligibleToVote || hasVoted === HasVotedResult.Yes}
        />
        <VoteMessage idInput={voterId} hasVoted={hasVoted} isValid={isValidId} />
        <div className="id-form--buttons">
          {hasVoted === HasVotedResult.Yes && (
            <button type="button" onClick={() => navigate(pagesUrl.results)}>
              תוצאות
            </button>
          )}
          {!isEligibleToVote && hasVoted === HasVotedResult.No && (
            <button type="submit">המשך</button>
          )}

          {isEligibleToVote && <VoteSelector partyNames={partyNames} voterId={voterId} />}
        </div>
      </div>
    </form>
  );
};
