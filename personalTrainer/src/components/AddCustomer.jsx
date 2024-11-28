import { useState } from 'react';
import { saveCustomer } from '../customerapi';
import { Fieldset, TextInput, Button, Modal, Tooltip, ActionIcon } from '@mantine/core';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';



export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSubmitCustomer = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Modal opened={open} closeOnClickOutside={handleClose} centered transitionProps={{ transition: 'fade-up' }}
            >
                <Fieldset>
                    <TextInput
                        label="First Name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Last Name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Street Address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                    />
                    <Button color="red" onClick={handleSubmitCustomer}>
                        Submit
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
                    onClick={handleClickOpen}
                >
                    <IconSquareRoundedPlusFilled />
                </ActionIcon>
            </Tooltip>


        </>
    )
}