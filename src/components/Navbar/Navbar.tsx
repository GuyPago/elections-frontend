import "./Navbar.css";
import { FC } from "react";
import { pagesUrl } from "../../config/appsettings";
import logo from "../../images/Israel_Blue_0.png";
import { NavbarItems } from "./NavbarItems";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <Link to={pagesUrl.login}>
        <img className="navbar--logo" src={logo} alt="pm-logo" />
      </Link>
      <div className="navbar--title">
        <h1>
          <Link to={pagesUrl.login}>משרד הפנים</Link>
        </h1>
        <p>קלפי וירטואלי</p>
      </div>
      <NavbarItems />
    </nav>
  );
};
