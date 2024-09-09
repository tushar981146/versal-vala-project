import conf from "../config/conf";
import {Client, ID, Databases, Storage, Query} from 'appwrite'


export class ServiceOfData {

    client = new Client()
    databases
    bucket
    


    constructor() {
        this.client
        .setEndpoint(conf.endPoint)
        .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, image, status, userId}) {

        try {
            return  await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,

                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (err) {
            console.log('create post error', err);            
            
        }
    }


    async updatePost(slug, {title, content, featuredImage, status}) {

        try {
            
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (err) {
            console.log('this is update document error', err);
            
        }
    }

    async deletePost(slug) {

        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )

            return true
        } catch (err) {
            console.log('delete post document error', err);
            return false
            
        }
    }

    async getPost(slug) {

        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (err) {
            console.log('this is a get only one post error', err);
            
        }
    }

    async getPosts (queries = [Query.equal("status", "active")]) {

        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                console.log(queries),
                
                queries
            )
        } catch (err) {
            console.log("Appwrite serive :: getPosts :: error", err);
            return false
        }
    }

      // file upload service

      async uploadFile(file) {

        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (err) {
            console.log("Appwrite serive :: uploadFile :: error", err);
            return false
        }
      }

      async deleteFile(fileId) {

        try {
            return await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
        } catch (err) {
            console.log("Appwrite serive :: deleteFile :: error", err);
            return false
        }
      }

      getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
        
    }



}


const serviceOfData = new ServiceOfData()

export default serviceOfData