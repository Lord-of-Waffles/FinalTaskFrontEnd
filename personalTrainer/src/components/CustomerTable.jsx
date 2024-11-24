import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect } from 'react'; // React hook for managing state
import { fetchCustomers } from '../customerapi';
import { themeQuartz } from '@ag-grid-community/theming';
import { IconTrashX, IconEdit } from '@tabler/icons-react';

function CustomerTable() {
    const [rowData, setRowData] = useState([]); // State variable to store the data from the API

    const handleDelete = (customerId) => {
        console.log(`Delete customer with ID: ${customerId}`);
        // Add logic to delete customer here (API call, etc.)
    };

    const handleEdit = (customerId) => {
        console.log(`Edit customer with ID: ${customerId}`);
        // Add logic to edit customer here (e.g., navigate to an edit form)
    };

    const [colDefs, setColDefs] = useState([
        {
            headerName: "",
            field: "edit",
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '2px' }}>
                    <IconEdit
                        style={{ cursor: 'pointer', color: '#00C853' }}
                        onClick={() => handleEdit(params.data.id)}
                    />
                </div>
            ),
            width: 60, // Adjust column width as needed
            filter: false, // Disable filtering for this column
            sortable: false, // Disable sorting for this column
        },
        {
            headerName: "",
            field: "delete",
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <IconTrashX
                        style={{ cursor: 'pointer', color: '#FF1744' }}
                        onClick={() => handleDelete(params.data.id)}
                    />
                </div>
            ),
            width: 60, // Adjust column width as needed
            filter: false, // Disable filtering for this column
            sortable: false, // Disable sorting for this column
        },
        { headerName: "First Name", field: "firstname", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Last Name", field: "lastname", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Street Address", field: "streetaddress", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Post Code", field: "postcode", filter: 'true', sortable: 'true', floatingFilter: 'true', width: 130 },
        { headerName: "City", field: "city", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Email", field: "email", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Phone", field: "phone", filter: 'true', sortable: 'true', floatingFilter: 'true' },

    ]);

    const myTheme = themeQuartz.withParams({
        accentColor: "#DD2C00",
        foregroundColor: "#FBE9E7",
        backgroundColor: "#FFCCBC",
        browserColorScheme: "light",
        cellTextColor: "#000000",
        fontFamily: {
            googleFont: "Inter"
        },
        headerBackgroundColor: "#FF3D00",
        headerFontFamily: {
            googleFont: "Inter"
        },
        headerFontSize: "18px",
        headerFontWeight: 700
    });

    useEffect(() => {
        handleFetch(); // Fetch data on component mount
    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setRowData(data._embedded.customers))
            .catch(err => console.error(err));
    };

    return (
        <>
            <div style={{ height: 600, width: 1500 }}> {/* Container for the Data Grid */}
                <AgGridReact
                    rowData={rowData} // Data to be displayed in the Data Grid
                    columnDefs={colDefs} // Column definitions for the Data Grid
                    pagination={true} // Enable pagination
                    paginationPageSize={20} // Number of rows per page
                    theme={myTheme} // Theme for the Data Grid
                    loadThemeGoogleFonts
                />
            </div>
        </>
    );
}

export default CustomerTable;
