import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"; // Import the context
import NavbarLogedin from "./NavbarLogedin";
import { db } from "../firebase"; // Import Firestore instance
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions

const Settings = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const { user, logout } = useContext(UserContext); // Access the user and logout method from UserContext
  const [userData, setUserData] = useState(null); // Store user data
  const [isEditing, setIsEditing] = useState(false); // Track edit state
  const [uploading, setUploading] = useState(false); // Track upload state
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

  const handleLogout = () => {
    logout(); // Clear user session
    navigate("/");
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
      <NavbarLogedin />
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-900 p-4 border-r border-gray-700">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Settings</h2>
          <ul>
            <li className="text-white font-medium p-2 rounded-lg bg-yellow-900">
              Account
            </li>
          </ul>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div
                className="w-24 h-24 rounded-full bg-gray-500 mr-6"
                style={{
                  backgroundImage: `url(${userData?.profilePicture || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {isEditing && (
                <div className="flex flex-col">
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
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Name</h3>
                  {!isEditing ? (
                    <p className="text-lg text-white">
                      {userData?.name || "Not set"}
                    </p>
                  ) : (
                    <input
                      type="text"
                      value={userData?.name || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="w-full bg-gray-900 border-b border-gray-300 text-white p-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
                <div>
                  <h3 className="text-sm text-gray-400">Email</h3>
                  <p className="text-lg text-white">{user?.email}</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-4">
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
                      className="w-full bg-gray-900 border-b border-gray-300 text-white p-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-row justify-end items-center mt-6 mr-4 space-x-4">
            {isEditing && (
              <button
                onClick={saveUserData}
                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-300"
              >
                Save Changes
              </button>
            )}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="py-2 px-4 bg-gray-900 hover:bg-gray-700 text-custom-orange font-semibold py-2 rounded transition duration-300"
              >
                Edit
              </button>
            )}

            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-custom-orange hover:bg-custom-orange-dark-10 text-white font-semibold py-2 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
