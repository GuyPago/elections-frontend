import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VoteStat from "../../models/electionModels/VoteStat";
import { getVoteStats } from "../../services/electionsApi/electionsFetchService copy";
import "./Results.css";
import { ResultsBar } from "./ResultsBar/ResultsBar";

export const Results: FC = () => {
  let selectedParty: string;
  const [voteStatsData, setVoteStatsData] = useState<VoteStat[]>([]);
  const pageState = useLocation();

  try {
    selectedParty = pageState.state as string;
  } catch (err) {
    if (err instanceof TypeError) {
      selectedParty = "";
    }
  }

  useEffect(() => {
    (async () => {
      const voteStats = await getVoteStats();
      setVoteStatsData(voteStats);
    })();
  });

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
