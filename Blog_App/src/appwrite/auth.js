import config from "../config/config";
import {Client, Account, ID} from "appwrite";

// create a class 

// This configuration tells your app where to send authentication requests and which Appwrite project to use.

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client 
            .setEndpoint(config.appwriteurl)
            .setProject(config.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){ // like a wrapper that uses for it purposes to use createaccount so we use directly createAccount method :
        try {
           const userAccount = await this.account.create(ID.unique(),email, password,name)
           if(userAccount){
            return this.login({email,password})// called the login method here: 
           }else{
            return userAccount;
           }
        } catch (error) {
           console.log("appwrite service :: createAccount :: error",error);
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } 
        catch (error) {
           console.log("appwrite service :: login :: error",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: get currentUser:: error ",error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite serviec :: logout :: error",error);
        }
    }
}


// create object of class AuthService
// for other to not creating obj so we establish a defalut object so
// access the functionalites or the auth service like eg:

// authserviec.logout()...so on;
const authservice = new AuthService() 

export default authservice


 