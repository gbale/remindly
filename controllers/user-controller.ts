import { User } from '@prisma/client';
import { reminderModel } from '../models/reminder-model';
import { Role, userModel } from '../models/user-model';

export const getUserByGitHubIdOrCreate = async (id: string, name: string) => {
  try {
    return await userModel.findById(id);
  } catch (err: any) {
    console.log('Creating user: ' + id);
    reminderModel.init(id);
    const user: User = {
      id,
      role: Role.User,
      name,
      email: '',
      password: '',
      created: new Date(Date.now()),
      updated: new Date(Date.now()),
    };
    return await userModel.add(user);
  }
};

export const getUserByEmailIdAndPassword = async (email: string, password: string) => {
  try {
    const user = await userModel.findByEmail(email);
    if (user.password !== password) {
      throw new Error('Incorrect password for user: ' + email);
    }
    return user;
  } catch (err: any) {
    console.error(err);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await userModel.findById(id);
  } catch (err: any) {
    console.error(err);
  }
};
