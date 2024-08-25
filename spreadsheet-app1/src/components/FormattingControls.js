import React, { useState } from 'react';
import useStore from '../store/store';

const FormattingControls = () => {
  const [alignment, setAlignment] = useState('left');
  const [fontSize, setFontSize] = useState('14px');
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const setCellFormatting = useStore((state) => state.setCellFormatting);
  
  const handleApplyFormatting = () => {
    setCellFormatting(selectedCell.row, selectedCell.col, alignment, fontSize);
  };

  return (
    <div className="p-4 border-t">
      <div>
        <label htmlFor="alignment">Text Alignment:</label>
        <select
          id="alignment"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label htmlFor="fontSize">Font Size:</label>
        <input
          id="fontSize"
          type="text"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="e.g., 14px"
        />
      </div>
      <button onClick={handleApplyFormatting}>Apply Formatting</button>
    </div>
  );
};

export default FormattingControls;
