import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      const updateSubscriptionStatus = async () => {
        try {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, { subscribed: 1 });
          alert("Subscription successful!");
        } catch (error) {
          console.error("Error updating subscription status:", error);
        }
      };

      updateSubscriptionStatus();
    }
  }, [userId]);

  return <div>Thank you for your subscription!</div>;
};

export default SuccessPage;
