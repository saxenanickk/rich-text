import React, { Component } from "react";
import TextEditor from "./TextEditor";
class App extends Component {
  render() {
    return <TextEditor onSave={1} />;
  }
}

export default App;
