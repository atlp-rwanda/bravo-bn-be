import express from 'express';
import {facebookLogin, googleLogin, signup } from '../../controllers/authentication';
import passport from '../../config/passport';
const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.get('/facebook', passport.authenticate('facebook'));
authRouter.get('/facebook/callback', passport.authenticate('facebook', { session: false }), facebookLogin);
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false }), googleLogin);

export default authRouter;
