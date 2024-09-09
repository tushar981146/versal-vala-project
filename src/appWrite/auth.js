import conf from '../config/conf'
import { Client, Account, ID } from "appwrite"


export class AuthService {

    client = new Client()

    account
    constructor() {
        this.client
        .setEndpoint(conf.endPoint)
        .setProject(conf.projectId)

        this.account = new Account(this.client)
    }

    async createAccount({name, email, password}) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount) {
                //return userAccount   call another method

                return this.login({email, password})

            }

            else {
                return userAccount
            }
        }
        catch(err) {
            throw err
        }
    }

    async login({email, password}) {
        try {
           return  await this.account.createEmailPasswordSession(email, password)

        }

        catch(err) {
            throw err
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user
            // Logged in
        } catch (err) {
            // Not logged in
            console.log("appwrite getCurrentUser  service error in auth.js", err);
            
        }

        return null
        
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        }
        catch(err) {
            console.log("appwrite logout error", err);
            
        }
    }
}

const authService = new AuthService();

export default authService