### Installation

install the package as per the description below
npm i --save git+https://<username>@bitbucket.org/QuantCommune/react-text-editor.git

### Usage Example

```
import React, { Component } from "react";
import TextEditor from "react-text-editor";
class App extends Component {
  render() {
    return <TextEditor  linkUpload={false} onSave={}/>;
  }
}

export default App;
```

## Props

| Prop                  | Type    | Default | Note                                                   |
| --------------------- | ------- | ------- | ------------------------------------------------------ |
| `width`               | Number  | 900px   | custom width provided to the text editor               |
| `isSpellCheck`        | Boolean | false   | allows spell check in the editor                       |
| `boldOption`          | Boolean | true    | either give this option to the user or not             |
| `italicOption`        | Boolean | true    | either give this option to the user or not             |
| `underlineOption`     | Boolean | true    | either give this option to the user or not             |
| `headerOption`        | Boolean | true    | either give this option to the user or not             |
| `codeOption`          | Boolean | true    | either give this option to the user or not             |
| `quoteOption`         | Boolean | true    | either give this option to the user or not             |
| `unorderedListOption` | Boolean | true    | either give this option to the user or not             |
| `orderedListOption`   | Boolean | true    | either give this option to the user or not             |
| `linkUpload`          | Boolean | true    | either give this option to the user or not             |
| `imageUpload`         | Boolean | true    | either give this option to the user or not             |
| `videoUpload`         | Boolean | true    | either give this option to the user or not             |
| `audioUpload`         | Boolean | true    | either give this option to the user or not             |
| `fileUpload`          | Boolean | true    | either give this option to the user or not             |
| `onSave`              | String  |         | return a war string can be used to store at the server |
