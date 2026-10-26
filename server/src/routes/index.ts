import {Router} from 'express';
import {auth} from '../config/better_auth_config.js';
import { toNodeHandler } from 'better-auth/node';

const router = Router();

router.use('/auth', toNodeHandler(auth));

export default router;
