import React, { useState } from "react";
import NavbarLogedin from "../NavbarLogedin";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

function FormObjava() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [collab, setCollab] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const storage = getStorage();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["image/jpeg", "image/png", "video/mp4"].includes(selectedFile.type)
    ) {
      alert("Only JPG, PNG, and MP4 files are allowed.");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("You must be logged in to submit this form.");
        return;
      }

      if (!description || !location || !tags) {
        alert("Please fill in all required fields.");
        return;
      }

      let fileURL = null;
      if (file) {
        const fileRef = ref(
          storage,
          `uploads/${currentUser.uid}/${Date.now()}_${file.name}`
        );

        // Use uploadBytesResumable to track progress
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Upload failed:", error);
            alert("File upload failed.");
          },
          async () => {
            fileURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Add form data to Firestore collection "objave"
            await addDoc(collection(db, "objave"), {
              userId: currentUser.uid,
              description,
              location,
              tags: tags.split(",").map((tag) => tag.trim()),
              collab,
              media: fileURL,
              createdAt: new Date(),
            });
            alert("Form Submitted!");
            // Clear the form after submission
            setDescription("");
            setLocation("");
            setTags("");
            setCollab(false);
            setFile(null);
            setUploadProgress(0);
          }
        );
      } else {
        // If no file is uploaded, save the form data without media
        await addDoc(collection(db, "objave"), {
          userId: currentUser.uid,
          description,
          location,
          tags: tags.split(",").map((tag) => tag.trim()),
          collab,
          media: null, // No media uploaded
          createdAt: new Date(), // Add timestamp
        });

        alert("Form Submitted and data stored in Firebase!");
        setDescription("");
        setLocation("");
        setTags("");
        setCollab(false);
        setFile(null);
      }
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <NavbarLogedin />
      <div className="flex justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Naroči Objavo
          </h1>
          <div className="mb-2">
            <label className="block text-white font-semibold mb-2">
              Naloži sliko/Video
            </label>
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 my-4"
            />
            {uploadProgress > 0 && (
              <p>Upload Progress: {Math.round(uploadProgress)}%</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Opis</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Lokacija</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Taggs</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
              className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom-orange"
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={collab}
                onChange={(e) => setCollab(e.target.checked)}
                className="form-checkbox h-5 w-5 text-white"
              />
              <span className="ml-2 text-white">Naredimo collab post?</span>
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-custom-orange text-white py-2 px-4 rounded-lg hover:bg-custom-orange-dark-20 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default FormObjava;
