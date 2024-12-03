export function fetchCustomers() {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch: " + response.statusText);

            return response.json();
        })
}

export function deleteCustomer(url) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText)

            return response.json();
        })
}

export function saveCustomer(newCustomer) {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newCustomer),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in saving: " + response.statusText);
            }
            return response.json();
        });
}


export function updateCustomer(url, updatedCustomer) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in update: " + response.statusText);

            return response.json();
        })
}