import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

const Settings = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          if (docSnap.data().subscriptionId) {
            setSubscription({
              subscriptionId: docSnap.data().subscriptionId,
              plan: docSnap.data().plan,
            });
          }
        } else {
          setUserData(null);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const saveUserData = async () => {
    try {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData || {}, { merge: true });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

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
      const response = await axios.post(
        "http://localhost:3001/cancel-subscription",
        { subscriptionId: subscription.subscriptionId }
      );

      if (response.data.success) {
        alert("Your subscription has been canceled successfully.");

        const docRef = doc(db, "users", user.uid);
        await setDoc(
          docRef,
          { subscriptionId: null, plan: null },
          { merge: true }
        );

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Left Section: Profile Picture */}
      <div className="w-full md:w-1/3 flex flex-col items-center p-4 relative">
        <div
          className="w-64 h-64 rounded-full bg-gray-500 mb-4 relative group"
          style={{
            backgroundImage: `url(${userData?.profilePicture || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for Upload */}
          {isEditing && (
            <div
              className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-white text-lg font-semibold">Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {uploading && <p className="text-gray-400 mt-2">Uploading...</p>}
      </div>

      {/* Right Section: User Information */}
      <div className="w-full md:w-2/3 p-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-auto">
              {!isEditing ? (
                <p className="text-3xl font-semibold">
                  {userData?.name || "Not set"}
                </p>
              ) : (
                <input
                  type="text"
                  value={userData?.name || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded-lg "
                />
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-auto">
              <label className="block text-gray-400 text-sm">Phone</label>
              {!isEditing ? (
                <p className="text-lg italic">{userData?.phone || "Not set"}</p>
              ) : (
                <input
                  type="text"
                  value={userData?.phone || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded-lg"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm">Email</label>
            <p className="text-lg italic">{user?.email}</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-lg mt-4 md:mt-4"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            onClick={saveUserData}
            className="mt-4 px-4 py-2 bg-custom-orange hover:bg-custom-orange-dark-10 rounded-lg"
          >
            Save Changes
          </button>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Subscription</h2>
          {subscription ? (
            <div className="mt-4">
              <p>Plan: {subscription.plan}</p>
              <button
                onClick={cancelSubscription}
                disabled={isCancelling}
                className={`mt-2 px-4 py-2 rounded ${
                  isCancelling
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isCancelling ? "Cancelling..." : "Cancel Subscription"}
              </button>
            </div>
          ) : (
            <p className="mt-4 text-gray-400">No active subscription</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
