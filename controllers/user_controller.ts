import { User, userModel } from '../models/user_model';

const isUserValid = (user: User, password: string) => user.password === password;

export const getUserByEmailIdAndPassword = (email: string, password: string) => {
  const user = userModel.findByEmail(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

export const getUserById = (id: number) => {
  const user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};
