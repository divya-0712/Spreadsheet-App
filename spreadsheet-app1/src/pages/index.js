import React from 'react';
import VirtualizedGrid from '../components/Grid'; // Ensure this path is correct
import FormattingControls from '../components/FormattingControls'; // Import FormattingControls

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Spreadsheet App</h1>
      <FormattingControls /> {/* Add FormattingControls */}
      <VirtualizedGrid /> {/* Render the VirtualizedGrid */}
    </div>
  );
}
