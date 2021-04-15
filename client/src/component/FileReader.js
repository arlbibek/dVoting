import React, { Component } from "react";
import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export default class FileReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voterData: undefined,
    };
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    console.log(data);
    this.setState({ voterData: data });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log(data);
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <div>
            <button type="button" onClick={this.handleOpenDialog}>
              Upload CSV
            </button>
            {console.log("My voters: ", this.state.voterData)}
            <p>{file && file.name}</p>
            <button type="button" onClick={this.handleRemoveFile}>
              Remove
            </button>
          </div>
        )}
      </CSVReader>
    );
  }
}
