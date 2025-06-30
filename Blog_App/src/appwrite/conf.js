import config from "../config/config";
import {Client, ID , Databases, Storage, Query} from "appwrite";


export class DBService{
    client = new Client()
    databases;
    storage;// bucket

    constructor(){
        this.client 
            .setEndpoint(config.appwriteurl)
            .setProject(config.projectId);
        this.databases  = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status , userId}){
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }

            )
        }
        catch(error){
            console.log("Appewrite service :: updatePost :: error" , error)
        }
    }

    async deltePost(slug){
        try{
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){ // for getting single post:
        try{
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug

            )

        }
        catch(error){
            console.log("Appwrite service :: getPost :: error ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "Active")] ){// getting multiple post using queries for getting post whoe status is active:
        try{
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries,// also write queries here also in the form of arrya:
            )
        }
        catch(error){
            console.log("Appwrite service :: getPosts(for-multiple posts):: error",error);
        }
    }

    // file upload services

    async uploadFile(file){
        try{
            return  await this.storage.createFile(
                config.buckedId,
                ID.unique(),
                file,
            )
        }
        catch(error){
            console.log("Appwrite service :: upload file ::error",error);
            
        }
    }

    async deleteFile(fileId){
        try{
            return  await this.storage.deleteFile(
                config.buckedId,
                fileId,
            )
        }
        catch(error){
            console.log("Appwrite service :: deletefile ::error",error);
            return false
        }
    }

     previewfile(fileId){
        return this.storage.getFilePreview(
            config.buckedId,
            fileId
        )
     }
}

// defined the object as DB:
const DB = new DBService()
export default  DB