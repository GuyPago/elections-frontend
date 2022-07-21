import { FC } from "react";
import "./ConfirmModal.css";

interface ModalProps {
  title: string;
  selectedEntity: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConfirmModal: FC<ModalProps> = (props) => {
  return (
    <div className="vote-confirm-modal--wrapper">
      <div className="vote-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vote-confirm-modal--verbs">
          <h2>{props.title}</h2>
          <h3>{props.selectedEntity}</h3>
        </div>
        <div className="vote-confirm-modal--buttons">
          <button className="vote-confirm-modal--cancel-button" onClick={props.onCancel}>
            ביטול
          </button>
          <button className="vote-confirm-modal--accept-button" onClick={props.onAccept}>
            אישור
          </button>
        </div>
      </div>
    </div>
  );
};
