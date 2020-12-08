import React from "react";
import Featured from "./features";
import MatchesHome from "./matches";
import MeetPlayers from "./meetPlayers";
import Promotion from "./promotions";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
