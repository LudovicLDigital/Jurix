import storage from '@react-native-firebase/storage';

export const getStorageAssets = async (path: string): Promise<string> => {
  return await storage().ref(`${path}`).getDownloadURL();
};
