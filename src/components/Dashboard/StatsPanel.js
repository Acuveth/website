import React from "react";

function StatsPanel({ selectedEvent, isSubscribed, posts }) {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      {selectedEvent ? (
        // Display selected event's details
        <div>
          <h3 className="text-xl font-semibold mb-2">Event Statistika</h3>
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
          <h3 className="text-xl font-semibold mb-2">Statistika</h3>
          <p>
            <strong>Tip Naročnine:</strong>
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
