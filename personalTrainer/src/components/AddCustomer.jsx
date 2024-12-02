import { useState } from 'react';
import { saveCustomer } from '../customerapi';
import { Fieldset, TextInput, Button, Modal, Tooltip, ActionIcon } from '@mantine/core';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';




export default function AddCustomer(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    /*const handleClickOpen = () => {
        opened{};
    };

    const handleClose = () => {
        setOpen(false);
    };
    */

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSubmitCustomer = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                close()

            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Modal opened={opened} onClose={close}>
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
                    onClick={open}
                >
                    <IconSquareRoundedPlusFilled />
                </ActionIcon>
            </Tooltip>


        </>
    )
}