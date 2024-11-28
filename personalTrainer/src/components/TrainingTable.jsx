import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect } from 'react'; // React hook for managing state
import { themeQuartz } from '@ag-grid-community/theming';
import dayjs from 'dayjs'; // Date formatting library
import { Button } from '@mantine/core';
import { deleteTraining, } from '../trainingapi'; // Fetch API for trainings
import AddTraining from './AddTraining';


function TrainingTable() {
    const [rowData, setRowData] = useState([]); // State variable to store the data from the API


    const [colDefs, setColDefs] = useState([
        {
            cellRenderer: params => {
                const trainingId = params.data?.id;
                if (!trainingId) {
                    return null; // If no ID, render nothing
                }
                return (
                    <Button
                        color="red"
                        size="small"
                        onClick={() => handleDelete(trainingId)}
                    >
                        Delete
                    </Button>
                );
            },
            width: 120,
            sortable: false,
        },
        { headerName: "Date", field: "date", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Duration (in minutes)", field: "duration", filter: true, sortable: true, floatingFilter: true, width: 250 },
        { headerName: "Activity", field: "activity", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Customer", field: "customer", filter: true, sortable: true, floatingFilter: true },
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
                const formattedData = data.map((training) => ({
                    id: training.id, // Include ID for delete functionality
                    date: dayjs(training.date).format("YYYY-MM-DD HH:mm"),
                    duration: training.duration,
                    activity: training.activity,
                    customer: `${training.customer.firstname} ${training.customer.lastname}`,
                }));
                setRowData(formattedData);
            })
            .catch((err) => console.error(err));
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to delete training: ${response.statusText}`);
                    }
                    handleFetch(); // Refresh data after deletion
                })
                .catch(err => console.error(err));
        }
    };



    return (
        <>
            <AddTraining handleFetch={handleFetch} />
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
