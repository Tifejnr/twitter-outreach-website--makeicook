import React, { useEffect } from "react";
import HomeNavBar from "./HomeNavBar";
import useStore from "../Hooks/Zustand/usersStore";
import Boards from "./Sections/BoardsTools/Boards";
import Workspaces from "./Sections/Workspaces/Workspaces";
import { changeTabTitle } from "../utilis/changeTabTitle";

const homepageTabTitle = "Add Members to Boards – Collab for Trello";
export default function HomePage() {
  changeTabTitle(homepageTabTitle);

  const creditsFromServer = useStore((state) => state.creditsFromServer);

  return (
    <>
      <HomeNavBar
        innerText={
          creditsFromServer == 1
            ? `Credit:${creditsFromServer} `
            : `Credits:${creditsFromServer}`
        }
        pagelink="#"
        noTools={true}
      />

      <main className="home-main-cont">
        <h2>Select tool that matches the action you want to execute:</h2>
        <Boards />
        <Workspaces />
      </main>
    </>
  );
}
