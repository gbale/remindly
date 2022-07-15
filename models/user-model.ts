export enum Role {
  User = 1,
  Admin,
}

export interface User {
  id: string;
  role: Role;
  name: string;
  email?: string;
  password?: string;
}

const database: [User] = [
  {
    id: '1',
    role: Role.Admin,
    name: 'Cindy Smith',
    email: 'c@c.c',
    password: 'c',
  },
];

export const userModel = {
  add: (user: User): User => {
    return database[database.push(user) - 1];
  },
  findByEmail: (email: string): User => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id: string): User => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};
