import { pagesUrl } from "../config/appsettings";
import NavbarItem from "../models/NavbarItem";

const navbarItemsData: NavbarItem[] = [
  {
    id: "1",
    title: "תוצאות",
    link: pagesUrl.results,
  },
  {
    id: "2",
    title: "אודות",
    link: pagesUrl.about,
  },
  {
    id: "3",
    title: "מידע",
    link: pagesUrl.info,
  },
  {
    id: "4",
    title: "המרכז האישי",
    link: pagesUrl.login,
  },
];

export default navbarItemsData;
