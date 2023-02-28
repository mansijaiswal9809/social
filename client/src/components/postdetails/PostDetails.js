import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../reducer/posts";

const Post = () => {
  const { posts, post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  // console.log(posts)
  const isLoading = false;
  // console.log(post?.tags)

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags?.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => Navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  // let recommendedPosts
  // if(posts){
  const recommendedPosts = posts?.filter((item) => item._id !== post?._id);
  // }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <Box
        sx={(theme) => ({
          root: {
            display: "flex",
            width: "100%",
            [theme.breakpoints.down("md")]: {
              flexWrap: "wrap",
              flexDirection: "column",
            },
          },
        })}
      >
        <div style={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag, i) => (
              <div key={i} style={{ textDecoration: "none", color: "#3f51b5" }}>
                {` #${tag} `}
              </div>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Typography
              component="span"
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {`${post.name}`}
            </Typography>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <Box
          sx={(theme) => ({
            root: {
              marginLeft: "20px",
              [theme.breakpoints.down("md")]: {
                marginLeft: 0,
              },
            },
          })}
        >
          <img
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </Box>
      </Box>
      {recommendedPosts.length && (
        <div style={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box
            sx={(theme) => ({
              display: "flex",
              root: {
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              },
            })}
          >
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </Box>
        </div>
      )}
    </Paper>
  );
};

export default Post;
