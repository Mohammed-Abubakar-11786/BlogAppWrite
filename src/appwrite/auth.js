import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjID);
    this.account = new Account(this.client);
  }

  async createAccount({ username, email, password }) {
    try {
      let accCreated = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (accCreated) {
        // call other methord to login
        this.login({ email, password });
      } else {
        return accCreated;
      }
    } catch (error) {
      console.log("AppWrite Service :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AppWrite Service :: loginUser :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite Service :: logoutUser :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
