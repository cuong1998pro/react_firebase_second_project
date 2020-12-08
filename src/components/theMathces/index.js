import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseMatches } from "../../firebase";
import { firebaseLooper } from "../UI/misc";
import LeagueTable from "./table";
import MatchesList from "./MatchList";

class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: "All",
    resultFilter: "All",
  };

  componentDidMount() {
    firebaseMatches.once("value").then((snapshot) => {
      const matches = firebaseLooper(snapshot);
      this.setState({
        loading: false,
        matches: matches.reverse(),
        filterMatches: matches.reverse(),
      });
    });
  }

  showPlayed = (played) => {
    const list = this.state.matches.filter((match) => match.final === played);

    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playerFilter: played,
      resultFilter: "All",
    });
  };

  showResult = (result) => {
    const list = this.state.matches.filter((match) => match.result === result);

    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      playerFilter: "All",
      resultFilter: result,
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="matches_filters">
              <div className="match_filters_box">
                <div className="tag">Show match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.playerFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.playerFilter === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("Yes")}
                  >
                    Play
                  </div>
                  <div
                    className={`option ${
                      state.playerFilter === "No" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("No")}
                  >
                    Not played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Show match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.resultFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "W" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "L" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("L")}
                  >
                    L
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "D" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("D")}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
