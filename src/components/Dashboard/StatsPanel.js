import React from "react";

function StatsPanel({ selectedEvent, isSubscribed, posts }) {
  return (
    <div className="text-white pr-4 ">
      {selectedEvent ? (
        // Display selected event's details
        <div className="bg-gray-800 p-6 rounded-3xl ">
          {selectedEvent.type === "objave" ? (
            // Display objave-specific details
            <div className="flex flex-col space-y-2 ">
              <div className="flex flex-col items-center">
                {selectedEvent.media ? (
                  <img
                    src={selectedEvent.media}
                    alt="Media"
                    className="w-1/2 xl:w-full rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Media</span>
                )}
              </div>
              <div className="flex">
                <strong className="mr-2">Opis:</strong>{" "}
                {selectedEvent.description || "N/A"}
              </div>
              <div className="flex">
                <strong className="mr-2">Lokacija:</strong>{" "}
                {selectedEvent.location || "N/A"}
              </div>
              <div className="flex">
                <strong className="mr-2">Collab:</strong>{" "}
                {selectedEvent.collab ? "Yes" : "No"}
              </div>
              <div className="flex">
                <strong className="mr-2">Tags:</strong>{" "}
                {selectedEvent.tags?.join(", ") || "N/A"}
              </div>
            </div>
          ) : selectedEvent.type === "stories" ? (
            // Display stories-specific details
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col items-center">
                {selectedEvent.media ? (
                  <img
                    src={selectedEvent.media}
                    alt="Media"
                    className="w-24 h-24 rounded-lg object-cover mt-2"
                  />
                ) : (
                  <span className="text-gray-400">No Media</span>
                )}
              </div>
              <div className="flex ">
                <strong className="mr-2">Opis:</strong>{" "}
                {selectedEvent.description || "N/A"}
              </div>
              <div className="flex ">
                <strong className="mr-2">Tags:</strong>{" "}
                {selectedEvent.tags?.join(", ") || "N/A"}
              </div>
              <div className="flex ">
                <strong className="mr-2">Link do Kart:</strong>{" "}
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
              <div className="flex items-center">
                {selectedEvent.media ? (
                  <img
                    src={selectedEvent.media}
                    alt="Media"
                    className="w-24 h-24 rounded-lg object-cover mt-2"
                  />
                ) : (
                  <span className="text-gray-400">No Media</span>
                )}
              </div>
              <div className="flex">
                <strong className="mr-2">Navodila:</strong>{" "}
                {selectedEvent.instructions || "N/A"}
              </div>
              <div className="flex">
                <strong className="mr-2">Tags:</strong>{" "}
                {selectedEvent.tags || "N/A"}
              </div>
              <div className="flex">
                <strong className="mr-2">Link do Kart:</strong>{" "}
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
              <div className="flex">
                <strong className="mr-2">Ime dogodka:</strong>{" "}
                {selectedEvent.eventName || "N/A"}
              </div>
              <div className="flex ">
                <strong className="mr-2">Lokacija:</strong>{" "}
                {selectedEvent.location || "N/A"}
              </div>
              <div className="flex ">
                <strong className="mr-2">Trajanje dogodka:</strong>{" "}
                {selectedEvent.eventDuration || "N/A"}
              </div>
            </div>
          ) : (
            // Display generic details for other types
            <div className=""></div>
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
