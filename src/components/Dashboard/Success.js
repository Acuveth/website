import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // To parse query parameters and navigate
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { db } from "../../firebase";

const SuccessPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product"); // Get productId from URL
  const navigate = useNavigate(); // React Router's navigate hook

  // Map productId to subscription levels
  const subscriptionLevels = {
    prod_RDzO4pZbNU2lzK: 1, // Basic Plan
    prod_RDzO0Z1eXjQzcD: 2, // Advanced Plan
    prod_RDzOrgDbOvGOWy: 3, // Premium Plan
  };

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsUpdating(true);

          // Get the subscription level based on productId
          const isSubscribed = subscriptionLevels[productId] || 0; // Default to 0 if productId is invalid
          const userRef = doc(db, "users", user.uid); // Use UID of the authenticated user

          // Update the user's subscription status in Firestore
          await updateDoc(userRef, { isSubscribed });
        } catch (error) {
          console.error("Error updating subscription status:", error);
        } finally {
          setIsUpdating(false);

          // Redirect to the dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard"); // Redirect to dashboard
          }, 2000);
        }
      } else {
        console.error("No authenticated user found.");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard even if no user is found
        }, 2000);
      }
    });

    // Cleanup listener
    return () => unsubscribe();
  }, [productId, navigate]); // Include productId and navigate as dependencies

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100 text-center"
      style={{ textAlign: "center" }}
    >
      {isUpdating ? (
        <h1 className="text-2xl font-semibold text-gray-700">
          Spreminjanje statusa vaše naročnine...
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">
          Hvala za nakup paketa! Preusmerjanje na vašo nadzorno ploščo....
        </h1>
      )}
    </div>
  );
};

export default SuccessPage;
