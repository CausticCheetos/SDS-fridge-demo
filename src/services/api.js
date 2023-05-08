const baseUrl = 'http://127.0.0.1:8000'

const getMaxi = () => {
    return fetch(`${baseUrl}/maxigauge/latest/`)
        .then((response) => response.json())
}

const getRTP = () => {
    return fetch(`${baseUrl}/rtp/`)
        .then((response) => response.json())
}

const exported = {
    getMaxi,
    getRTP
}

export default exported