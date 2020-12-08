import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../UI/FormField";
import { validate, firebaseLooper } from "../../UI/misc";
import { firebaseDB, firebasePlayers, firebase } from "../../../firebase";
import FileUploader from "../../UI/FileUploader";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player name",
          name: "name_input",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player last name",
          name: "lastname_input",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player number",
          name: "number_input",
          type: "text",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        showLabel: true,
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  updateFields = (player, playerId, type, defaultImg) => {
    const newFormdata = { ...this.state.formdata };
    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType: type,
      formdata: newFormdata,
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({ formType: "Add Player" });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then((snapshot) => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then((url) => {
              this.updateFields(playerData, playerId, "Edit player", url);
            })
            .catch((e) => {
              this.updateFields(
                { ...playerData, image: "" },
                playerId,
                "Edit player",
                ""
              );
            });
        });
    }
  }

  successForm = (message) => {
    this.setState({ formSuccess: message });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid &= this.state.formdata[key].valid;
    }

    console.log(dataToSubmit);
    if (formIsValid) {
      if (this.state.formType === "Edit player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Update correctly");
          })
          .catch((e) => {
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch((e) => this.setState({ formError: true }));
      }
    } else {
      this.setState({ formError: true });
    }
  };

  updateForm = (element, content = "") => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata, formError: false });
  };

  resetImage = () => {};
  storeFileName = (filename) => {
    console.log(filename);
    this.updateForm({ id: "image" }, filename);
  };

  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;
    this.setState({
      defaultImg: "",
      formdata: newFormdata,
    });
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FileUploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formdata.image.value}
                resetImage={() => this.resetImage()}
                filename={(filename) => this.storeFileName(filename)}
              />
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={"lastname"}
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={"number"}
                formdata={this.state.formdata.number}
                change={(element) => this.updateForm(element)}
              />
              <FormField
                id={"position"}
                formdata={this.state.formdata.position}
                change={(element) => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_lable">Something went wrong</div>
              ) : null}

              <div className="admin_submit">
                <button>{this.state.formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
