import { initializeApp,getApp } from "firebase/app";
import { getDatabase,set,ref,onValue,connectDatabaseEmulator} from "firebase/database";

import { firebaseConfig  } from "../config";
const app  = getApp.length? getApp() : initializeApp(firebaseConfig )
const db = getDatabase(app);

/* // Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase(); 
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

 export  function read() {
const starCountRef = ref(db, 'users/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
   
  }  */


 // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
 
  export function addUsers(userId,name,email) {
    console.log('writing to db')
        set(ref(db,`users/${userId}`),{
          username : name ,
          email :email
        })
  }
  function read() {
     
  }

