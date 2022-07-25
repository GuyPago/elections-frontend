import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IRootState } from "../../store/store";
import "./Results.css";
import { ResultsBar } from "./ResultsBar/ResultsBar";

export const Results: FC = () => {
  let selectedParty: string;
  const pageState = useLocation();

  const { stats } = useSelector((state: IRootState) => state.partyStats);
  const voteStatsData = [...stats];

  try {
    selectedParty = pageState.state as string;
  } catch (err) {
    if (err instanceof TypeError) {
      selectedParty = "";
    }
  }

  const maxVoteCount: number = Math.max(...voteStatsData.map((party) => party.count));
  const voteStatsElements: JSX.Element[] = voteStatsData
    .sort((x, y) => y.count - x.count)
    .map((x) => (
      <ResultsBar
        key={x._id}
        party={x._id}
        maxCounts={maxVoteCount}
        voteCount={x.count}
        isSelected={selectedParty === x._id}
      />
    ));

  return <div className="results">{voteStatsElements}</div>;
};
