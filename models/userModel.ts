declare global {
  namespace Express {
    interface User extends userModel {
      id: number,
      name: string,
      email: string,
      password?: string,
      githubId?: string
    }
  }
}

interface userModel {
  id: number,
  name: string,
  email: string,
  password?: string,
  githubId?: string
}

const database: userModel[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  }
];


const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findByGithubId: (githubId: string) => {
    const user = database.find((user) => user.githubId === githubId);
    return user ? user : null;
  },
  
  addNewUser: (profile: any, githubId: string) => {
    
      let user = {
        id: database.length + 1,
        name: profile.displayName,
        email: profile.email,
        githubId: githubId
      };
      database.push(user);
      return user;
  }
};

export { database, userModel };