const database: [User] = [
  {
    id: '1',
    name: 'Cindy Smith',
    email: 'c@c.c',
    password: 'c',
  },
];

export interface User {
  id: string;
  name: string;
  email?: string;
  password?: string;
}

export const userModel = {
  add: (id: string, name: string): User => {
    return database[database.push({ id, name }) - 1];
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
