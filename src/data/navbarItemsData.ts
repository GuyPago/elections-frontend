import { pagesUrl } from "../config/appsettings";
import NavbarItem from "../models/NavbarItem";

const navbarItemsData: NavbarItem[] = [
  {
    id: "1",
    title: "אודות",
    link: pagesUrl.about,
  },
  {
    id: "2",
    title: "מידע",
    link: pagesUrl.info,
  },
  {
    id: "3",
    title: "המרכז האישי",
    link: pagesUrl.login,
  },
];

export default navbarItemsData;
