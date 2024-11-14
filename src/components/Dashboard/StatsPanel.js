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
            <div className="flex flex-row">
              <strong>Tip Naročnine:</strong>{" "}
              <div className="italic ml-2">
                {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </div>
            </div>
          </p>
          <p>
            <div className="flex flex-row">
              <strong>Število promocij:</strong>
              <div className="italic ml-2">{posts.length}</div>
            </div>
          </p>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
