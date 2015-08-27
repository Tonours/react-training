
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="comment__list">
        
        <Comment author="Paul joe">This is one comment</Comment>
        <Comment author="Georges Black">This is *another* comment</Comment>  

      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="comment__form">
        Hello, i am a comment form!
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment__item">
        <h2 className="comment__author">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);