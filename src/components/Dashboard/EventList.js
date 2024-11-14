// EventList.js
import React from "react";

function EventList({ posts, onEventSelect }) {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">TVOJI DOGODKI</h2>
      <ul>
        {posts.map((post, index) => (
          <li
            key={post.id}
            onClick={() => onEventSelect(post)}
            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2 cursor-pointer"
          >
            {index + 1}. {post.title || "Event Title"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
