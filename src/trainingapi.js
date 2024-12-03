export function fetchTraining() {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);


            return response.json();
        })
}

export function deleteTraining(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText)

            return response.json();
        })
}

export function saveTraining(newTraining) {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTraining),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in saving: " + response.statusText);
            }
            return response.json();
        });
}