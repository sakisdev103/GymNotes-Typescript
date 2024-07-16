import { databases } from "./config";
import { ID } from "appwrite";
import { Models } from "appwrite";

const collections = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID,
    name: "workouts",
  },
];
const db: any = {};

collections.forEach((col) => {
  db[col.name] = {
    create: (payload: Omit<Document, keyof Models.Document>) =>
      databases.createDocument(col.dbId, col.id, ID.unique(), payload),
    update: (id: string, payload: Omit<Document, keyof Models.Document>) =>
      databases.updateDocument(col.dbId, col.id, id, payload),
    get: (id: string) => databases.getDocument(col.dbId, col.id, id),
    delete: (id: string) => databases.deleteDocument(col.dbId, col.id, id),
    list: () => databases.listDocuments(col.dbId, col.id),
  };
});

export default db;
