import express from 'express';
import {getPosts,createPost,updatePost,deletePost,getPost,getPostsBySearch} from '../controllers/post.js'
import auth from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/',auth,createPost);
router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.get("/:id",getPost);
router.delete('/:id',auth,deletePost);
router.patch('/:id',auth,updatePost)

export default router;