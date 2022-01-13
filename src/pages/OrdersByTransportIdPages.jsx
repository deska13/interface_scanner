import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { getOrdersByTransportId } from '../API/ClientBaseService'
import { useFetching } from '../hooks/useFetching'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DriverItem from '../components/DriverItem'
import { Button, Row, Col, Card, Spin, Input, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import DriverForm from '../components/DriverForm'
import OrderItem from '../components/OrdersItem'


const OrdersByTransportIdPages = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id_transport } = useParams()
    const [transport, setTransport] = useState({})
    const [orders, setOrders] = useState([])
    const [fetchOrdersByTransportId, isLoading, loadError] = useFetching(async () => {
        const response = await getOrdersByTransportId(id_transport)
        
        console.log(response)
        
        setTransport(response.data.transport)
        setOrders(response.data.orders)
    }) 

    const dateFormat = 'DD.MM.YYYY'


    const ordersBlock = orders.sort().map((order, index) =>{
        return <Col span={24}>
            <Card>
                <TransitionGroup>
                    <CSSTransition
                        key={order.id}
                        timeout={200}
                        classNames="order"
                    >
                        <OrderItem number={index + 1} order={order} />
                    </CSSTransition>
                </TransitionGroup>
            </Card>
        </Col> 
    })


    useEffect(() => {
        fetchOrdersByTransportId(params.id_transport)
    }, [])

    return (
        <div className='App'>
            <h1>Транспорт: {transport.vehicle_mark} {transport.vehicle_model} Гос. номер: {transport.registration_plates}</h1>
            {isLoading
                ? <Spin size="large" />
                :
                <Row gutter={[16, 8]}>
                    {ordersBlock}
                </Row> 
            }
        </div>
    )
}

export default OrdersByTransportIdPages
