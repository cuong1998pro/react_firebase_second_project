import React, { Component } from "react";
import Fileuploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebase } from "../../firebase";

class FileUploader extends Component {
  state = {
    name: "",
    isUploading: false,
    fileURL: "",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  }

  handlerUploadStart = () => {
    this.setState({ isUploading: true });
  };

  handlerUploadError = () => {
    this.setState({ isUploading: false });
  };

  handlerUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ fileURL: url });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      fileURL: "",
    });
    this.props.resetImage();
  };

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <Fileuploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handlerUploadStart}
              onUploadError={this.handlerUploadError}
              onUploadSuccess={this.handlerUploadSuccess}
            />
          </div>
        ) : null}
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress
              style={{ color: "98c6e9" }}
              thickness={7}
            ></CircularProgress>
          </div>
        ) : null}
        {this.state.fileURL ? (
          <div className="image_upload_container">
            <img
              style={{ width: "100%" }}
              src={this.state.fileURL}
              alt={this.state.name}
            />
            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUploader;
