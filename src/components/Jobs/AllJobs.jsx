import { AgGridReact } from 'ag-grid-react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import CsvModal from '../CsvModal/Csvmodal';

const AllJobs = () => {
  const [rowData, setRowData] = useState();

  const [showModal, setShowModal] = useState(false);
  const [csvData, setCsvData] = useState([]);

  const location = useLocation();

  // const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', headerName:'ID' },
    { field: 'pluginName' },
    { field: 'campaignId',headerName:'Campaign ID' },
    { field: 'affId', headerName:'Affiliate ID' },
    { field: 'product1_id', headerName:'Product ID' },
    { field: 'product1_qty', headerName:"Product Quantity" },
    { field: 'salesUrl', headerName:'Sales URL' },
    { field: 'total_csv_data',headerName:'Total Data' },
    { field: 'sync_csv_data',headerName:'Sync Data' },
    // { field: 'startMins' },
    // { field: 'endHour' },
    // { field: 'endMins' },
  ]);

  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true
    }
  ), []);

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event.data.csv_data);
    setShowModal(true);
    setCsvData(event.data);
  }, []);

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
      console.log(result.data);
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
      {
        showModal && <CsvModal hideModal={setShowModal} csvData={csvData}/>
      }
      
      <div className="ag-theme-alpine px-4" style={{ width: '100%', height: 600 }}>
        <AgGridReact
          // ref={gridRef}
          rowData={rowData} columnDefs={columnDefs}
          animateRows={true} rowSelection='single'
          onCellClicked={cellClickedListener}
          defaultColDef={defaultColDef}
          pagination={true} />
      </div>
    </>
  )
}

export default AllJobs;
