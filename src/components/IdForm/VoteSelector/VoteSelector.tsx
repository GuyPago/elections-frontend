import "./VoteSelector.css";
import { ChangeEvent, FC, useState } from "react";
import Party from "../../../models/electionModels/Party";
import { useNavigate } from "react-router-dom";
import Vote from "../../../models/electionModels/Vote";
import { postVote } from "../../../services/electionsApi/electionsPostService";
import { pagesUrl } from "../../../config/appsettings";
import { DbError } from "../../../exceptions/electionsApiExceptions";
import { CONFIRM_MODAL_TITLE, DEFAULT_PARTY_OPTION } from "../IdFormConsts";
import { ConfirmModal } from "../../Modal/ConfirmModal/ConfirmModal";

interface VoteOptionsProps {
  parties: Party[];
  voterId: string;
}

export const VoteSelector: FC<VoteOptionsProps> = (props) => {
  const navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const toggleModal = () => setShowConfirmModal((prevState) => !prevState);

  const submitVote = async (): Promise<void> => {
    const newVote: Vote = { _id: props.voterId, voteValue: selectedParty };
    try {
      await postVote(newVote);
      navigate(pagesUrl.results, { state: selectedParty });
    } catch (err) {
      if (err instanceof DbError) {
        navigate(pagesUrl.error);
      }
    }
  };

  const partyInputOptions: JSX.Element[] = props.parties.map((party) => (
    <option key={party._id} value={party.partyName}>
      {party.partyName}
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
