import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row, Input, DatePicker, Spin, Card } from 'antd'
import moment from 'moment'
import { useFetching } from '../hooks/useFetching'


const OrderItem = (props) => {
    const [order, setOrder] = useState({})

    const [setOrderInfo, isLoad] = useFetching(async () => {
        console.log('const response = await setOrderInfo(props.order)')
    })

    useEffect(() => {
        setOrderInfo()
    }, [])

    // const driversBlock = order.drivers.sort(
    //     (a, b) => a.client_id > b.client_id ? 1 : -1
    // ).map((driver, index) =>{
    //     return <Col span={24}>
    //         <Card>
    //             <TransitionGroup>
    //                 <CSSTransition
    //                     key={driver.id}
    //                     timeout={200}
    //                     classNames="client"
    //                 >
    //                     <DriverItemInOrder number={index + 1} driver={driver} />
    //                 </CSSTransition>
    //             </TransitionGroup>
    //         </Card>
    //     </Col> 
    // })

    const dateFormat = 'DD.MM.YYYY'

    return (
        <div>
            {isLoad
                ? <Spin />
                :<Row>
                    <Col span={24}>
                        <h1>{props.number} предложение от {order.bank}</h1>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <p>Программа страхования { order.insurance_program }</p>
                            </Col>
                            <Col span={24}>
                                <p>Федеральная спец.программа {order.federal_special_program}</p>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <p>Дисконтая программа {order.discount_program}</p>
                            </Col>
                            <Col span={24}>
                                <p>Дополнительная программа {order.additional_program}</p>
                            </Col>
                            <Col span={24}>
                                <p>Ограничения пробега {order.mileage_limits}</p>
                            </Col>
                            <Col span={24}>
                                <p>СТОА по выбору страхователя {order.STOA_at_the_policyholder_choice}</p>
                            </Col>
                            <Col span={24}>
                                <p>Скидки за счёт КВ {order.discounts_due_to_KV}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Card style={{width: "100%"}}>
                            <p>Стоимость {order.price}</p>
                        </Card>
                    </Col>
                    <Col style={{marginTop: "10px"}} span={8} offset={16}>
                        <a href={order.url}><Button onClick={() => false}>Переход на сайт</Button></a>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default OrderItem