import { FC } from "react";
import "./Copyrights.css";

interface CopyrightProps {
  devName: string;
}

export const Copyrights: FC<CopyrightProps> = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className="copyrights">
      <p>
        &copy; {year} {props.devName} developement
      </p>
    </footer>
  );
};
