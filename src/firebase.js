import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCv8mHIU_kT1Me-ztXX2s0ggCXP49QRH4c",
  authDomain: "hmanne-1407.firebaseapp.com",
  projectId: "hmanne-1407",
  storageBucket: "hmanne-1407.appspot.com",
  messagingSenderId: "929528228109",
  appId: "1:929528228109:web:7c0557a097f5c6ca7c2844",
  measurementId: "G-6YSS52J6WY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Lắng nghe sự kiện logout từ các tab khác
window.addEventListener("storage", (event) => {
  if (event.key === "logout") {
    // Thực hiện logout ở tab này
    auth.signOut();
    window.location.reload(); // reload để UI cập nhật lại Redux
  }
});
