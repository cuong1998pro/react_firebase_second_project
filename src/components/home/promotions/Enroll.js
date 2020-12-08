import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../UI/FormField";
import { validate } from "../../UI/misc";
import { firebasePromotions } from "../../../firebase";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: "",
      },
    },
  };

  resetFormSuccess = (type) => {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = "";
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: type ? "Congratulation" : "Already on the database",
    });

    this.successMessage();
  };

  successMessage = () => {
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  updateForm = (element) => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };
    newElement.value = element.event.target.value;
    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid &= this.state.formdata[key].valid;
    }

    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then((snapshoot) => {
          if (snapshoot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">Something is wrong. Try again</div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button>Enroll</button>
              <div className="enroll_discl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A,
                saepe voluptatum, in facilis fugiat dolorum nesciunt veniam at
                perferendis optio nobis repellat suscipit nulla. Illo unde eaque
                recusandae voluptate dolorum!
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
