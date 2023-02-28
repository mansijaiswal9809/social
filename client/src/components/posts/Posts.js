import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './post/Post';


const Posts = ({ setCurrentId }) => {
  const  posts  = useSelector((state) => state.posts.posts);
  // console.log(posts)
const isLoading=false
  // if (!posts.length && !isLoading) return 'No posts';
  return (
    isLoading ? <CircularProgress /> : (
      <Grid  container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
          // "kjjhd"
        ))}
      </Grid>
    )
  );
};

export default Posts;

// posts
