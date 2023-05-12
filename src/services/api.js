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

const deleteParameters = (id) => {
    fetch(`${baseUrl}/deleteParameters/${id}`,{method: "DELETE"})
}

const getParameters = () => {
    return fetch(`${baseUrl}/getParameters/`)
        .then((response) => response.json())
}

const postParameters = async(newParam) =>{
    await fetch(`${baseUrl}/parameters/`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParam)
        })
}


const exported = {
    getMaxi,
    getRTP,
    getValves,
    deleteParameters,
    getParameters,
    postParameters
}

export default exported