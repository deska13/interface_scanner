import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ClientItem from './ClientItem';
import { Col, Row } from 'antd'


const ClientList = ({clients, title, remove}) => {
    
    if (!clients.length){
        return (
            <h1 style={{textAlign: 'center'}}>
                Клиенты не найдены
            </h1>
        )
    }

    return (
        <div>
            <Row style={{textAlign: 'center'}}>
                <Col span={24}>
                    <h1>
                        {title}
                    </h1>
                </Col>
            </Row>
            <TransitionGroup>
                <Row gutter={[16, 16]}>
                    {clients.map((client, index)=>
                    <Col span={24}>
                        <CSSTransition
                            key={client.id}
                            timeout={200}
                            classNames="client"
                        >
                            <ClientItem remove={remove} number={index + 1} client={client} />
                        </CSSTransition>
                    </Col>
                    )}
                </Row>
            </TransitionGroup>
        </div>
    )
}

export default ClientList
