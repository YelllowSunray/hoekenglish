import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

export interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  createdAt: Date;
  isActive: boolean;
}

export interface ProfilePhoto {
  id: string;
  userId: string;
  url: string;
  uploadedAt: Date;
  isPrimary: boolean;
}

export const createService = async (service: Omit<Service, 'id' | 'createdAt' | 'isActive'>): Promise<string> => {
  const servicesRef = collection(db, 'services');
  const newServiceRef = doc(servicesRef);
  
  const serviceData: Service = {
    id: newServiceRef.id,
    ...service,
    createdAt: new Date(),
    isActive: true,
  };

  await setDoc(newServiceRef, {
    ...serviceData,
    createdAt: Timestamp.fromDate(serviceData.createdAt),
  });

  return newServiceRef.id;
};

export const getServicesByProvider = async (providerId: string): Promise<Service[]> => {
  const servicesRef = collection(db, 'services');
  const q = query(
    servicesRef,
    where('providerId', '==', providerId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Service;
  });
};

export const getAllActiveServices = async (): Promise<Service[]> => {
  const servicesRef = collection(db, 'services');
  const q = query(
    servicesRef,
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Service;
  });
};

export const addProfilePhoto = async (
  userId: string,
  url: string,
  isPrimary: boolean = false
): Promise<string> => {
  const photosRef = collection(db, 'profile-photos');
  const newPhotoRef = doc(photosRef);
  
  const photoData: ProfilePhoto = {
    id: newPhotoRef.id,
    userId,
    url,
    uploadedAt: new Date(),
    isPrimary,
  };

  await setDoc(newPhotoRef, {
    ...photoData,
    uploadedAt: Timestamp.fromDate(photoData.uploadedAt),
  });

  // If this is primary, unset other primary photos
  if (isPrimary) {
    const allPhotosRef = collection(db, 'profile-photos');
    const userPhotosQuery = query(allPhotosRef, where('userId', '==', userId));
    const snapshot = await getDocs(userPhotosQuery);
    
    const batch = snapshot.docs.map(async (docSnapshot) => {
      if (docSnapshot.id !== newPhotoRef.id) {
        await updateDoc(docSnapshot.ref, { isPrimary: false });
      }
    });
    await Promise.all(batch);
  }

  return newPhotoRef.id;
};

export const getProfilePhotos = async (userId: string): Promise<ProfilePhoto[]> => {
  const photosRef = collection(db, 'profile-photos');
  const q = query(
    photosRef,
    where('userId', '==', userId),
    orderBy('uploadedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      uploadedAt: data.uploadedAt.toDate(),
    } as ProfilePhoto;
  });
};

export const deleteProfilePhoto = async (photoId: string): Promise<void> => {
  const photoRef = doc(db, 'profile-photos', photoId);
  await deleteDoc(photoRef);
};

export const getAllProviders = async (): Promise<string[]> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('isProvider', '==', true));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.id);
};

