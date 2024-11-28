import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect } from 'react'; // React hook for managing state
import { themeQuartz } from '@ag-grid-community/theming';
import { IconTrashX, IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs'; // Date formatting library
function TrainingTable() {
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        { headerName: "Date", field: "date", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Duration (in minutes)", field: "duration", filter: 'true', sortable: 'true', floatingFilter: 'true', width: 250 },
        { headerName: "Activity", field: "activity", filter: 'true', sortable: 'true', floatingFilter: 'true' },
        { headerName: "Customer", field: "customer", filter: 'true', sortable: 'true', floatingFilter: 'true' },

    ]);

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

    useEffect(() => {
        handleFetch(); // Fetch data on component mount
    }, []);

    const handleFetch = () => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings")
            .then((response) => {
                if (!response.ok) throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then((data) => {
                // Transform the data to match the column fields
                const formattedData = data.map((training) => ({
                    id: training.id,
                    date: dayjs(training.date).format("YYYY-MM-DD HH:mm"), // Format date
                    duration: training.duration,
                    activity: training.activity,
                    customer: `${training.customer.firstname} ${training.customer.lastname}`, // Combine customer names
                }));
                setRowData(formattedData); // Set formatted data to state
            })
            .catch((err) => console.error(err));
    };


    return (
        <>
            <div style={{ height: 600, width: 1000 }}> {/* Container for the Data Grid */}
                <AgGridReact
                    rowData={rowData} // Data to be displayed in the Data Grid
                    columnDefs={colDefs} // Column definitions for the Data Grid
                    pagination={true} // Enable pagination
                    paginationPageSize={15} // Number of rows per page
                    theme={myTheme} // Theme for the Data Grid
                    loadThemeGoogleFonts
                />
            </div>
        </>
    );
}

export default TrainingTable;
