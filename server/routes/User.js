import express from 'express';
import {getUser,getSavedBooks, saveBook} from '../controllers/UserControllers.js'
import auth from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/getsavedposts',auth,getSavedBooks);
router.get('/:userId',getUser);
router.post('/savepost/:postId',auth,saveBook)

export default router;