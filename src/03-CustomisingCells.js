import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Component,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PushComponent = (p) => {
  //   return <>Hello World!</>;

  return (
    <>
      <button onClick={() => window.alert('Push')}>{p.buttonText}</button>
      &nbsp;
      {p.value}
    </>
  );
};

class PullComponent extends Component {
  render() {
    return (
      <>
        <button onClick={() => window.alert('Pull')}>Pull</button>
        &nbsp;
        {this.props.value}
      </>
    );
  }
}

const CustomisingCells = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState();

  const [columnDefs, setcolumnDefs] = useState([
    {
      field: 'athlete',
      cellRenderer: PushComponent,
      cellRendererParams: {
        buttonText: 'Push',
      },
    },
    {
      field: 'year',
      cellRenderer: (p) => (
        <>
          <b>Year is </b>
          {p.value}
        </>
      ),
    },
    { field: 'country', cellRenderer: null },
    { field: 'age', cellRenderer: PullComponent },
    {
      field: 'sport',
      cellRendererSelector: (p) => {
        if (p.value === 'Swimming') {
          return {
            component: PushComponent,
            params: {
              buttonText: 'Push',
            },
          };
        }
        if (p.value === 'Gymnastics') {
          return { component: PullComponent };
        }
      },
    },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      //   cellRenderer: SimpleComp,
    }),
    []
  );

  const cellClickedListener = (event) => {
    console.log('Cell clicked :', event);
  };

  // fetching row data from API call........
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, [rowData]);

  return (
    <div className='ag-theme-alpine' style={{ height: 500 }}>
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

export default CustomisingCells;
