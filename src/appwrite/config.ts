import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66589243002328d0f0db");

export const account = new Account(client);
export { ID } from "appwrite";
