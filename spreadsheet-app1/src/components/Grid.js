import React, { useRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import useStore from '../store/store';

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const cell = useStore((state) => state.grid[rowIndex][columnIndex]);
  const updateCell = useStore((state) => state.updateCell);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    let type = 'text';

    if (!isNaN(value)) {
      type = 'number';
    } else if (value.includes('\n')) {
      type = 'textarea';
    }

    updateCell(rowIndex, columnIndex, value, type, cell.alignment, cell.fontSize);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextColumnIndex = columnIndex + 1;
      const nextRowIndex = nextColumnIndex >= data.columnCount ? rowIndex + 1 : rowIndex;
      const newColumnIndex = nextColumnIndex >= data.columnCount ? 0 : nextColumnIndex;
      updateCell(rowIndex, columnIndex, inputRef.current.value, cell.type, cell.alignment, cell.fontSize);
      const nextCell = document.querySelector(
        `input[data-row="${nextRowIndex}"][data-col="${newColumnIndex}"], textarea[data-row="${nextRowIndex}"][data-col="${newColumnIndex}"]`
      );
      if (nextCell) {
        nextCell.focus();
      }
    }
  };

  return (
    <div style={style} className="relative border border-gray-300 rounded-sm shadow-sm bg-white">
      {cell.type === 'textarea' ? (
        <textarea
          ref={inputRef}
          data-row={rowIndex}
          data-col={columnIndex}
          value={cell.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ textAlign: cell.alignment, fontSize: cell.fontSize }}
          className="w-full h-20 p-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <input
          ref={inputRef}
          data-row={rowIndex}
          data-col={columnIndex}
          type={cell.type === 'number' ? 'number' : 'text'}
          value={cell.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ textAlign: cell.alignment, fontSize: cell.fontSize }}
          className={`w-full h-8 p-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 ${
            cell.type === 'number' ? 'text-right' : 'text-left'
          }`}
        />
      )}
    </div>
  );
};

const VirtualizedGrid = () => {
  const filteredGrid = useStore((state) => state.filteredGrid());
  const rows = filteredGrid.length;
  const columns = filteredGrid[0].length;

  return (
    <div className="overflow-auto rounded-lg border border-gray-300 shadow-lg">
      <Grid
        columnCount={columns}
        columnWidth={100}
        height={600}
        rowCount={rows}
        rowHeight={30}
        width={columns * 100}
        itemData={{ grid: filteredGrid, columnCount: columns }}
      >
        {Cell}
      </Grid>
    </div>
  );
};

const GridContainer = () => {
  const paginatedGrid = useStore((state) => state.paginatedGrid());
  const updateCell = useStore((state) => state.updateCell);
  const currentPage = useStore((state) => state.currentPage);
  const setPage = useStore((state) => state.setPage);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const applyFormat = useStore((state) => state.applyFormat);
  const setCellValidation = useStore((state) => state.setCellValidation);

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          className="border p-2 rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => applyFormat({ alignment: 'left' })}
        >
          Left Align
        </button>
        <button
          className="border p-2 rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => applyFormat({ alignment: 'center' })}
        >
          Center Align
        </button>
        <button
          className="border p-2 rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => applyFormat({ alignment: 'right' })}
        >
          Right Align
        </button>
        <button
          className="border p-2 rounded-md shadow-sm bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setCellValidation(0, 0, 'numeric')}
        >
          Set Numeric Validation (A1)
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="border p-2 rounded-md shadow-sm bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage + 1}</span>
        <button
          onClick={() => setPage(currentPage + 1)}
          className="border p-2 rounded-md shadow-sm bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Next
        </button>
      </div>

      <VirtualizedGrid />
    </div>
  );
};

export default GridContainer;
