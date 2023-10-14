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
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: "cleo", email: "cleo@example.com" }
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],                              
      secret : process.env.JWT_SECRET,
      callbacks : {
        async session({session,user}) {
         
          return {session,user}
        },
         async redirect({ url, baseUrl }) {
          // Allows relative callback URLs
           console.log(`baseurl is:${baseUrl} and url is:${url}`)
           return 'http://localhost:3000/home/all-tasks'
        } 
      },
      sessions : {
        strategy : 'database'
      },
      adapter: FirestoreAdapter(db),
  }
  

  