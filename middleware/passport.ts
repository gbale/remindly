import { User } from '@prisma/client';
import passport from 'passport';
import passportGitHub from 'passport-github';
import passportLocal from 'passport-local';
import * as userController from '../controllers/user-controller';

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

// Local
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done) => {
      const user = await userController.getUserByEmailIdAndPassword(email, password);
      return user
        ? done(null, user)
        : done(null, false, {
          message: 'Your login details are not valid. Please try again',
        });
    }
  )
);

// GitHUb
const GitHubStrategy = passportGitHub.Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await userController.getUserByGitHubIdOrCreate(profile.id, profile.displayName);
      return user
        ? done(null, user)
        : done(null, false, {
          message: 'Your login details are not valid, please try again',
        });
    }
  )
);

export default passport;
