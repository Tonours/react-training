

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments    = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="comment">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment){
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="comment__list">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var author = React.findDOMNode(this.refs.author).value.trim();
    var text   = React.findDOMNode(this.refs.text).value.trim();

    if(!author || !text){
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';

    return;

  },
  render: function() {
    return (
      <form className="comment__form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Say your name" ref="author" />
        <input type="text" placeholder="Say what you want" ref="text"/>
        <button type="submit">Send it !</button>  
      </form>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment__item">
        <h2 className="comment__author">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

React.render(
  <CommentBox url="comments.json" pollInterval={5000} />,
  document.getElementById('content')
);