import React, { Component } from "react";
import RichText from "./RichTextRenderer";

const data = '{"blocks":[{"key":"bq3hl","text":" Preamble Reliance Payment Solutions Limited (“RPSL”) is committed to protecting your privacy. This Privacy Policy describes how RPSL collects, use, share and safeguard your Personal Information received from you.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":1,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9e2l6","text":"CONSENT By using any of the RPSL services and/or using/downloading/accessing RPSL app, RPSL website, applications, platforms, RPSL’s service providers platform (“Platform”) you agree with the terms & conditions of this Privacy Policy and expressly give the RPSL consent to use, disclose & process your Personal Information. The RPSL reserves the right to amend this Privacy Policy from time to time and shall publish such amendments on the Platform. Please review the policy from time to time periodically to keep yourself updated and aware about any changes/amendments to the Privacy Policy. If you do not agree with this Privacy Policy, please do not access/use/download any of the RPSL services and/or using/downloading/accessing RPSL app, RPSL website, applications, platforms, RPSL’s service providers platform.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
class App extends Component {
  render() {
    return <RichText initialData={data} />;
  }
}

export default App;

// import React, { Component } from "react";
// import TextEditor from "./TextEditor";
// class App extends Component {
//   render() {
//     return <TextEditor  linkUpload={false} onSave={data => console.log("data is",data)}/>;
//   }
// }

// export default App