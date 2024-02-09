import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from "passport-oauth2";
import "dotenv/config";
import { database, userModel } from '../../models/userModel';
import { createOrFind } from '../../controllers/userController';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        try {
            if (!profile.id || typeof profile.id !== "string") {
                return done(new Error("Invalid GitHub profile data"))
            }
            
            const githubId = profile.id;

            if (profile.displayName === null) {
                profile.displayName = "";
            }

            if (profile._json.email === null || undefined) {
                profile.email = "";
            }

            let user = createOrFind(profile, githubId);

            done(null, user);
            
        } catch (error: any) {
            return done(error);
        }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
