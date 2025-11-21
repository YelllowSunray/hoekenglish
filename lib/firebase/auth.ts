import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isProvider?: boolean;
  isClient?: boolean;
  whatsappPhone?: string;
  phoneNumber?: string;
  createdAt: Date;
  isVerified: boolean;
}

export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName,
    isProvider: false,
    isClient: false,
    createdAt: new Date(),
    isVerified: false,
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);

  return user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

