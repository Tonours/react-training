'use strict';

var CommentBox = React.createClass({
  displayName: 'CommentBox',

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
  handleCommentSubmit: function handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      type: 'POST',
      data: comment,
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
      'div',
      { className: 'comment' },
      React.createElement(
        'h1',
        null,
        'Comments'
      ),
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});

var CommentList = React.createClass({
  displayName: 'CommentList',

  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.author },
        comment.text
      );
    });
    return React.createElement(
      'div',
      { className: 'comment__list' },
      commentNodes
    );
  }
});

var CommentForm = React.createClass({
  displayName: 'CommentForm',

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();

    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if (!author || !text) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';

    return;
  },
  render: function render() {
    return React.createElement(
      'form',
      { className: 'comment__form', onSubmit: this.handleSubmit },
      React.createElement('input', { type: 'text', placeholder: 'Say your name', ref: 'author' }),
      React.createElement('input', { type: 'text', placeholder: 'Say what you want', ref: 'text' }),
      React.createElement(
        'button',
        { type: 'submit' },
        'Send it !'
      )
    );
  }
});

var Comment = React.createClass({
  displayName: 'Comment',

  render: function render() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return React.createElement(
      'div',
      { className: 'comment__item' },
      React.createElement(
        'h2',
        { className: 'comment__author' },
        this.props.author
      ),
      React.createElement('span', { dangerouslySetInnerHTML: { __html: rawMarkup } })
    );
  }
});

React.render(React.createElement(CommentBox, { url: 'comments.json', pollInterval: 5000 }), document.getElementById('content'));
//# sourceMappingURL=app.js.map
