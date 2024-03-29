import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const userOrErrorMessage = getUserByEmailIdAndPassword(email, password);
    return (typeof userOrErrorMessage !== "string")
      ? done(null, userOrErrorMessage)
      : done(null, false, {
          message: userOrErrorMessage,
        });
  }
);

passport.serializeUser(function (user: Express.User, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;