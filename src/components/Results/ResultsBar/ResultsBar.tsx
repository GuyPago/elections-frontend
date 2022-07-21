import classNames from "classnames";
import { FC } from "react";

interface VoteBarProps {
  voteCount: number;
  maxCounts: number;
  party: string;
  isSelected: boolean;
}

export const ResultsBar: FC<VoteBarProps> = (props) => {
  const selectedBarStyle = classNames("res-bar--fill", {
    "res-bar-selected--fill": props.isSelected,
  });

  let barHeightFill: string = "0%";
  if (props.maxCounts > 0) {
    barHeightFill = Math.round((100 * props.voteCount) / props.maxCounts) + "%";
  }

  return (
    <div className="res-bar">
      <div className="res-bar--container">
        <div className={selectedBarStyle} style={{ width: barHeightFill }}>
          {props.voteCount}
        </div>
      </div>
      <div className="res-bar--labels">
        <div className="res-bar--label">{props.party}</div>
      </div>
    </div>
  );
};
