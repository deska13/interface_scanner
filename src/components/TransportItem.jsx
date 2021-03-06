import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'


const TransportItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="transport">
            <div className="transport__content">
                <strong>{props.transport.id}. {props.transport.vehicle_mark} {props.transport.vehicle_model} {props.transport.registration_plates}</strong>
            </div>
            <div className="transport__button">
                <Button  onClick={()=> navigate(`/transports/${props.transport.id}`)}>Открыть</Button>
            </div>
            {/* <div className="transport__button">
                <MyButton onClick={()=> props.remove(props.transport)}>Удалить</MyButton>
            </div> */}
        </div>
    )
}

export default TransportItem
