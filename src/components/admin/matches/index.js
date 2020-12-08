import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper } from "../../UI/misc";
import { Link } from "react-router-dom";

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
  };

  componentDidMount() {
    firebaseMatches.once("value").then((snapshoot) => {
      const matches = firebaseLooper(snapshoot);
      this.setState({
        isLoading: false,
        matches: matches.reverse(),
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div className="">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Matches</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.matches
                  ? this.state.matches.map((match, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>
                            <Link to={`/admin_matches/edit_match/${match.id}`}>
                              {match.away} <strong>-</strong> {match.local}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {match.resultAway} <strong>-</strong>{" "}
                            {match.resultLocal}
                          </TableCell>
                          <TableCell>
                            {match.final === "Yes" ? (
                              <span className="matches_tag_red">Final</span>
                            ) : (
                              <span className="matches_tag_green">
                                Not played
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "lightblue" }} />
            ) : null}
          </div>{" "}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminMatches;
