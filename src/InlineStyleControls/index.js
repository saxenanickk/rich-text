import React from "react";
import "../TextEditor.css";
import "../RichEditorStyle.css";
import {
  BOLD,
  BOLD_ICON_NON_SELECTED,
  BOLD_ICON_SELECTED,
  ITALIC,
  ITALIC_ICON_NON_SELECTED,
  ITALIC_ICON_SELECTED,
  UNDERLINE,
  UNDERLINE_ICON_NON_SELECTED,
  UNDERLINE_ICON_SELECTED
} from "../TextEditorConstants";

var INLINE_STYLES = [
  {
    name: BOLD,
    unselectedStyle: BOLD_ICON_NON_SELECTED,
    selectedStyle: BOLD_ICON_SELECTED,
    checkOption: "boldOption",
    type: "inline"
  },
  {
    name: ITALIC,
    unselectedStyle: ITALIC_ICON_NON_SELECTED,
    selectedStyle: ITALIC_ICON_SELECTED,
    checkOption: "italicOption",
    type: "inline"
  },
  {
    name: UNDERLINE,
    unselectedStyle: UNDERLINE_ICON_NON_SELECTED,
    selectedStyle: UNDERLINE_ICON_SELECTED,
    checkOption: "underlineOption",
    type: "inline"
  }
];

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.item.name);
    };
  }

  render() {
    let className = this.props.item.unselectedStyle;
    if (this.props.active) {
      className += this.props.item.selectedStyle;
    }

    return <i onMouseDown={this.onToggle} className={className} />;
  }
}
export const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(
        type =>
          props[type.checkOption] && (
            <StyleButton
              key={type.name}
              active={currentStyle.has(type.name)}
              onToggle={props.onToggle}
              item={type}
            />
          )
      )}
    </div>
  );
};
