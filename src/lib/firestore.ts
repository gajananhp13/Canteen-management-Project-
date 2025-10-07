
import { collection, doc, setDoc, getFirestore, deleteDoc, updateDoc, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import type { MenuItem, Discount, Order } from './types';

// Your web app's Firebase configuration - REPLACE WITH YOURS
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


// Firestore data management functions

// Menu Items
export async function saveMenuItem(menuItem: Omit<MenuItem, 'id'>, id?: string) {
  const docRef = id ? doc(db, 'menuItems', id) : doc(collection(db, 'menuItems'));
  await setDoc(docRef, menuItem);
}

export async function deleteMenuItem(id: string) {
  await deleteDoc(doc(db, 'menuItems', id));
}

// Image Upload
export async function uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `menu_images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

// Discounts
export async function saveDiscount(discount: Omit<Discount, 'id'>, id?: string) {
  const docRef = id ? doc(db, 'discounts', id) : doc(collection(db, 'discounts'));
  await setDoc(docRef, { ...discount, code: discount.code.toUpperCase() });
}

export async function deleteDiscount(id: string) {
  await deleteDoc(doc(db, 'discounts', id));
}

export async function updateDiscountStatus(id: string, isActive: boolean) {
    const docRef = doc(db, 'discounts', id);
    await updateDoc(docRef, { isActive });
}

// Orders
export async function saveOrder(order: Order, id: string) {
    const docRef = doc(db, 'orders', id);
    await setDoc(docRef, order);
}

export async function updateOrderStatus(id: string, status: Order['status']) {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, { status });
}
