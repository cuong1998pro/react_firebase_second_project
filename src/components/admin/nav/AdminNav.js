import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNav = () => {
  const Links = [
    { title: "Matches", linkTo: "/admin_matches" },
    { title: "Add match", linkTo: "/admin_matches/edit_match" },
    { title: "Players", linkTo: "/admin_players" },
    { title: "Add Player", linkTo: "/admin_players/add_players" },
  ];

  const listItemStyle = {
    color: "#fff",
    fontWeight: "300",
    borderBottom: "1px solid #353535",
  };

  const renderItems = () => {
    return Links.map((link, i) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={listItemStyle}>
          {link.title}
        </ListItem>
      </Link>
    ));
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Log out successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={listItemStyle} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
