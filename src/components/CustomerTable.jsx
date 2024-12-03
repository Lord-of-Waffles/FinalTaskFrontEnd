import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect, useRef } from 'react'; // React hook for managing state
import { deleteCustomer, fetchCustomers } from '../customerapi'; // Fetch API for customers
import { themeQuartz } from '@ag-grid-community/theming';
import { Button, Group } from '@mantine/core';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';

function CustomerTable() {
    const [rowData, setRowData] = useState([]);
    const gridApi = useRef(null); // Reference to the AG Grid API

    const myTheme = themeQuartz.withParams({
        accentColor: "#DD2C00",
        foregroundColor: "#000000",
        backgroundColor: "#FFCCBC",
        browserColorScheme: "light",
        cellTextColor: "#000000",
        fontFamily: {
            googleFont: "Inter"
        },
        headerBackgroundColor: "#FF3D00",
        headerTextColor: "#FBE9E7",
        headerFontFamily: {
            googleFont: "Inter"
        },
        headerFontSize: "18px",
        headerFontWeight: 700
    });

    // Fetch customers from API on mount
    useEffect(() => {
        handleFetch();
    }, []);

    // Fetch customers from API
    const handleFetch = () => {
        fetchCustomers()
            .then(data => setRowData(data._embedded.customers))
            .catch(err => console.error(err));
    };

    // Handle delete operation
    const handleDelete = (url) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomer(url)
                .then(() => {
                    handleFetch();
                })
                .catch(err => console.error(err));
        }
    };

    // Column definitions for the AgGrid
    const colDefs = [
        {
            cellRenderer: params => <EditCustomer handleFetch={handleFetch} data={params.data} />,
            width: 80,
            sortable: false,
            exportable: false,
        },
        {
            cellRenderer: params => <Button color="red" size="small" onClick={() => handleDelete(params.data._links.self.href)}>Delete</Button>,
            width: 120,
            sortable: false,
            exportable: false,
        },
        { headerName: "First Name", field: "firstname", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Last Name", field: "lastname", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Street Address", field: "streetaddress", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Post Code", field: "postcode", filter: true, sortable: true, floatingFilter: true, width: 130 },
        { headerName: "City", field: "city", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Email", field: "email", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Phone", field: "phone", filter: true, sortable: true, floatingFilter: true },
    ];

    // Handle grid ready event to set API reference
    const onGridReady = (params) => {
        gridApi.current = params.api; // Set the API reference
    };

    // Function to export data to CSV
    const handleExportCsv = () => {
        if (gridApi.current) {
            gridApi.current.exportDataAsCsv();
        }
    };

    return (
        <>
            <Group>
                <AddCustomer handleFetch={handleFetch} />
                <Button color="#DD2C00" size="small" onClick={handleExportCsv}>
                    Export to CSV
                </Button>
            </Group>
            <div style={{ height: 600, width: 1550 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination
                    paginationPageSize={15}
                    paginationPageSizeSelector={false}
                    theme={myTheme}
                    loadThemeGoogleFonts
                    onGridReady={onGridReady} // Set API reference on grid ready
                />
            </div>
        </>
    );
}

export default CustomerTable;
