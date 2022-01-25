import axios from "axios";
import { message } from 'antd';

const url_server = 'http://127.0.0.1:8000'


const url_car_server = 'http://127.0.0.1:8001'


export const sendAuth = async(form) => {
    const options = {
        "Content-Type": "application/json",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }
    const temp =JSON.stringify(
        `grant_type=&username=${form.username}&password=${form.password}&scope=&client_id=&client_secret=`
    )

    console.log(temp)

    const response = await axios.post(
        url_server  + "/token",
        temp,
        options
    ).catch(() => {
        message.error('Неверные данные')
    })

    return response
}


export const checkAuth = async(token) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server  + "/users/me/",
        options
    )
    return response
}


export const getAllClients = async () => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + '/clients',
        options
    )
    return response
}


export const deleteClient = async (id_client) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.delete(
        url_server + `/delete_clients/${id_client}`,
        options
    )
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
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.post(
        url_server + '/load_client_docs', 
        json, 
        options
    ).catch(() => {
        message.error('Неудалось загрузить данные')
    })
    return response
}

export const addNewDriver = async (driver) => {
    const data = {
        transport_id: driver.transport_id,
        driver_license_image: driver.driver_license_image,
    }
    const json = JSON.stringify(data)
    const options = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.post(
        url_server + '/load_driver_docs', 
        json, 
        options
    )
    return response
}


export const getClientById = async (id) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + `/clients/${id}`,
        options
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
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.post(
        url_server + `/clients/${id_client}/edit`,
        data,
        options
    )
    return response
}


export const getTransportById = async (id_transport) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + `/transports/${id_transport}`,
        options
    )
    return response
}

export const setTransportById = async (id_transport, transport, transport_passport, transport_registration) => {
    const data = JSON.stringify({
        transport: transport, 
        transport_passport: transport_passport,
        transport_registration: transport_registration
    })
    const options = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.post(
        url_server + `/transports/${id_transport}/edit`,
        data,
        options
    )
    return response
}


export const getOrdersByTransportId = async (id_transport) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + `/orders/${id_transport}`,
        options
    )
    return response
}


export const setDriverById = async (client, driver) => {
    const data = JSON.stringify({
        client: client,
        driver: driver
    })
    const options = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.post(
        url_server + `/drivers/${driver.id}/edit`,
        data,
        options
    )
    return response
}


export const getCalcTransportById = async (id_client, id_transport) => {
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + `/clients/${id_client}/transports/${id_transport}/calc`,
        options
    )
    return response
}

export const checkPassportDetails = async (series, number) => {
    const data = JSON.stringify({
        data: series + number
    })
    const options = {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
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
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const response = await axios.get(
        url_server + `/get_transport_price`,
        data,
        options
    )
    return response
}

export const getCarMarks = async () => {
    const response = await axios.get(
        url_car_server + `/car_marks`
    )
    return response
}

export const getCarModels = async (mark) => {
    const response = await axios.get(
        url_car_server + `/car_models/mark=${mark}`
    )
    return response
}


export const getCarConfigurationsByModel = async (mark, model) => {
    const response = await axios.get(
        url_car_server + `/car_configurations/mark=${mark}&&model=${model}`
    )
    return response
}


export const getCarTechList = async (mark, model, body_type) => {
    const response = await axios.get(
        url_car_server + `/car_tech_lists/mark=${mark}&&model=${model}&&body_type=${body_type}`
    )
    return response
}