import React, { Component } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
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
        width: "100%",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        flexWrap: 'wrap'
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
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    if (editorState) {
      return (
        <Editor
          ref={ref => (this.editorRef = ref)}
          blockStyleFn={this.getBlockStyle}
          customStyleMap={this.styleMap}
          editorState={editorState}
          readOnly={true}
        />
      );
    }
    return null;
  }
}

RichText.defaultProps = {
  initialData: null
};
