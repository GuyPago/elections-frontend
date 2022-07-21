import "./IdForm.css";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../config/appsettings";
import HasVotedResult from "../../enums/HasVotedResult";
import Party from "../../models/electionModels/Party";
import VoterDTO from "../../models/electionModels/VoterDTO";
import { getParties } from "../../services/electionsApi/electionsFetchService copy";
import { hasAllreadyVoted, isValidIsraeliId } from "../../services/IdValidationService";
import { VOTE_INIT_VALUE } from "./IdFormConsts";
import { VoteMessage } from "./VoteMessage/VoteMessage";
import { VoteSelector } from "./VoteSelector/VoteSelector";

export const IdForm: FC = () => {
  const navigate = useNavigate();
  const idInputRef = useRef<HTMLInputElement>(null);

  const [parties, setParties] = useState<Party[]>([]);
  const [voteDetails, setVoteDetails] = useState<VoterDTO>({
    voterId: VOTE_INIT_VALUE,
    hasVoted: HasVotedResult.No,
    isValidId: true,
  });
  const { voterId, hasVoted, isValidId } = voteDetails;

  const isEligibleToVote: boolean =
    hasVoted === HasVotedResult.No && isValidId && ![VOTE_INIT_VALUE, ""].includes(voterId);

  useEffect(() => {
    (async () => {
      const fetchedParties: Party[] = await getParties();
      setParties(fetchedParties);
    })();
  }, []);

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

          {isEligibleToVote && <VoteSelector parties={parties} voterId={voterId} />}
        </div>
      </div>
    </form>
  );
};
