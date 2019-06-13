import React from "react";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faChild } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

var Count = 0,
  childrenCheck = 0,
  roomCheck = 1,
  adultCheck = 1;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCount: 1,
      adultCount: 1,
      childrenCount: 0
    };
  }
  addRooms = () => {
    if (this.state.roomCount < 5) {
      roomCheck++;
      // adultCheck++;
      let difference = roomCheck - adultCheck;
      adultCheck += difference;
      this.setState({
        roomCount: this.state.roomCount + 1,
        adultCount: this.state.adultCount + difference
      });
    }
  };

  minusRooms = () => {
    if (this.state.roomCount > 1) {
      roomCheck--;
      this.setState({
        roomCount: this.state.roomCount - 1
      });
    }
   // console.log(roomCheck);
    if (this.state.adultCount + this.state.childrenCount > roomCheck * 4) {
      if (this.state.roomCount <= 5) {
        if (!(roomCheck * 4 - this.state.childrenCount < 0)) {
          if (this.state.adultCount < roomCheck) {
            let difference = roomCheck - adultCheck;
           
            this.setState({
              adultCount: this.state.adultCount + difference,
              childrenCount: roomCheck * 4 - this.state.adultCount
            });
          } else {
            // let difference = roomCheck - adultCheck;
           // console.log("inside");
            let zero = roomCheck * 4 - this.state.adultCount;
            if (zero > 0) {
              this.setState({
                adultCount: this.state.adultCount,
                childrenCount: roomCheck * 4 - this.state.adultCount
              });
            } else {
              this.setState({
                adultCount: 4,
                childrenCount: 0
              });
            }
          }
        } else {
          if (this.state.adultCount < roomCheck) {
            let difference = roomCheck - adultCheck;
            let d = roomCheck * 4 - (this.state.adultCount + difference);
           // console.log(d);
            this.setState({
              adultCount: this.state.adultCount + difference,
              childrenCount: d
            });
          }
        }
      }
    }
  };
  addAdult = () => {
    adultCheck++;
    if ((this.state.adultCount + this.state.childrenCount) % 4 === 0) {
      if (this.state.roomCount < 5) {
        roomCheck++;
        this.setState({
          roomCount: this.state.roomCount + 1
        });
      }
    }
    Count++;
    this.setState({
      adultCount: this.state.adultCount + 1
    });
  };

  minusAdult = () => {
    if (this.state.adultCount > 1) {
      adultCheck--;
      this.setState({
        adultCount: this.state.adultCount - 1
      });
    }

    if (Count % 4 === 0) {
      if (this.state.roomCount > 1) {
        roomCheck--;
        this.setState({
          roomCount: this.state.roomCount - 1
        });
      }
    } else if (roomCheck > adultCheck) {
      if (this.state.roomCount > 1) {
        roomCheck--;
        this.setState({
          roomCount: this.state.roomCount - 1
        });
      }
    }
    Count--;
  };

  addChildren = () => {
    childrenCheck++;
    if ((this.state.childrenCount + this.state.adultCount) % 4 === 0) {
      if (
        this.state.roomCount < 5 &&
        this.state.adultCount > this.state.roomCount
      ) {
        roomCheck++;
        //
        if (this.state.adultCount < roomCheck) {
          let difference = roomCheck - adultCheck;

          this.setState({
            adultCount: this.state.adultCount + difference,
            roomCount: this.state.roomCount + 1
          });
          adultCheck = this.state.adultCount + difference;
        }
      } else if (
        this.state.roomCount < 5 &&
        this.state.childrenCount + this.state.adultCount ===
          this.state.roomCount * 4
      ) {
        roomCheck++;
        if (this.state.adultCount < roomCheck) {
          let difference = roomCheck - adultCheck;

          this.setState({
            adultCount: this.state.adultCount + difference,
            roomCount: this.state.roomCount + 1
          });
          adultCheck = this.state.adultCount + difference;
        }
      }
    }
    Count++;

    if (
      this.state.childrenCount + this.state.adultCount !==
      4 * this.state.roomCount
    ) {
      this.setState({
        childrenCount: this.state.childrenCount + 1
      });
    }
  };

  minusChildren = () => {
    childrenCheck--;
    this.setState({
      childrenCount: this.state.childrenCount - 1
    });
    if (Count % 4 === 0) {
      if (this.state.roomCount > 1) {
        roomCheck--;
        this.setState({
          roomCount: this.state.roomCount - 1
        });
      }
    }
    Count--;
  };
  render() {
    return (
      <div>
        <div className="Apps">
          <FontAwesomeIcon icon={faUsers} /> Choose number of<b> people</b>
        </div>
        <div className="House">
          <div>
            <div className="Icons">
              <FontAwesomeIcon icon={faBed} color="#000080" /> &nbsp; ROOMS
              &nbsp;
              <span className="Plus">
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  color="#000080"
                  size="lg"
                  onClick={this.minusRooms}
                />{" "}
              </span>
              <span className="CountName"> {this.state.roomCount}</span>{" "}
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faPlusCircle}
                color="#ef3967"
                size="lg"
                onClick={this.addRooms}
              />
            </div>
          </div>
          <span />
          <span />
          <hr color="#a9a9a9" align="center" width="95%" />{" "}
          <div>
            <div className="Icons">
              <FontAwesomeIcon icon={faUserAlt} color="#000080" /> &nbsp; ADULTS{" "}
              <span className="PlusA">
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  color="#000080"
                  size="lg"
                  onClick={this.minusAdult}
                />{" "}
              </span>
              <span className="CountName"> {this.state.adultCount} </span>
              &nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faPlusCircle}
                color="#ef3967"
                size="lg"
                onClick={this.addAdult}
              />
            </div>
          </div>
          <hr color="#a9a9a9" align="center" width="95%" />
          <div>
            <div className="Icons">
              <FontAwesomeIcon icon={faChild} color="#000080" /> &nbsp; CHILDREN{" "}
              <span className="PlusC">
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  color="#000080"
                  size="lg"
                  onClick={this.minusChildren}
                />{" "}
              </span>
              <span className="CountName">{this.state.childrenCount}</span>
              &nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faPlusCircle}
                color="#ef3967"
                size="lg"
                onClick={this.addChildren}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
