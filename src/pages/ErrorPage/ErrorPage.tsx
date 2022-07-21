import { FC } from "react";
import { DATABASE_ERROR_MSG } from "../../config/appsettings";
import "./ErrorPage.css";

export const ErrorPage: FC = () => {
  // Should use contex/Redux here instead of const error
  return (
    <div className="error-page">
      <h1>{DATABASE_ERROR_MSG}</h1>
    </div>
  );
};
