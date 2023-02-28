import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { commentPost, deleteComment } from "../../reducer/posts";


const CommentSection = ({ post }) => {
  // console.log(post,"post")
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const dispatch = useDispatch();
  const commentsRef = useRef();
  // console.log(comments)
  const userId = user?.authData?.sub || user?.authData?._id;

  const handleComment = async () => {
    let newComments = await dispatch(
      commentPost({
        name: user?.authData?.name,
        comment: comment,
        id: post._id,
        userId,
      })
    );
    // console.log(newComments, "vdhckb")
    setComments(newComments.payload.comments);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setComments(post.comments);
  }, [post]);
  const handleDeleteComment = async () => {
    const newComments = await dispatch(
      deleteComment({ postId: post._id, userId })
    );
    setComments(newComments.payload.comments);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ height: "200px", overflowY: "auto", marginRight: "30px" }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments &&
            comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c && c.split(":")[1]}</strong>
                <span> {c && c.split(":")[2]}</span>
                {userId === c.split(":")[0] ? (
                  <Button onClick={handleDeleteComment}>
                    <DeleteIcon />
                  </Button>
                ) : null}
              </Typography>
            ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length || !user}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
