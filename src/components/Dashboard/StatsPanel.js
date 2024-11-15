import React from "react";

function StatsPanel({ selectedEvent, isSubscribed, posts }) {
  return (
    <div className="text-white p-4 rounded-lg">
      {selectedEvent ? (
        // Display selected event's details
        <div>
          {selectedEvent.type === "objave" ? (
            // Display objave-specific details
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <strong>Media:</strong>{" "}
                {selectedEvent.media ? (
                  <a
                    href={selectedEvent.media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-orange underline"
                  >
                    View Media
                  </a>
                ) : (
                  "No Media"
                )}
              </div>
              <div className="flex flex-col">
                <strong>Opis:</strong> {selectedEvent.description || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Lokacija:</strong> {selectedEvent.location || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Collab:</strong> {selectedEvent.collab ? "Yes" : "No"}
              </div>
              <div className="flex flex-col">
                <strong>Tags:</strong> {selectedEvent.tags?.join(", ") || "N/A"}
              </div>
            </div>
          ) : selectedEvent.type === "stories" ? (
            // Display stories-specific details
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <strong>Media:</strong>{" "}
                {selectedEvent.media ? (
                  <a
                    href={selectedEvent.media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-orange underline"
                  >
                    View Media
                  </a>
                ) : (
                  "No Media"
                )}
              </div>
              <div className="flex flex-col">
                <strong>Opis:</strong> {selectedEvent.description || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Tags:</strong> {selectedEvent.tags?.join(", ") || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Link do Kart:</strong>{" "}
                <a
                  href={selectedEvent.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-orange underline"
                >
                  {selectedEvent.ticketLink || "N/A"}
                </a>
              </div>
            </div>
          ) : selectedEvent.type === "promoters" ? (
            // Display promoters-specific details
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <strong>Media:</strong>{" "}
                {selectedEvent.media ? (
                  <a
                    href={selectedEvent.media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-orange underline"
                  >
                    View Media
                  </a>
                ) : (
                  "No Media"
                )}
              </div>
              <div className="flex flex-col">
                <strong>Navodila:</strong> {selectedEvent.instructions || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Tags:</strong> {selectedEvent.tags || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Link do Kart:</strong>{" "}
                <a
                  href={selectedEvent.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-orange underline"
                >
                  {selectedEvent.ticketLink || "N/A"}
                </a>
              </div>
            </div>
          ) : selectedEvent.type === "week_in_review" ? (
            // Display week_in_review-specific details
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <strong>Ime dogodka:</strong> {selectedEvent.eventName || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Lokacija:</strong> {selectedEvent.location || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Trajanje dogodka:</strong>{" "}
                {selectedEvent.eventDuration || "N/A"}
              </div>
            </div>
          ) : (
            // Display generic details for other types
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <strong>Naslov:</strong> {selectedEvent.title || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Opis:</strong> {selectedEvent.description || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Datum:</strong> {selectedEvent.date || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong>Lokacija:</strong> {selectedEvent.location || "N/A"}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Display global stats
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <strong>Tip Naročnine:</strong>{" "}
            <span className="italic">
              {isSubscribed ? "Subscribed" : "Not Subscribed"}
            </span>
          </div>
          <div className="flex flex-col">
            <strong>Število promocij:</strong>{" "}
            <span className="italic">{posts.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;
