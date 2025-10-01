import {Router} from 'express';
import wrapAsync from '../middlewares/wrapAsync.middleware.js';
import {signup,login,getUserInfo} from "../controllers/user.controller.js"
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router  = Router();

router.post('/signup',wrapAsync(signup));
router.post('/login',wrapAsync(login));
router.get('/getUser',authMiddleware,wrapAsync(getUserInfo));

export default router;