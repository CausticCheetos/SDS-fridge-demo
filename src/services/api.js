const baseUrl = 'http://127.0.0.1:8000'

const getMaxi = () => {
    return fetch(`${baseUrl}/maxigauge/latest/`)
        .then((response) => response.json())
}

const getRTP = () => {
    return fetch(`${baseUrl}/rtp/`)
        .then((response) => response.json())
}

const getValves = () => {
    return fetch(`${baseUrl}/valves/latest`)
    .then((response) => response.json())
} 

const getFlow = () => {
    return fetch(`${baseUrl}/flow`)
    .then((response) => response.json())
} 

const exported = {
    getMaxi,
    getRTP,
    getValves,
    getFlow
}

export default exported