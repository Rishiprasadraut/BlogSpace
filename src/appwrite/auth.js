import conf from "../conf/conf"

import { Client, Account, ID } from "appwrite"

export class AuthService {

    client = new Client();

    account;


    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                //Call another method

                return this.login({ email, password });


            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }

    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Login Error:", error);
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
            
        } catch (error) {
            // User is not logged in → return null instead of crashing
            return null;
        }
        console.log(await authServices.getCurrentUser());
    }

    async logout() {

        try {


            await this.account.deleteSessions('current');

        } catch (error) {

            throw error;

        }

    }


}

const authServices = new AuthService();


export default authServices


