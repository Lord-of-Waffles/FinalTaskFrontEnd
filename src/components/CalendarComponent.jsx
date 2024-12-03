import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import '@mantine/core/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(
                    'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings'
                );
                const data = await response.json();

                // Transform the API response to calendar event format
                const transformedEvents = data.map((training) => {
                    const startDate = new Date(training.date);
                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + training.duration);

                    return {
                        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
                        start: startDate,
                        end: endDate,
                    };
                });

                setEvents(transformedEvents);
            } catch (error) {
                console.error('Error fetching training data:', error);
            }
        }

        fetchEvents();
    }, []);

    return (
        <div style={{ height: '100vh', padding: '20px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                defaultDate={new Date()} // Start on today's date
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['month', 'week', 'day', 'agenda']}
            />
        </div>
    );
}

export default App;
