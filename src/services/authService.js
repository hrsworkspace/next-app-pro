import { auth, database } from "@/firebase/firebaseConfig";
import { NOTIFICATION, tostify } from "@/helper/helper";
import { validFirebaseErrorMessage } from "@/validate/validate";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

// firebase sigup service

export const firebaseSignupService = (signinFormInput) => {
  return new Promise((resolve, reject) => {
    try {
      createUserWithEmailAndPassword(
        auth,
        signinFormInput?.email,
        signinFormInput?.password
      )
        .then((data) => {
          const user = data.user;
          const userId = user.uid;
          const userData = {
            id: user.uid,
            firstName: signinFormInput?.firstName,
            lastName: signinFormInput?.lastName,
            phone: signinFormInput?.phone,
            profile: signinFormInput?.profile[0]?.thumbUrl || "",
          };
          localStorage.setItem("firebaseUserID", userId);
          setDoc(doc(database, "profile", userId), userData)
            .then(() => {
              // Document successfully written
              resolve(true);
            })
            .catch((error) => {
              // An error occurred
              validFirebaseErrorMessage(error);
              resolve(false);
            });

          if (data) {
            tostify(NOTIFICATION.SUCCESS, "Success!");
            resolve(true);
          } else {
            tostify(NOTIFICATION.ERROR, "Please try again!");
            resolve(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          resolve(false);
          reject(true);
          validFirebaseErrorMessage(error);
        });
      return true;
    } catch (error) {
      console.log("Auth Error : ", error);
      reject(error);
      return false;
    }
  });
};

// firebase login service

export const firebaseLoginService = (loginFormInput) => {
  return new Promise((resolve, reject) => {
    try {
      //check user exist in firebase auth
      signInWithEmailAndPassword(
        auth,
        loginFormInput?.email,
        loginFormInput?.password
      )
        .then(async (data) => {
          const token = (await data?.user?.getIdToken()) ?? "";
          if (data?.user) {
            const user = data.user;
            const userId = user.uid;
            localStorage.setItem("firebaseUserID", userId);
            const encryptedPassword = await CryptoJS.AES.encrypt(
              loginFormInput?.password,
              "secret-key"
            ).toString();
            const localFirebaseUserId = localStorage.getItem("firebaseUserID");
            const profileData = await getProfileData(localFirebaseUserId);
            const { id, ...obj } = profileData || {};
            const userDetail = JSON.stringify({
              email: loginFormInput?.email,
              password: encryptedPassword,
              access_token: token,
              name: obj?.firstName,
            });
            localStorage.setItem("current_user", userDetail);
            tostify(NOTIFICATION.SUCCESS, "Login Success!");
            resolve(true);
          } else {
            tostify(
              NOTIFICATION.ERROR,
              "Something went wrong. Please try again!"
            );
            resolve(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          validFirebaseErrorMessage(error);
          resolve(false);
        });
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};

// Firebase forget password

export const sendforgetPasswordLink = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    validFirebaseErrorMessage(error);
    return false;
  }
};

//get user profile data from firestore

export const getProfileData = async (localUserId) => {
  const usersRef = collection(database, "profile");
  const querySnapshot = await getDocs(usersRef);
  let profileData = null;
  querySnapshot.forEach((doc) => {
    if (doc.id === localUserId) {
      profileData = doc.data();
    }
  });
  return profileData;
};
