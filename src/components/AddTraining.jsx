import { useState } from "react";
import { saveTraining } from "../trainingapi";
import { Modal, TextInput, Fieldset, Button, Tooltip, ActionIcon } from '@mantine/core';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useDisclosure } from '@mantine/hooks';

export default function AddTraining(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [training, setTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: ""
    });

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => {
        setTraining({ ...training, date: date });
    };

    const handleSubmitTraining = () => {
        const formattedTraining = {
            ...training,
            date: dayjs(training.date).toISOString(),
            duration: Number(training.duration),
            customer: `https://myserver.personaltrainer.api/api/customers/${training.customer}`
        };

        saveTraining(formattedTraining)
            .then(() => {
                props.handleFetch();
                close();
            })
            .catch(err => console.error("Error in saving:", err));
    };

    return (
        <>
            <Modal opened={opened} onClose={close} centered transitionProps={{ transition: 'fade-up' }}>
                <Fieldset>
                    <DateTimePicker
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={handleDateChange}
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
                    onClick={open}
                >
                    <IconSquareRoundedPlusFilled />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
