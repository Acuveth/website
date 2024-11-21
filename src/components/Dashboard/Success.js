import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // To parse query parameters and navigate
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { db } from "../../firebase"; // Firebase setup

const SuccessPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product"); // Get productId from URL
  const subscriptionId = searchParams.get("subscriptionId"); // Get subscriptionId from URL
  const navigate = useNavigate(); // React Router's navigate hook

  // Map productId to subscription levels
  const subscriptionLevels = {
    prod_RDzO4pZbNU2lzK: { level: 1, planName: "Basic Plan" }, // Basic Plan
    prod_RDzO0Z1eXjQzcD: { level: 2, planName: "Advanced Plan" }, // Advanced Plan
    prod_RDzOrgDbOvGOWy: { level: 3, planName: "Premium Plan" }, // Premium Plan
  };

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setIsUpdating(true);

          // Get subscription details based on productId
          const subscription = subscriptionLevels[productId] || {
            level: 0,
            planName: "No Plan",
          };

          const userRef = doc(db, "users", user.uid); // Firestore reference for the user

          // Update the user's subscription details in Firestore
          const updateData = {
            isSubscribed: subscription.level, // Numeric subscription level
            plan: subscription.planName, // Plan name
          };

          if (subscriptionId) {
            updateData.subscriptionId = subscriptionId; // Only update if subscriptionId is available
          }

          // Fetch the current user document
          const userDoc = await getDoc(userRef);

          // Merge new subscription details into the existing user document
          if (userDoc.exists()) {
            await updateDoc(userRef, updateData);
          } else {
            console.error("User document not found!");
          }
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
  }, [productId, subscriptionId, navigate]); // Dependencies

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
      {isUpdating ? (
        <h1 className="text-2xl font-semibold text-gray-700">
          Spreminjanje statusa vaše naročnine...
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">
          Hvala za nakup paketa! Preusmerjanje na vašo nadzorno ploščo...
        </h1>
      )}
    </div>
  );
};

export default SuccessPage;
