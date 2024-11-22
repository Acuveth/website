import React from "react";

function EventList({ groupedPosts = {}, onEventSelect }) {
  console.log("Grouped Posts in EventList:", groupedPosts);

  // Function to decode post types
  const decodePostType = (type) => {
    switch (type) {
      case "week_in_review":
        return "Week in Review";
      case "promoters":
        return "Promotorji Objava";
      case "stories":
        return "Story Objava";
      case "objave":
        return "Objava na Profilu";
      default:
        return "Unknown Type";
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-3xl p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">TVOJA NAROČILA</h2>
      {Object.keys(groupedPosts).length > 0 ? (
        Object.entries(groupedPosts).map(([date, posts]) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-bold mb-2">{date}</h3>
            <ul>
              {posts.map((post) => (
                <li
                  key={post.id}
                  onClick={() => onEventSelect(post)}
                  className="p-3 pl-6 bg-gray-700 hover:bg-gray-600 rounded-3xl mb-2 cursor-pointer"
                >
                  <span className="font-semibold">
                    {decodePostType(post.type)}
                  </span>
                  {post.type === "week_in_review" ? (
                    <div className="text-sm font-thin mt-1">
                      {post.location || "Unknown Location"} :{" "}
                      {post.eventName || "Unknown Event"} -{" "}
                      {post.eventDuration || "Unknown Duration"}
                    </div>
                  ) : (
                    <div className="text-sm font-thin">
                      {post.description
                        ? post.description.slice(0, 150) +
                          (post.description.length > 150 ? "..." : "")
                        : "No Description"}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Nisi kupil še nobene promocije.</p>
      )}
    </div>
  );
}

export default EventList;
