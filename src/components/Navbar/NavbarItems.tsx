import { FC } from "react";
import { NavLink } from "react-router-dom";
import navbarItemsData from "../../data/navbarItemsData";

export const NavbarItems: FC = () => {
  const navbarItems: JSX.Element[] = navbarItemsData.map((item) => (
    <li key={item.id}>
      <NavLink to={item.link}>{item.title}</NavLink>
    </li>
  ));

  return <ul className="navbar--items">{navbarItems}</ul>;
};
