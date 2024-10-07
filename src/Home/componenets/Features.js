import React from "react";
export const Features = () => {
  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Features Overview</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Intelligent Knowledge Extraction</h3>
          <p>Explains how MyBot turns unstructured documents into reliable information.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Advanced Entity Relationship Modeling</h3>
          <p>Highlights the ability to understand complex connections between entities.</p>
        </div>
      </div>
    </div>
  );
};
