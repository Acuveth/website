import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext"; // Import the context
import { db } from "../firebase"; // Import Firestore instance
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
import axios from "axios";

const Settings = () => {
  const { user, logout } = useContext(UserContext); // Access the user and logout method from UserContext
  const [userData, setUserData] = useState(null); // Store user data
  const [isEditing, setIsEditing] = useState(false); // Track edit state
  const [uploading, setUploading] = useState(false); // Track upload state
  const [subscription, setSubscription] = useState(null); // Track subscription status
  const [isCancelling, setIsCancelling] = useState(false);
  const fileInputRef = React.createRef(); // Create a ref for the file input

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid); // Reference to the user's document
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());

            if (docSnap.data().subscriptionId) {
              setSubscription({
                subscriptionId: docSnap.data().subscriptionId,
                plan: docSnap.data().plan, // e.g., "Basic Plan"
              });
            }
          } else {
            setUserData(null); // No data found
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Save user data to Firestore
  const saveUserData = async () => {
    try {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData || {}, { merge: true }); // Save or merge data

        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage();
      const fileRef = ref(storage, `profilePictures/${user.uid}_${file.name}`);
      await uploadBytes(fileRef, file);

      const fileURL = await getDownloadURL(fileRef);
      setUserData((prevData) => ({ ...prevData, profilePicture: fileURL }));

      // Save profile picture URL to Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { profilePicture: fileURL }, { merge: true });

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Cancel Subscription
  const cancelSubscription = async () => {
    if (!subscription || !subscription.subscriptionId) {
      alert("No active subscription found.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your subscription? This action cannot be undone."
    );
    if (!confirmCancel) return;

    setIsCancelling(true);

    try {
      // Call the backend API to cancel the subscription
      const response = await axios.post(
        "http://localhost:3001/cancel-subscription",
        {
          subscriptionId: subscription.subscriptionId,
        }
      );

      if (response.data.success) {
        alert("Your subscription has been canceled successfully.");

        // Update Firestore to remove subscription details
        const docRef = doc(db, "users", user.uid);
        await setDoc(
          docRef,
          { subscriptionId: null, plan: null },
          { merge: true }
        );

        // Update local state
        setSubscription(null);
      } else {
        alert("Failed to cancel subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      alert("An error occurred while canceling your subscription.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-900 text-white ">
        {/* Settings Content */}
        <div className="flex-1 px-8 justify-center items-center">
          <div className="flex flex-row bg-gray-900 pt-6 pb-6 pr-6 rounded-lg justify-center items-center">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-64 h-64 rounded-full bg-gray-500 mr-6"
                style={{
                  backgroundImage: `url(${userData?.profilePicture || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {isEditing && (
                <div className="flex flex-col mt-5">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="border border-gray-500 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            {/* Account Information */}
            <div className="space-y-4 justify-between">
              <div className="flex flex-row ">
                <div>
                  {!isEditing ? (
                    <p className="text-2xl text-white font-bold ">
                      {userData?.name || "Not set"}
                    </p>
                  ) : (
                    <input
                      type="text"
                      value={userData?.name || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="w-full bg-gray-900 border border-gray-500 text-white p-2 rounded-lg"
                    />
                  )}
                </div>
                {/* Buttons Section */}
                <div className="flex flex-row justify-end items-center ml-10 mt-0.5 space-x-4">
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="py-1 px-8 bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 rounded transition duration-300"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Phone</h3>
                  {!isEditing ? (
                    <p className="text-lg text-white">
                      {userData?.phone || "Not set"}
                    </p>
                  ) : (
                    <input
                      type="text"
                      value={userData?.phone || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      className="w-full bg-gray-900 border border-gray-500 text-white p-2 rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center  pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Email</h3>
                  <p className="text-lg text-white">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-5">
            {isEditing && (
              <button
                onClick={saveUserData}
                className="py-1 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition duration-300 "
              >
                Save Changes
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full bg-gray-900 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>

            {subscription ? (
              <div>
                <p className="text-lg">Plan: {subscription.plan}</p>
                <p className="text-lg">
                  Subscription ID: {subscription.subscriptionId}
                </p>
                <button
                  onClick={cancelSubscription}
                  disabled={isCancelling}
                  className={`mt-4 px-4 py-2 rounded ${
                    isCancelling
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white`}
                >
                  {isCancelling ? "Cancelling..." : "Cancel Subscription"}
                </button>
              </div>
            ) : (
              <p className="text-gray-400">No active subscription</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
