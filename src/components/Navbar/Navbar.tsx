import "./Navbar.css";
import { FC } from "react";
import { pagesUrl } from "../../config/appsettings";
import logo from "../../images/Israel_Blue_0.png";
import { NavbarItems } from "./NavbarItems";

export const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <a href={pagesUrl.login}>
        <img className="navbar--logo" src={logo} alt="pm-logo" />
      </a>
      <div className="navbar--title">
        <h1>
          <a href={pagesUrl.login}>משרד הפנים</a>
        </h1>
        <p>קלפי וירטואלי</p>
      </div>
      <NavbarItems />
    </nav>
  );
};
