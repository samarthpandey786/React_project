import {Client, Databases} from 'appwrite';

const client = new Client()
        .setEndpoint(import.meta.env.VITE_ENDPOINT) 
        .setProject(import.meta.env.VITE_PROJECT_ID); 

    // console.log('Endpoint:', import.meta.env.VITE_ENDPOINT);
    // console.log('Project ID:', import.meta.env.VITE_PROJECT_ID);
    // console.log('DB ID:', import.meta.env.VITE_DB_ID);
    // console.log('collection ID:', import.meta.env.VITE_COLLECTION_ID);
    const collections = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_ID,
        dbId: import.meta.env.VITE_DB_ID
    },
];
  



// console.log("Env vars loaded:", import.meta.env);



const databases = new Databases(client);

export { client, databases, collections };