import { useState, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {
      make: 'Ford',
      model: 'Eco Sport',
      price: 800000,
    },
    {
      make: 'Toyota',
      model: 'Liva',
      price: 700000,
    },
    {
      make: 'Hyundai',
      model: 'Venue',
      price: 900000,
    },
  ]);

  const [columnDefs, setcolumnDefs] = useState([
    {
      field: 'make',
    },
    {
      field: 'model',
    },
    {
      field: 'price',
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickedListener = (event) => {
    console.log('Cell clicked :', event);
  };

  // fetching row data from API call........
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const pushMeClicked = (event) => {
    gridRef.current.api.deselectAll();
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 500 }}>
      <button onClick={pushMeClicked}>Push Me</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection='multiple'
        animateRows={true}
      />
    </div>
  );
};

export default App;
