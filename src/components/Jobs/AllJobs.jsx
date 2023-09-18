import { AgGridReact } from 'ag-grid-react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AllJobs = () => {
  const [rowData, setRowData] = useState();

  const location = useLocation();

  // const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id' },
    { field: 'pluginName' },
    { field: 'campaignId' },
    { field: 'affId' },
    { field: 'product1_id' },
    { field: 'product1_qty' },
    { field: 'salesUrl' },
    { field: 'maxPerDay' },
    { field: 'startHour' },
    { field: 'startMins' },
    { field: 'endHour' },
    { field: 'endMins' },
  ]);

  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true
    }
  ), []);

  // const cellClickedListener = useCallback(event => {
  //   console.log('cellClicked', event);
  // }, []);

  useEffect(() => {
    // fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //   .then(result => result.json())
    //   .then(rowData => setRowData(rowData))

    const token = localStorage.getItem('token');

    const getCustomerData = async () => {
      const result = await axios.get(`${import.meta.env.VITE_API}/getcustomer`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log(result.data);
      if (result.data.success) {
        setRowData(result.data.Product)
      }
    };

    getCustomerData();

  }, [location]);

  // const buttonListener = useCallback(e => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  return (
    <>
      <div className="ag-theme-alpine" style={{ width: '100%', height: 600 }}>
        <AgGridReact
          // ref={gridRef}
          rowData={rowData} columnDefs={columnDefs}
          animateRows={true} rowSelection='multiple'
          // onCellClicked={cellClickedListener}
          defaultColDef={defaultColDef}
          pagination={true} />
      </div>
    </>
  )
}

export default AllJobs;
