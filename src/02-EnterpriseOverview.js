import { useState, useRef, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

function EnterpriseOverview() {
  const gridRef = useRef();

  const [rowData, setRowData] = useState();

  //   const [columnDefs, setColumnDefs] = useState([
  //     { field: 'athlete' },
  //     { field: 'age' },
  //     { field: 'country', rowGroup: true },
  //     { field: 'year', rowGroup: true },
  //     { field: 'date' },
  //     { field: 'sport' },
  //     { field: 'gold' },
  //     { field: 'silver' },
  //     { field: 'bronze' },
  //     { field: 'total' },
  //   ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
    }),
    []
  );

  //   Fetch rowData from API cal.......
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ height: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={defaultColDef}
        rowGroupPanelShow='always'
      />
    </div>
  );
}

export default EnterpriseOverview;
