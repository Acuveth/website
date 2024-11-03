import React from "react";

function StatsPanel({ selectedEvent, isSubscribed, posts }) {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      {selectedEvent ? (
        // Display selected event's details
        <div>
          <h3 className="text-xl font-semibold mb-2">Event Details</h3>
          <p>
            <strong>Title:</strong> {selectedEvent.title || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent.description || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {selectedEvent.date || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {selectedEvent.location || "N/A"}
          </p>
        </div>
      ) : (
        // Display global stats
        <div>
          <h3 className="text-xl font-semibold mb-2">Global Stats</h3>
          <p>
            <strong>Subscription Type:</strong>{" "}
            {isSubscribed ? "Subscribed" : "Not Subscribed"}
          </p>
          <p>
            <strong>Promotions Submitted:</strong> {posts.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
