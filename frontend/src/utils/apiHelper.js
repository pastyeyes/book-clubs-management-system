export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'authorization': token
    };

    const fetchOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    const response = await fetch(url, fetchOptions);
    return response;
}
