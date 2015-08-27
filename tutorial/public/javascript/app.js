"use strict";

var CommentBox = React.createClass({
  displayName: "CommentBox",

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  loadCommentsFromServer: function loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, null)
    );
  }
});

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.author },
        comment.text
      );
    });
    return React.createElement(
      "div",
      { className: "comment__list" },
      commentNodes
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

React.render(React.createElement(CommentBox, { url: "comments.json", pollInterval: 5000 }), document.getElementById('content'));
//# sourceMappingURL=app.js.map
