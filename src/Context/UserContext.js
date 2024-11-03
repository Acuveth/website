// src/Context/UserContext.js
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Create the context
export const UserContext = createContext(null);

// Initialize Firestore
const db = getFirestore();

// UserProvider component that will wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load user and subscription status from Firebase on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch additional user data (e.g., subscription status) from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setIsSubscribed(userDoc.data().isSubscribed);
          } else {
            console.log("No such document for user data!");
          }
        } catch (error) {
          console.error("Failed to fetch user data from Firestore:", error);
        }
      } else {
        // No user is signed in
        setUser(null);
        setIsSubscribed(false);
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Save user to localStorage when the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsSubscribed(false); // Clear subscription status on logout
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isSubscribed, setUser, setIsSubscribed, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
