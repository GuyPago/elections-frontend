import "./VoteSelector.css";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vote from "../../../models/electionModels/Vote";
import { postVote } from "../../../services/electionsApi/electionsPostService";
import { pagesUrl } from "../../../config/appsettings";
import { DbError } from "../../../exceptions/electionsApiExceptions";
import { CONFIRM_MODAL_TITLE, DEFAULT_PARTY_OPTION } from "../IdFormConsts";
import { ConfirmModal } from "../../Modal/ConfirmModal/ConfirmModal";
import { useDispatch } from "react-redux";
import { IAppDispatch } from "../../../store/store";
import { incrementPartyFromVote, updateSelectedParty } from "../../../store/features/resultsSlice";

interface VoteOptionsProps {
  partyNames: string[];
  voterId: string;
}

export const VoteSelector: FC<VoteOptionsProps> = (props) => {
  const dispatch: IAppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const toggleModal = () => setShowConfirmModal((prevState) => !prevState);

  const submitVote = async (): Promise<void> => {
    const newVote: Vote = { _id: props.voterId, voteValue: selectedParty };
    try {
      await postVote(newVote);
      dispatch(incrementPartyFromVote(newVote));
      dispatch(updateSelectedParty(newVote.voteValue));
      navigate(pagesUrl.results);
    } catch (err) {
      if (err instanceof DbError) {
        navigate(pagesUrl.error);
      }
    }
  };

  const partyInputOptions: JSX.Element[] = props.partyNames.map((party, index) => (
    <option key={index} value={party}>
      {party}
    </option>
  ));

  const updatePartySelection = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedParty = event.target.value;
    setSelectedParty(selectedParty);
  };

  return (
    <div className="id-form--buttons">
      <button disabled={!selectedParty} type="button" onClick={toggleModal}>
        הצבע
      </button>
      <select
        className="vote-selector--select"
        onChange={updatePartySelection}
        defaultValue={DEFAULT_PARTY_OPTION}
      >
        <option value="">{DEFAULT_PARTY_OPTION}</option>
        {partyInputOptions}
      </select>
      {showConfirmModal && (
        <ConfirmModal
          title={CONFIRM_MODAL_TITLE}
          selectedEntity={selectedParty}
          onAccept={submitVote}
          onCancel={toggleModal}
        />
      )}
    </div>
  );
};
