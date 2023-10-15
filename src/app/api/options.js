import GoogleProvider from  "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import {db} from '@/app/firebase/firestore/firestore.js'


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
  

  