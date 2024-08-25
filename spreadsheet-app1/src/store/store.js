import create from 'zustand';

const useStore = create((set, get) => ({
  grid: Array.from({ length: 100 }, () =>
    Array.from({ length: 50 }, () => ({
      value: '',
      type: 'text',
      alignment: 'left',
      fontSize: '14px',
    }))
  ),
  searchQuery: '',
  currentPage: 0,
  rowsPerPage: 20,

  updateCell: (rowIndex, colIndex, value, type = 'text', alignment = 'left', fontSize = '14px') => {
    set((state) => {
      const updatedGrid = [...state.grid];
      const isNumeric = !isNaN(value);
      if (
        updatedGrid[rowIndex][colIndex].validation === 'numeric' &&
        !isNumeric
      ) {
        return;
      }
      updatedGrid[rowIndex][colIndex] = { value, type, alignment, fontSize };
      return { grid: updatedGrid };
    });
  },

  setCellValidation: (rowIndex, colIndex, validationType) =>
    set((state) => {
      const updatedGrid = [...state.grid];
      updatedGrid[rowIndex][colIndex].validation = validationType;
      return { grid: updatedGrid };
    }),

  setCellFormatting: (rowIndex, colIndex, alignment, fontSize) =>
    set((state) => {
      const updatedGrid = [...state.grid];
      const cell = updatedGrid[rowIndex][colIndex];
      updatedGrid[rowIndex][colIndex] = { ...cell, alignment, fontSize };
      return { grid: updatedGrid };
    }),

  setCellType: (rowIndex, colIndex, type) =>
    set((state) => {
      const updatedGrid = [...state.grid];
      updatedGrid[rowIndex][colIndex].type = type;
      return { grid: updatedGrid };
    }),

  applyFormat: (format) => {
    set((state) => {
      const updatedGrid = state.grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          alignment: format.alignment || cell.alignment,
          fontSize: format.fontSize || cell.fontSize,
        }))
      );
      return { grid: updatedGrid };
    });
  },

  setSearchQuery: (query) => set(() => ({ searchQuery: query })),

  filteredGrid: () => {
    const { grid, searchQuery } = get();
    if (!searchQuery) return grid;
    return grid.map((row) =>
      row.map((cell) =>
        cell.value.toLowerCase().includes(searchQuery.toLowerCase())
          ? cell
          : { ...cell, value: '' }
      )
    );
  },

  paginatedGrid: () => {
    const { filteredGrid, currentPage, rowsPerPage } = get();
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredGrid().slice(start, end);
  },

  setPage: (page) =>
    set((state) => ({
      currentPage: Math.max(0, Math.min(page, Math.floor(state.grid.length / state.rowsPerPage))),
    })),
}));

export default useStore;
