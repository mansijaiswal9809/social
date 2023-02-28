import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import Pagination from "../Pagination";
import { getPostsBySearch } from "../../reducer/posts";
import { Box } from "@mui/system";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [tag, setTag] = useState("");
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      // console.log(searchQuery)
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.loh("seracg");
      searchPost();
    }
  };

  const handleAddChip = (e) => {
    if (e.keyCode === 13) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={(theme) => ({
            root: {
              [theme.breakpoints.down("sm")]: {
                display: "flex",
                flexDirection: "column-reverse",
              },
            },
          })}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              sx={{
                borderRadius: 1,
                marginBottom: "4px",
                display: "flex",
                padding: "16px",
                gap:"8px"
              }}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Box>
                <TextField
                  label="Search for Tags"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleAddChip}
                  fullWidth
                />
                {tags &&
                  tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      onDelete={() => handleDeleteChip(tag)}
                      color="secondary"
                    />
                  ))}
              </Box>
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper
                sx={{ borderRadius: 4, marginTop: "1rem", padding: "16px" }}
                elevation={6}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
