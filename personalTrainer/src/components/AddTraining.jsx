import { useState } from "react";
import { saveTraining } from "../trainingapi";
import { Modal, TextInput, Fieldset, Button, Tooltip, ActionIcon } from '@mantine/core';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSubmitTraining = () => {
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Modal opened={open} closeOnClickOutside={handleClose}>
                <Fieldset>
                    <TextInput
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleChange}
                    />
                    <Button color="red" onClick={handleSubmitTraining}>Submit</Button>
                </Fieldset>
            </Modal>
            <Tooltip label="Add Training Session">
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