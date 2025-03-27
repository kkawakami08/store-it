"use server";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  //initializes instances and services like databases and accounts and makes sure they are connected to the same project

  //session client is linked to specific user
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  //get value of cookie named "appwrite-session"
  //cookie usually set by appwrite after a user successfully logs in
  const session = (await cookies()).get("appwrite-session");

  //user is not logged in
  if (!session || !session.value) throw new Error("No session");

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

//example for createSessionClinet
// async function fetchUserData() {
//   try {
//     const { account } = await createSessionClient();
//     const user = await account.get();
//     console.log(user);
//   } catch (error) {
//     console.error("User not logged in:", error);
//   }
// }

export const createAdminClient = async () => {
  //admin level permissions to manage entire project
  //shouldn't be exposed to users directly
  //dont want to make 1 connection for both session and admin for security reasons
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
