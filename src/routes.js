import React from "react";
import Layout from "./hoc/Layout";
import { Switch } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/signin";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoutes from "./components/authRoutes/PrivateRoutes";
import PublicRoutes from "./components/authRoutes/PublicRoutes";
import AdminMatches from "./components/admin/matches";
import AddEditMatches from "./components/admin/matches/AddEditMatches";
import AdminPlayers from "./components/admin/players";
import AddEditPlayers from "./components/admin/players/AddEditPlayers";
import TheTeam from "./components/theTeam";
import TheMatches from "./components/theMathces";
import NotFound from "./components/UI/not_found";

const Routes = (props) => {
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoutes
            {...props}
            path="/dashboard"
            exact
            component={Dashboard}
          />
          <PrivateRoutes
            {...props}
            path="/admin_players/add_players"
            exact
            component={AddEditPlayers}
          />
          <PrivateRoutes
            {...props}
            path="/admin_players/add_players/:id"
            exact
            component={AddEditPlayers}
          />
          <PrivateRoutes
            {...props}
            path="/admin_players"
            exact
            component={AdminPlayers}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches/edit_match"
            exact
            component={AddEditMatches}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches/edit_match/:id"
            exact
            component={AddEditMatches}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches"
            exact
            component={AdminMatches}
          />
          <PublicRoutes
            {...props}
            restricted={false}
            path="/the_team"
            exact
            component={TheTeam}
          />
          <PublicRoutes
            {...props}
            restricted={false}
            path="/the_matches"
            exact
            component={TheMatches}
          />
          <PublicRoutes
            {...props}
            restricted={true}
            path="/sign_in"
            exact
            component={SignIn}
          />
          <PublicRoutes
            {...props}
            restricted={false}
            path="/"
            exact
            component={Home}
          />
          <PublicRoutes
            {...props}
            restricted={false}
            exact
            component={NotFound}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
