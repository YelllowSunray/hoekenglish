import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const uploadImage = async (
  file: File,
  path: string,
  userId: string
): Promise<string> => {
  const storageRef = ref(storage, `${path}/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteImage = async (url: string): Promise<void> => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

