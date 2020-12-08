import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import NodeGroup from "react-move/NodeGroup";

class MatchesList extends Component {
  state = {
    matcheslist: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Rarely Used
    return (prevState = {
      matcheslist: nextProps.matches,
    });
  }

  showMatches = () => {
    return this.state.matcheslist ? (
      <NodeGroup
        data={this.state.matcheslist}
        keyAccessor={(d) => d.id}
        start={() => {
          return {
            opacity: 0,
            x: -200,
          };
        }}
        enter={(d, i) => {
          return {
            opacity: [1],
            x: [0],
            timing: { duration: 500, delay: i * 50, ease: easePolyOut },
          };
        }}
        update={(d, i) => {
          return {
            opacity: [1],
            x: [0],
            timing: { duration: 500, delay: i * 50, ease: easePolyOut },
          };
        }}
        leave={(d, i) => {
          return {
            opacity: [0],
            x: [-290],
            timing: { duration: 500, delay: i * 50, ease: easePolyOut },
          };
        }}
      >
        {(node) => {
          return (
            <div>
              {node.map(({ key, data, state: { x, opacity } }) => (
                <div
                  key={key}
                  className="match_box_big"
                  style={{ opacity, transform: `translate(${x}px)` }}
                >
                  <div className="block_wraper">
                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.localThmb}.png)`,
                        }}
                      ></div>
                      <div className="result">{data.resultLocal}</div>
                    </div>
                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.awayThmb}.png)`,
                        }}
                      ></div>
                      <div className="result">{data.resultAway}</div>
                    </div>
                  </div>
                  <div className="block_wraper nfo">
                    <div>
                      <strong>Date:</strong> {data.date}
                    </div>
                    <div>
                      <strong>Stadium:</strong> {data.stadium}
                    </div>
                    <div>
                      <strong>Referee:</strong> {data.referee}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </NodeGroup>
    ) : null;
  };

  render() {
    return <div>{this.showMatches()}</div>;
  }
}

export default MatchesList;
