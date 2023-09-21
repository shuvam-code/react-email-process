import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
const CsvModal = ({ hideModal, csvData }) => {

    const [rowData, setRowData] = useState();

    const syncValueGetter = (params) => {
        if(params.data.is_sync == 1){
            return 'Yes';
        }else{
            return 'No';
        }
    }

    const [columnDefs, setColumnDefs] = useState([
        { field: 'order', headerName: 'Order' },
        { field: 'orderStatus' , headerName:'Order Status'},
        { field: 'firstName', headerName: 'Firstname' },
        { field: 'lastName', headerName: 'Lastname' },
        { field: 'address1', headerName: 'Address' },
        { field: 'city', headerName: 'City' },
        { field: 'state', headerName: 'State' },
        { field: 'country', headerName: 'Country' },
        { field: 'postalCode', headerName: 'Postal Code' },
        { field: 'phoneNumber', headerName: 'Phone' },
        { field: 'emailAddress', headerName: 'Email' },
        { field: 'campaign', headerName: 'Campaign Name' },
        { field: 'campaignId', headerName: 'Campaign ID' },
        { field: 'product1_name', headerName: 'Product Name' },
        { field: 'product1_id', headerName: 'Product ID' },
        { field: 'is_sync', headerName:"Sync" ,valueGetter:syncValueGetter},
    ]);

    const defaultColDef = useMemo(() => (
        {
            sortable: true,
            filter: true
        }
    ), []);

    useEffect(() => {
        setRowData(csvData.csv_data)
    })

    const hideModelHandler = (event) => {
        hideModal(false)
    }

    console.log('csvmodal', csvData);

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-3 mx-3 w-full">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h4 className="text-3x2 font-semibold">
                                {csvData && csvData.pluginName}
                            </h4>
                            {/* <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={hideModelHandler}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button> */}
                        </div>
                        {/*body*/}
                        <div className="relative p-3 flex-auto">
                            <div className="ag-theme-alpine" style={{ width: '100%', height: 450 }}>
                                <AgGridReact
                                    rowData={rowData} columnDefs={columnDefs}
                                    animateRows={true} rowSelection='single'
                                    defaultColDef={defaultColDef}
                                    pagination={true}
                                />
                                {/* <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={hideModelHandler}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default CsvModal;
