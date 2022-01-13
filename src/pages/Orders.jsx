import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { getOrdersByIdTransport } from '../API/ClientBaseService'
import { useFetching } from '../hooks/useFetching'
import TransportItem from '../components/TransportItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Button, DatePicker, Input, Radio, Card, Row, Col, Spin } from "antd";
import moment from 'moment';


const ClientIdPages = () => {
    const params = useParams()
    const { id } = useParams()
    const [orders, setOrders] = useState({})
    const [fetchOrdersByIdTransport, isLoading, loadError] = useFetching(async () => {
        const response = await getOrdersByIdTransport(id)
        setClient(response.data.orders)
    }) 


    useEffect(() => {
        fetchOrdersByIdTransport(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли расчёт транспорта № {params.id}</h1>
            {isLoading
            ? <Spin size='large'></Spin>
            : <Spin size='large'></Spin>
        }
        </div>
    )
}

export default ClientIdPages
