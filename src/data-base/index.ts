import { IUser } from '../types';

class DataBase {
  #users: IUser[];

  constructor() {
    this.#users = [];
  }

  getAllUsers(): IUser[] {
    return this.#users;
  }

  getUserById(id: string): IUser | undefined {
    return this.#users.find((user) => user.id === id);
  }

  addNewUser(newUser: IUser): void {
    this.#users.push(newUser);
  }

  updateUser(userData: IUser): void {
    const index = this.getUserIndex(userData.id);

    if (index !== -1) {
      this.#users[index] = { ...userData };
    } else {
      throw new Error();
    }
  }

  deleteUser(id: string): void {
    const index = this.getUserIndex(id);

    if (index !== -1) {
      this.#users.splice(index, 1);
    } else {
      throw new Error();
    }
  }

  getUserIndex(id: string): number {
    return this.#users.findIndex((user) => user.id === id);
  }
}

export const dataBase = new DataBase();
