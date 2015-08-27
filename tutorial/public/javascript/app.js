"use strict";

var CommentBox = React.createClass({
  displayName: "CommentBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, null),
      React.createElement(CommentForm, null)
    );
  }
});

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment__list" },
      React.createElement(
        Comment,
        { author: "Paul joe" },
        "This is one comment"
      ),
      React.createElement(
        Comment,
        { author: "Georges Black" },
        "This is *another* comment"
      )
    );
  }
});

var CommentForm = React.createClass({
  displayName: "CommentForm",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment__form" },
      "Hello, i am a comment form!"
    );
  }
});

var Comment = React.createClass({
  displayName: "Comment",

  render: function render() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return React.createElement(
      "div",
      { className: "comment__item" },
      React.createElement(
        "h2",
        { className: "comment__author" },
        this.props.author
      ),
      React.createElement("span", { dangerouslySetInnerHTML: { __html: rawMarkup } })
    );
  }
});

React.render(React.createElement(CommentBox, null), document.getElementById('content'));
//# sourceMappingURL=app.js.map
