import React from "react";

function StatsPanel({ selectedEvent, isSubscribed, posts }) {
  return (
    <div className=" text-white p-4 rounded-lg">
      {selectedEvent ? (
        // Display selected event's details
        <div>
          <p>
            <strong>Naslov:</strong> {selectedEvent.title || "N/A"}
          </p>
          <p>
            <strong>Opis:</strong> {selectedEvent.description || "N/A"}
          </p>
          <p>
            <strong>Datum:</strong> {selectedEvent.date || "N/A"}
          </p>
          <p>
            <strong>Lokacija:</strong> {selectedEvent.location || "N/A"}
          </p>
        </div>
      ) : (
        // Display global stats
        <div>
          <p>
            <strong>Tip Naročnine:</strong>{" "}
            {isSubscribed ? "Subscribed" : "Not Subscribed"}
          </p>
          <p>
            <strong>Število promocij:</strong> {posts.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
