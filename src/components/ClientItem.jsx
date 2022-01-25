import React from 'react'
import {useNavigate} from 'react-router-dom'
import moment from 'moment';
import { Row, Col, Button, Card } from 'antd'
import { deleteClient } from '../API/ClientBaseService';

const ClientItem = (props) => {
    const navigate = useNavigate()
    const [view, setView] = useState(true)


    const [fetchDeleteClient, isDeleteClientLoading, deleteClientError] = useFetching(async () => {
        const response = await deleteClient(props.client.id)
        setView(false)
    })

    return (
        <>
            {
            view 
            ?
            <Card>
                <Row>
                    <Col span={16}>{props.client.id}. {props.client.surname} {props.client.name}  {props.client.patronymic}</Col>
                    <Col span={4}>
                        <Button onClick={()=> navigate(`/clients/${props.client.id}`)}>Открыть</Button>
                    </Col>
                    <Col span={4}>
                        <Button onClick={}>Удалить</Button>
                    </Col>
                    <Col span={8}>День рождения: {moment(props.client.birthday).format("D.M.YYYY")}</Col>
                    <Col span={8}>Клиент создан: {moment(props.client.time_create).format("D.M.YYYY H:mm")}</Col>
                    <Col span={8}>Телефон: {props.client.telephone}</Col>
                </Row>
            </Card>
            :
            <Card>
                <Row>
                    <Col span={24}>
                        Пользователь удалён
                    </Col>
                </Row>
            </Card>}
        </>
    )
}

export default ClientItem
