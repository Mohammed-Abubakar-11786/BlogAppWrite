import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DBservices {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async creatPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDataBaseID,
        conf.appwriteCollID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("AppWrite DbService :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(pslug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDataBaseID,
        conf.appwriteCollID,
        pslug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("AppWrite DbService :: updatePost :: error", error);
      throw error;
    }
  }

  deletePost(slug) {
    try {
      this.databases.deleteDocument(
        conf.appwriteDataBaseID,
        conf.appwriteCollID,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite DbService :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID,
        conf.appwriteCollID,
        queries
      );
    } catch (error) {
      console.log("AppWrite DbService :: getPosts :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDataBaseID,
        conf.appwriteCollID,
        slug
      );
    } catch (error) {
      console.log("AppWrite DbService :: getPost :: error", error);
      throw error;
    }
  }

  //File Uploade Services here bucket storage is used to store image files

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("AppWrite DbService :: uploadeFile :: error", error);
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      console.log("AppWrite DbService :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketID, fileID);
    } catch (error) {
      console.log("AppWrite DbService :: getFilePreview :: error", error);
      throw error;
    }
  }
}

const DbSer = new DBservices();

export default DbSer;
