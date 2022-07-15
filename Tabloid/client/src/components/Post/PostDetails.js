import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  handlePostReaction,
  getPostReactions,
} from "../../modules/postManager";
import { getAllReactions } from "../../modules/reactionManager";
import { RemoveTimeFromDateTime } from "../../helpers/formatDate.js";
import { Button } from "reactstrap";

export default function PostDetails({ user }) {
  const [post, setPost] = useState();
  const [reactions, setReactions] = useState([]);
  const [postReactions, setPostReactions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id).then(setPost);
    getAllReactions().then((res) => {
      setReactions(res);
    });
    getPostReactions(id).then((res) => {
      setPostReactions(res);
    });
  }, []);

  const handleReactionClick = (evt) => {
    handlePostReaction(id, evt.target.id, user.id).then(() => {
      getPostReactions(id).then((res) => {
        setPostReactions(res);
      });
    });
  };

  const reactionCount = (reaction) => {
    return (
      <div className="reactionImages" key={reaction.id + "div"}>
        <img
          key={reaction.id}
          alt="post-reaction"
          src={reaction.imageLocation}
          onClick={handleReactionClick}
          id={reaction.id}
        />
        {postReactions.map((postReaction, index) =>
          parseInt(postReaction.split(" ")[0]) === reaction.id ? (
            <p key={postReaction.split(" ")[0] + index}>
              {postReaction.split(" ")[1]}
            </p>
          ) : (
            ""
          )
        )}
      </div>
    );
  };

  if (!post) {
    return null;
  }

  post.publishDateTime = RemoveTimeFromDateTime(post.publishDateTime);

  return (
    <div className="postDetailsContainer">
      <h2>{post.title}</h2>
      <h3>
        {post.estimatedReadTime > 0
          ? `~${post.estimatedReadTime} minute read`
          : `<1 minute read`}
      </h3>

      <div className="postImage">
        {post.imageUrl?.map(() => (
          <iframe
            className="video"
            src={post.imageUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            key={post.id}
          />
        ))}
      </div>

      <div className="postContentPublishDateAuthorName">
        <p> {post.content} </p>
        <p> {post.publishDateTime} </p>
        <p> {post.userProfile.fullName} </p>
        {reactions.map((reaction) => reactionCount(reaction))}

        <Button
          onClick={() =>
            navigate(`/posts/${post.id}/comments`, { state: { post: post } })
          }
        >
          View Comments
        </Button>
        <Button
          onClick={() =>
            navigate(`/posts/${post.id}/createcomment`, {
              state: { post: post },
            })
          }
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
}
