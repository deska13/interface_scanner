import React from 'react'
import {useNavigate} from 'react-router-dom'
import moment from 'moment';
import { Row, Col, Button, Card } from 'antd'

const ClientItem = (props) => {
    const navigate = useNavigate()
    return (
        <Card>
            <Row>
                <Col span={20}>{props.client.id}. {props.client.surname} {props.client.name}  {props.client.patronymic}</Col>
                <Col span={4}>
                    <Button onClick={()=> navigate(`/clients/${props.client.id}`)}>Открыть</Button>
                </Col>
                <Col span={8}>День рождения: {moment(props.client.birthday).format("D.M.YYYY")}</Col>
                <Col span={8}>Клиент создан: {moment(props.client.time_create).format("D.M.YYYY H:mm")}</Col>
                <Col span={8}>Телефон: {props.client.telephone}</Col>
                
                {/* <div className="client__button">
                    <MyButton onClick={()=> props.remove(props.client)}>Удалить</MyButton>
                </div> */}
            </Row>
        </Card>
    )
}

export default ClientItem
