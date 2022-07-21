import classNames from "classnames";
import { FC } from "react";
import HasVotedResult from "../../../enums/HasVotedResult";
import { VOTE_INIT_VALUE } from "../IdFormConsts";
import * as msg from "./formMessages";

interface VoterProps {
  idInput: string;
  hasVoted: HasVotedResult;
  isValid: boolean;
}

enum TextColor {
  Red,
  Green,
}

const messageCompGen = (content: string, textColor: TextColor = TextColor.Red): JSX.Element => {
  const textStyle = classNames(
    { "id-form--voted-warn": textColor === TextColor.Red },
    { "id-form--voted-accept": textColor === TextColor.Green }
  );

  return <p className={textStyle}>{content}</p>;
};

export const VoteMessage: FC<VoterProps> = (props) => {
  if (props.idInput === VOTE_INIT_VALUE) {
    return <div />;
  }

  if (!props.idInput) {
    return messageCompGen(msg.NO_ID_MSG);
  }

  if (!props.isValid) {
    return messageCompGen(msg.INVALID_ID_MSG);
  }

  let component: JSX.Element;

  if (props.hasVoted === HasVotedResult.Yes) {
    component = messageCompGen(msg.ALREADY_VOTED_MSG);
  } else if (props.hasVoted === HasVotedResult.Unknown) {
    component = messageCompGen(msg.DB_ERROR_MSG);
  } else {
    component = messageCompGen(msg.ACCEPT_ID_MSG, TextColor.Green);
  }

  return component;
};
