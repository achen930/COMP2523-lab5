import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isPasswordValid(user, password)) {
      return user;
    } else {
      return "Incorrect Password";
    }
  }
  return `Couldn't find user with email: ${email}`
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const createOrFind = (profile: any, githubId: string) => {
  
  let user = userModel.findByGithubId(githubId);

  if (!user) {
    user = userModel.addNewUser(profile, githubId);
  }
  return(user);
}

function isPasswordValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  createOrFind
};
