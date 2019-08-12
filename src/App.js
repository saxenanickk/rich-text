import React, { Component } from "react";
import TextEditor from "./TextEditor";
import RichText from "./RichTextRenderer";

//const data =
//'{"blocks":[{"key":"pqa3","text":"1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"87ajs","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
//const data =
//'{"blocks":[{"key":"pqa3","text":"1","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"87ajs","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
const data =
  '{"blocks":[{"key":"pqa3","text":"1","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"87ajs","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
class App extends Component {
  render() {
    return <RichText initialData={data} />;
  }
}

export default App;
