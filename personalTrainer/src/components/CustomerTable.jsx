import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect } from 'react'; // React hook for managing state
import { fetchCustomers, saveCustomer } from '../customerapi'; // Fetch API for customers
import { themeQuartz } from '@ag-grid-community/theming';
import { IconTrashX, IconEdit, IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import {
    ActionIcon,
    Fieldset,
    TextInput,
    Tooltip,
    Modal,
    Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function CustomerTable() {
    // Modal State for Adding/Editing Customers
    const [opened, { open, close }] = useDisclosure(false);

    // State for Customer Data and Editing Logic
    const [rowData, setRowData] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customer, SetCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    // State for Delete Confirmation Modal
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

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
        fetchCustomersData();
    }, []);

    // Fetch customers from API
    const fetchCustomersData = async () => {
        try {
            const response = await fetchCustomers();
            setRowData(response._embedded.customers);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        }
    };

    // Add a new customer
    const handleAddCustomer = async () => {
        saveCustomer(customer)
            .then(() => {
                fetchCustomersData();
                close();  // Corrected from opened(false) to close()
            })
            .catch((error) => console.error("Failed to save customer:", error));
    };

    const handleChange = (event) => {
        SetCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    // Delete a customer
    const handleDelete = async () => {
        if (!customerToDelete) {
            console.log("No customer selected for deletion");
            return;
        }

        try {
            const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${customerToDelete.id}`, {
                method: 'DELETE'
            });

            if (response.status === 204) {
                // If the response is 204, it means the deletion was successful
                setRowData((prevData) => prevData.filter((customer) => customer.id !== customerToDelete.id));
                console.log(`Customer with ID ${customerToDelete.id} deleted successfully`);
                setDeleteModalOpened(false); // Close the delete confirmation modal
                setCustomerToDelete(null); // Clear the delete state
            } else if (response.status === 404) {
                // If the response is 404, the customer was not found
                console.error(`Customer with ID ${customerToDelete.id} not found.`);
                alert(`Customer with ID ${customerToDelete.id} does not exist.`);
            } else {
                // Any other status code indicates an error
                throw new Error(`Failed to delete customer with ID: ${customerToDelete.id}`);
            }
        } catch (error) {
            console.error(error.message);
            alert("An error occurred while trying to delete the customer.");
        }
    };


    // Handle Delete Icon Click: Show confirmation dialog
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer); // Set the customer to be deleted
        setDeleteModalOpened(true); // Open the delete confirmation modal
    };

    // Edit a customer: Open modal and populate fields
    const handleEdit = (customer) => {
        setEditingCustomer(customer); // Populate fields with the selected customer's data
        open(); // Open the modal
    };

    // Update a customer's details
    const handleUpdateCustomer = async () => {
        if (!editingCustomer) return;

        try {
            const response = await fetch(`/customers/${editingCustomer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCustomer),
            });

            if (!response.ok) {
                throw new Error(`Failed to update customer with ID: ${editingCustomer.id}`);
            }

            // Update state with the modified customer data
            setRowData((prevData) =>
                prevData.map((customer) =>
                    customer.id === editingCustomer.id ? editingCustomer : customer
                )
            );

            console.log(`Customer with ID ${editingCustomer.id} updated successfully`);
            close(); // Close the modal
            setEditingCustomer(null); // Clear editing state
        } catch (error) {
            console.error(error.message);
        }
    };

    // Add or Update a customer depending on state
    const handleSubmitCustomer = () => {
        if (editingCustomer?.id) {
            handleUpdateCustomer();
        } else {
            // handleAddCustomer logic would go here for new customers
            handleAddCustomer();
        }
    };

    // Column definitions for the AgGrid
    const colDefs = [
        {
            headerName: "",
            field: "edit",
            cellRenderer: (params) => (
                <Tooltip label="Edit customer">
                    <IconEdit
                        style={{ cursor: 'pointer', color: '#00C853' }}
                        onClick={() => handleEdit(params.data)}
                    />
                </Tooltip>
            ),
            width: 60,
            filter: false,
            sortable: false,
        },
        {
            headerName: "",
            field: "delete",
            cellRenderer: (params) => (
                <Tooltip label="Delete customer">
                    <IconTrashX
                        style={{ cursor: 'pointer', color: '#FF1744' }}
                        onClick={() => handleDeleteClick(params.data.id)}
                    />
                </Tooltip>
            ),
            width: 60,
            filter: false,
            sortable: false,
        },
        { headerName: "First Name", field: "firstname", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Last Name", field: "lastname", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Street Address", field: "streetaddress", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Post Code", field: "postcode", filter: true, sortable: true, floatingFilter: true, width: 130 },
        { headerName: "City", field: "city", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Email", field: "email", filter: true, sortable: true, floatingFilter: true },
        { headerName: "Phone", field: "phone", filter: true, sortable: true, floatingFilter: true },
    ];

    return (
        <>
            {/* Modal for Adding/Editing Customer */}
            <Modal opened={opened} onClose={() => { close(); setEditingCustomer(null); }}>
                <Fieldset legend={editingCustomer ? "Edit Customer" : "Add Customer"}>
                    <TextInput
                        label="First Name"
                        placeholder="Enter first name"
                        value={editingCustomer?.firstname || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, firstname: e.target.value }))}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter last name"
                        value={editingCustomer?.lastname || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, lastname: e.target.value }))}
                    />
                    {/* Add other fields similarly */}
                    <TextInput
                        label="Street address"
                        placeholder="Enter street address"
                        value={editingCustomer?.streetaddress || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, streetaddress: e.target.value }))}
                    />
                    <TextInput
                        label="Postcode"
                        placeholder="Enter postcode"
                        value={editingCustomer?.postcode || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, postcode: e.target.value }))}
                    />
                    <TextInput
                        label="City"
                        placeholder="Enter city"
                        value={editingCustomer?.city || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, city: e.target.value }))}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email"
                        value={editingCustomer?.email || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <TextInput
                        label="Phone"
                        placeholder="Enter phone"
                        value={editingCustomer?.phone || ""}
                        onChange={(e) => setEditingCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                    />

                    <Button
                        color="red"
                        onClick={handleSubmitCustomer}
                    >
                        Submit
                    </Button>
                </Fieldset>
            </Modal>
            <Modal opened={deleteModalOpened} onClose={() => setDeleteModalOpened(false)}>
                <Fieldset legend="Delete Customer">
                    <p>Are you sure you want to delete this customer?</p>
                    <Button
                        color="red"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Fieldset>
            </Modal>


            {/* Add Customer Button */}
            <Tooltip label="Add a customer">
                <ActionIcon
                    variant="gradient"
                    gradient={{ from: '#FF3D00', to: 'orange', deg: 45 }}
                    aria-label="Add Customer"
                    size="lg"
                    onClick={open}
                >
                    <IconSquareRoundedPlusFilled />
                </ActionIcon>
            </Tooltip>

            {/* AgGrid Data Table */}
            <div style={{ height: 600, width: 1500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination
                    paginationPageSize={15}
                    theme={myTheme}
                    loadThemeGoogleFonts

                />
            </div>
        </>
    );
}

export default CustomerTable;
