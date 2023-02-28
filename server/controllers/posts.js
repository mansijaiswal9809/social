import mongoose from "mongoose";
import PostMessage from "../models/postmsg.js";
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 9;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    return res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
   return res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    // console.log(post)
   return res.status(200).json(post);
  } catch (error) {
   return res.status(404).json("cant fetch");
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPostMessage.save();
    return res.status(201).json({message:"post saved"});
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
 return res.json({message:"post updated"});
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findByIdAndRemove(id);
  return res.json({ message: "Post has been deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) res.json({ message: "unAuthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(String(req.userId));
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  return res.json(updatedPost);
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    return res.json({ data: posts });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { name,comment,userId } = req.body;
  // console.log(name,id,comment);
  const post = await PostMessage.findById(id);
  post.comments.push(`${userId}:${name}:${comment}`);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  return res.json(updatedPost);
};
export const deleteComment= async(req,res)=>{
  const {id} = req.params;
  const {userId}= req.body;
  const post = await PostMessage.findById(id)
  let comment= post.comments.find((comment)=>comment.split(":")[0]===userId)
  // console.log(comment)
  post.comments=post.comments.filter((c)=>c!==comment)
  const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true})
  // console.log(updatedPost)
 return res.json(updatedPost)
}
