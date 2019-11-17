import React from "react";
import { connect } from "react-redux";

const UserDetails = ({ match, history, posts, updatePostRequest }) => {
  console.log("SHOWING POSTS FOR USER ID: ", match.params.userId);
  console.log(posts);
  const userPosts = posts.filter(
    post => post.userId.toString() === match.params.userId
  );
  console.log("POSTS: ", userPosts);
  const updatePosts = e => {
    e.preventDefault();
    const newPost = {
      userId: match.params.userId,
      title: e.target.title.value,
      body: e.target.body.value,
      id: posts[0].id !== 1 ? posts[0].id + 1 : posts[posts.length - 1].id + 1 // since I append the newest post to the front, I do a check on the first new update.
    };
    updatePostRequest(newPost);
  };
  return (
    <div>
      <h2 align="center">Add New Post: </h2>

      <form align="center" onSubmit={updatePosts}>
        <label htmlFor="title">POST TITLE: </label>
        <br /> <input name="title" type="text" /> <br />
        <br />
        <label htmlFor="body">POST CONTENT: </label>
        <br /> <textarea name="body" />
        <br />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>

      <h1 align="center">Posts:</h1>
      {userPosts.map(post => {
        return (
          <div
            key={post.id}
            style={{
              width: "70%",
              margin: "auto",
              marginBottom: "3rem",
              padding: "5vw",
              border: "1px solid black"
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        );
      })}
      <p>
        <button
          onClick={() => history.push("/")}
          style={{ position: "fixed", top: "0" }}
        >
          Go Home
        </button>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return { posts: state.posts };
};
const mapDispatchToProps = dispatch => {
  return {
    updatePostRequest: post => {
      console.log("DISPATCHING: ", post);
      dispatch({ type: "UPDATE_POST_REQUEST", payload: post });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
