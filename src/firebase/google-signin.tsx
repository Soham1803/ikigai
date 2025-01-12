import { getAuth, signInWithRedirect, signOut, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import {app} from "./firebase-sdk";
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
    const result = await getRedirectResult(auth);

    if(result){
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("USER", user);
      return {user, token};
    }
  }catch(error) {
    // Handle Errors here.
    const errorCode = (error as any).code;
    const errorMessage = (error as any).message;
    // The email of the user's account used.
    const email = (error as any).customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error as any);

    console.log("Error during sign in with Google: ", errorCode, errorMessage, email, credential);
    // ...
  }
}

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
  } catch(error) {
    console.error("Error signing out", error);
  }
}
