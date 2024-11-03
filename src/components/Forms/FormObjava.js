// FormObjava.js
import React, { useState } from "react";
import NavbarLogedin from "../NavbarLogedin";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function FormObjava() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [collab, setCollab] = useState(false);
  const [file, setFile] = useState(null);

  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileURL = null;
      if (file) {
        // Upload file to Firebase Storage
        const fileRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      // Add form data to Firestore collection "objave"
      await addDoc(collection(db, "objave"), {
        description,
        location,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to array
        collab,
        media: fileURL, // Store file URL from Firebase Storage
        createdAt: new Date(), // Add timestamp
      });

      alert("Form Submitted and data stored in Firebase!");
      // Clear the form after submission
      setDescription("");
      setLocation("");
      setTags("");
      setCollab(false);
      setFile(null);
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <NavbarLogedin />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">
            Form Objava
          </h1>

          {/* Upload Picture/Video */}
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Naloži sliko/Video
            </label>
            <input
              type="file"
              accept="image/*, video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                "
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Opis</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded text-black"
              rows="3"
            ></textarea>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Lokacija
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Taggs</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma separated)"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>

          {/* Collab Checkbox */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={collab}
                onChange={(e) => setCollab(e.target.checked)}
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="ml-2 text-gray-700">Naredimo collab post?</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default FormObjava;
