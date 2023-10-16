import GoogleProvider from  "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import {initializeApp,getApps,cert, getApp} from 'firebase-admin/app';
const { getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('../../../accountKey.json');

console.log(`console.log checking for an instance hope this works lol!!! ${getApps().length}`)
 const app = getApps().length ? getApp() :  initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://cleo-portfolio-default-rtdb.firebaseio.com"
});

 const db = getFirestore(app)

export const authOptions = {
    
    providers: [
         GoogleProvider({   
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
      ],                              
      secret : process.env.JWT_SECRET,
      callbacks : {
        async session({session,user}) {
          return {session,user}
        },
         async redirect({ url, baseUrl }) {
           return 'http://localhost:3000/home/all-tasks'
        } 
      },
      sessions : {
        strategy : 'database'
      },
  
      adapter: FirestoreAdapter(db), 
  }
  

  