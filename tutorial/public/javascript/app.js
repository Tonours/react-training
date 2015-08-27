"use strict";

var CommentBox = React.createClass({
  displayName: "CommentBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment__item" },
      "Hello, i am a comment box!"
    );
  }
});

React.render(React.createElement(CommentBox, null), document.getElementById('content'));
//# sourceMappingURL=app.js.map
