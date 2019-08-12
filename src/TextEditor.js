import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import _ from "lodash";
import "./TextEditor.css";
import "./RichEditorStyle.css";
import {
  IMAGE_UPLOAD,
  WEBLINK,
  ATTACHMENT,
  VIDEO_UPLOAD,
  AUDIO_UPLOAD,
  LINK,
  BLOCKQUOTE,
  FILE
} from "./TextEditorConstants";
import LinkInput from "./LinkInput";
import { BlockStyleControls } from "./BlockStyleControls";
import { InlineStyleControls } from "./InlineStyleControls";
import createStyles from "draft-js-custom-styles";

const customStyleMap = {
  MARK: {
    backgroundColor: "Yellow",
    fontStyle: "italic"
  }
};

const { styles, customStyleFn } = createStyles(
  ["color", "font-size"],
  "CUSTOM_",
  customStyleMap
);

const bottomIcons = [
  { name: WEBLINK, type: LINK, fileType: ".*", checkOption: "linkUpload" },
  {
    name: ATTACHMENT,
    type: FILE,
    fileType: ".pdf,.doc,.docx,",
    checkOption: "fileUpload"
  },
  {
    name: IMAGE_UPLOAD,
    type: FILE,
    fileType: ".png,.jpeg,.jpg",
    checkOption: "imageUpload"
  },
  {
    name: VIDEO_UPLOAD,
    type: FILE,
    fileType: ".*",
    checkOption: "videoUpload"
  },
  { name: AUDIO_UPLOAD, type: FILE, fileType: ".*", checkOption: "audioUpload" }
];
export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedInlineStyles: [],
      selectedBlockType: null,
      isInsertLink: false,
      openColorPicker: false,
      editorState: EditorState.createEmpty()
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
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.getBlockStyle = this.getBlockStyle.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.updateEditorState = (editorState, cb) =>
      this.setState({ editorState }, cb);
  }
  checkStyleAvailibility = inlineStyle => {
    return this.state.userSelectedInlineStyles.indexOf(inlineStyle) >= 0;
  };

  focusEditor = () => {
    if (this.refs.editor !== undefined) setTimeout(this.refs.editor.focus(), 5);
  };
  addOrRemoveInlineStyle = inlineStyle => {
    if (this.state.userSelectedInlineStyles.indexOf(inlineStyle) >= 0) {
      let tr = this.state.userSelectedInlineStyles.slice();
      _.remove(tr, item => item === inlineStyle);
      this.setState({
        userSelectedInlineStyles: tr
      });
    } else {
      this.setState({
        userSelectedInlineStyles: [
          ...this.state.userSelectedInlineStyles,
          inlineStyle
        ]
      });
    }
  };

  addBlockType = blockType => {
    if (this.state.selectedBlockType === blockType) {
      this.setState({ selectedBlockType: null });
    } else {
      this.setState({ selectedBlockType: blockType });
    }
  };

  checkBlockTypeAvailibility = blockType => {
    return this.state.selectedBlockType === blockType;
  };
  //function to get the style for blockquote
  getBlockStyle = block => {
    switch (block.getType()) {
      case BLOCKQUOTE:
        return "RichEditor-blockquote";
      default:
        return null;
    }
  };

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    console.log("tab it");
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    this.focusEditor();
  }

  _toggleBlockType(blockType) {
    console.log("toggling the block type", blockType);
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    this.focusEditor();
  }

  _toggleInlineStyle(inlineStyle) {
    console.log("inlinestyle", inlineStyle);
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
    this.focusEditor();
  }

  handleChangeComplete = color => {
    console.log("color is", color);
    this.hexColor = color.hex;
  };

  addColor = color => {
    const newEditorState = styles.color.add(this.state.editorState, color);
    return this.updateEditorState(newEditorState, this.focusEditor);
  };

  addFontSize = fontSize => {
    console.log("add the fontSize", fontSize);
    this.focusEditor();
    const newEditorState = styles.fontSize.add(
      this.state.editorState,
      fontSize
    );

    return this.updateEditorState(newEditorState);
  };
  render() {
    const { props } = this;
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div
        className={"text-editor"}
        style={{
          width: (props.width * 100) / this.initialWidth + "%"
        }}
      >
        <div className={"text-editor-style-row"}>
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            {...this.props}
          />
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
            {...this.props}
          />
          {this.state.isInsertLink && (
            <LinkInput onClose={() => this.setState({ isInsertLink: false })} />
          )}
        </div>
        <div className={"text-editor-parent"}>
          <div className={className + " text-editor-area"}>
            <Editor
              ref={ref => (this.editorRef = ref)}
              blockStyleFn={this.getBlockStyle}
              customStyleMap={this.styleMap}
              customStyleFn={customStyleFn}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              spellCheck={this.props.spellCheck}
            />
          </div>
        </div>
        <div className={"text-editor-bottom-row"}>
          {bottomIcons.map(
            (item, index) =>
              this.props[item.checkOption] && (
                <div key={index}>
                  <input
                    type="file"
                    hidden
                    accept={item.fileType}
                    ref={ref => (this.fileOpener[index] = ref)}
                    onChange={event =>
                      console.log("event is", event.target.files)
                    }
                  />
                  <i
                    className={item.name}
                    key={index}
                    onClick={() => {
                      if (item.type === FILE) this.fileOpener[index].click();
                      else if (item.type === LINK)
                        this.setState({ isInsertLink: true });
                    }}
                  />
                </div>
              )
          )}
          <button className={"texteditor-save-button"}>Save</button>
        </div>
      </div>
    );
  }
}

TextEditor.defaultProps = {
  width: 900,
  isSpellCheck: false,
  boldOption: true,
  italicOption: true,
  underlineOption: true,
  headerOption: true,
  codeOption: true,
  quoteOption: true,
  unorderedListOption: true,
  orderedListOption: true,
  linkUpload: false,
  imageUpload: false,
  videoUpload: false,
  audioUpload: false,
  fileUpload: false
};
