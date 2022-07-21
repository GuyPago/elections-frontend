import { FC } from "react";
import { Results } from "../../components/Results/Results";
import "./ResultsPage.css";

export const ResultsPage: FC = () => {
  return (
    <div className="results-page">
      <h1 className="results-page--header">תוצאות ההצבעה</h1>
      <Results />
    </div>
  );
};
