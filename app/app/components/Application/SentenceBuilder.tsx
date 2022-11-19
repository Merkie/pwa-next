"use client";
import DeleteIcon from "./DeleteIcon";

function SentenceBuilder() {
  return (
    <main className="p-2 flex items-center bg-gray-50 border border-gray-300 border-x-0 border-t-0 text-gray-900">
      <div className="flex-1"></div>
      <button className="text-red-200">
        <DeleteIcon />
      </button>
    </main>
  );
}

export default SentenceBuilder;
