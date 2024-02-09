declare global {
  namespace Express {
    interface User {
      id: number,
      name: string,
      email: string,
      password?: string,
      githubId?: string,
      role: string
    }
  }
}

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    githubId: "2",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "admin"
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
        githubId: githubId,
        role: "user"
      };
      database.push(user);
      return user;
  }
};

export { database, userModel };