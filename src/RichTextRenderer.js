import React, { Component } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import _ from "lodash";
import "./TextEditor.css";
import "./RichEditorStyle.css";
import { BLOCKQUOTE } from "./TextEditorConstants";

export default class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    };
    this.fileOpener = [];
    this.initialWidth = 1920;
    this.hexColor = "#000";
    // Custom overrides for "code" style.
    this.styleMap = {
      CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        width: "60%",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    };
  }

  componentDidMount() {
    try {
      if (this.props.initialData) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(this.props.initialData))
          )
        });
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    } catch (error) {
      console.log("error is", error);
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }
  //function to get the style for blockquote
  getBlockStyle = block => {
    switch (block.getType()) {
      case BLOCKQUOTE:
        return "RichEditor-blockquote";
      default:
        return null;
    }
  };

  render() {
    const { props } = this;
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState ? editorState.getCurrentContent() : null;
    if (contentState && !contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    if (editorState) {
      return (
        <div
          className={"text-editor"}
          style={{
            width: (props.width * 100) / this.initialWidth + "%",
            height: props.height
          }}
        >
          <div className={"text-editor-parent"}>
            <div className={className + " text-editor-area"}>
              <Editor
                ref={ref => (this.editorRef = ref)}
                blockStyleFn={this.getBlockStyle}
                customStyleMap={this.styleMap}
                editorState={editorState}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

RichText.defaultProps = {
  initialData: null
};
