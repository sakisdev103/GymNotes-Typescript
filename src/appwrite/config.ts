import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66589243002328d0f0db");

export const account = new Account(client);
export default client;
