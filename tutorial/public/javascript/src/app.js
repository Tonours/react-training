
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="comment__item">
        Hello, i am a comment box!
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);