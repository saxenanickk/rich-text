import React, { Component } from "react";
import "./style.css";
export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={"link-modal"}>
        <div className={"link-area"}>
          <div className={"link-header"}>
            <div>Edit Link</div>
            <i
              className={"fas fa-times times-icon"}
              onClick={() => this.props.onClose()}
            />
          </div>
          <div className={"link-text"}>
            <div>Text to display:</div>
            <input type="text" className={"display-text"} />
          </div>
          <div className={"link-text"}>
            <div>Link to:</div>
            <input type="text" className={"display-text"} />
          </div>
          <div className={"link-action"}>
            <button className={"cancel-button"}>Cancel</button>
            <button className={"ok-button"}>Ok</button>
          </div>
        </div>
      </div>
    );
  }
}
