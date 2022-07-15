import { User, userModel } from '../models/user_model';

const isUserValid = (user: User, password: string) => user.password === password;

export const getUserByGitHubIdOrCreate = (id: string, name: string) => {
  try {
    return userModel.findById(id);
  } catch (err: any) {
    return userModel.add(id, name);
  }
};

export const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    const user = userModel.findByEmail(email);
    if (!isUserValid(user, password)) {
      throw new Error('Incorrect password for user: ' + email);
    }
    return user;
  } catch (err: any) {
    console.error(err.toString());
  }
};

export const getUserById = (id: string) => {
  try {
    return userModel.findById(id);
  } catch (err: any) {
    console.error(err.toString());
  }
};
