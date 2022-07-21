import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Copyrights } from "./components/Copyrights/Copyrights";
import { DEV_NAME, pagesUrl } from "./config/appsettings";
import { VotePage } from "./pages/VotePage/VotePage";
import { ResultsPage } from "./pages/ResultsPage/ResultsPage";
import { InfoPage } from "./pages/InfoPage/InfoPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

const App: FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path={pagesUrl.login} element={<VotePage />}></Route>
        <Route path={pagesUrl.results} element={<ResultsPage />}></Route>
        <Route path={pagesUrl.info} element={<InfoPage />}></Route>
        <Route path={pagesUrl.about} element={<AboutPage />}></Route>
        <Route path={pagesUrl.error} element={<ErrorPage />}></Route>
      </Routes>
      <Copyrights devName={DEV_NAME} />
    </div>
  );
};

export default App;
