import axios from "axios";

const url_server = 'http://127.0.0.1:8000'
// const url_server = 'http://127.0.0.1:5000'
// const url_server = 'http://172.2.0.2:5000'

export const getAllClients = async () => {
    const response = await axios.get(url_server + '/clients')
    return response
}

export const sendDocumentNewClient = async (client) => {
    const data = {
        passport_image: client.passport_image,
        driver_license_image: client.driver_license_image,
        registration_transport_image: client.registration_transport_image,
        passport_transport_image: client.passport_transport_image,
        drivers_images: client.drivers_images
    }
    const json = JSON.stringify(data)
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.post(
        url_server + '/load_client_docs', 
        json, 
        options
    )
    return response
}

export const addNewDriver = async (driver) => {
    const data = {
        transport_id: driver.transport_id,
        driver_license_image: driver.driver_license_image,
    }
    const json = JSON.stringify(data)
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.post(
        url_server + '/load_driver_docs', 
        json, 
        options
    )
    return response
}


export const getClientById = async (id) => {
    const response = await axios.get(
        url_server + `/clients/${id}`
    )
    return response
}


export const setClientById = async (id_client, client, passport, driver_license, transports) => {
    const data = JSON.stringify({
        client: client,
        passport: passport,
        driver_license: driver_license,
        transports: transports
    })
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.post(
        url_server + `/clients/${id_client}/edit`,
        data,
        options
    )
    return response
}


export const getTransportById = async (id_transport) => {
    const response = await axios.get(
        url_server + `/transports/${id_transport}`)
    return response
}

export const setTransportById = async (id_transport, transport, transport_passport, transport_registration) => {
    const data = JSON.stringify({
        transport: transport, 
        transport_passport: transport_passport,
        transport_registration: transport_registration
    })
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.post(
        url_server + `/transports/${id_transport}/edit`,
        data,
        options
    )
    return response
}


export const getOrdersByTransportId = async (id_transport) => {
    const response = await axios.get(
        url_server + `/orders/${id_transport}`)
    return response
}


export const setDriverById = async (client, driver) => {
    const data = JSON.stringify({
        client: client,
        driver: driver
    })
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.post(
        url_server + `/drivers/${driver.id}/edit`,
        data,
        options
    )
    return response
}


export const getCalcTransportById = async (id_client, id_transport) => {
    const response = await axios.get(
        url_server + `/clients/${id_client}/transports/${id_transport}/calc`
    )
    return response
}

export const checkPassportDetails = async (series, number) => {
    const data = JSON.stringify({
        data: series + number
    })
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.get(
        url_server + `/check_passport_details`,
        data,
        options
    )
    return response
}

export const getTransportPrice = async (transport) => {
    const data = JSON.stringify({
        transport: transport
    })
    const options = {
        headers: {"content-type": "application/json"}
    }
    const response = await axios.get(
        url_server + `/get_transport_price`,
        data,
        options
    )
    return response
}