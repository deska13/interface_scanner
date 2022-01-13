import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { getClientById, setClientById } from '../API/ClientBaseService'
import { useFetching } from '../hooks/useFetching'
import TransportItem from '../components/TransportItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { InputNumber, Button, DatePicker, Input, Radio, Card, Row, Col, Spin } from "antd";
import moment from 'moment';



const ClientIdPages = () => {
    const params = useParams()
    const { id } = useParams()
    const [client, setClient] = useState({})
    const [passport, setPassport] = useState({})
    const [driver_license, setDriverLicense] = useState({})
    const [transports, setTransports] = useState([])
    const [fetchClientById, isLoading, loadError] = useFetching(async () => {
        const response = await getClientById(id)
        setClient(response.data.client)
        setPassport(response.data.passport)
        setDriverLicense(response.data.driver_license)
        setTransports(response.data.transports)
    }) 

    const [setUserInfo, isSet, setError] = useFetching(async () => {
        const response = await setClientById(id, 
                                                            client, 
                                                            passport, 
                                                            driver_license, 
                                                            transports)
    }) 

    const dateFormat = 'DD.MM.YYYY';

    const [addTransport, isAddTransport, addTransportError] = useFetching(async () => {
        console.log('Error')
        // const response = await PostService.addTransportClient(id, passport, driverLicense, transports)
    }) 

    const transportBlock = transports.map((transport) =>{
        return <Card>
            <TransitionGroup>
                {transports.map((transport, index)=>
                    <CSSTransition
                        key={transport.id}
                        timeout={200}
                        classNames="client"
                    >
                        <TransportItem number={index + 1} transport={transport} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Card>
    })

    useEffect(() => {
        fetchClientById(params.id)
    }, [])

    return (
        <div className='App'>
            <h1>Вы открыли страницу клиента № {params.id}</h1>
            {isLoading
                ? <Spin size="large" />
                :
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h3>
                                        Клиент: {client.surname} {client.name} {client.patronymic}
                                    </h3>
                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="Фамилия"
                                        onChange={e => setClient({...client, surname: e.target.value})}
                                        defaultValue={client.surname}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="Имя"
                                        onChange={e => setClient({...client, name: e.target.value})}
                                        defaultValue={client.name}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="Отчество"
                                        onChange={e => setClient({...client, patronymic: e.target.value})}
                                        defaultValue={client.patronymic}
                                    />
                                </Col>
                                <Col span={24}>
                                    <p>День рождения</p>
                                    <DatePicker 
                                        format={dateFormat}
                                        onChange={val => {
                                            if (val != null){
                                                setClient({...client, birthday: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }}
                                        defaultValue={!client.birthday
                                            ? moment("1900-01-01")
                                            : moment(client.birthday)}
                                    />
                                </Col>
                                <Col span={4}>
                                    <p>Пол</p>
                                </Col>
                                <Col span={12}>
                                    <Radio.Group defaultValue={passport.sex == "М"
                                        ? "male"
                                        : "female"
                                    }>
                                        <Radio value="male" onChange={() => setPassport({...passport, sex: "М"})}>Мужчина</Radio>
                                        <Radio value="female" onChange={() => setPassport({...passport, sex: "Ж"})}>Женщина</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>   
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h2>Паспортные данные</h2>
                                </Col>
                                <Col span={4}>
                                    <Input
                                        addonBefore="Серия"
                                        onChange={e => setPassport({...passport, series_passport: e.target.value})}
                                        defaultValue={passport.series_passport}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="Номер"
                                        onChange={e => setPassport({...passport, number_passport: e.target.value})}
                                        defaultValue={passport.number_passport}
                                    />
                                </Col>
                                <Col span={10}>
                                    <Button disabled>
                                        Проверить пасспортные данные
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <p>Дата выдачи</p>
                                    <DatePicker 
                                        format={dateFormat}
                                        onChange={val => {
                                            if (val != null){
                                                setPassport({...passport, date_of_issue_of_passport: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }}
                                        defaultValue={!passport.date_of_issue_of_passport
                                            ? moment("1900-01-01")
                                            : moment(passport.date_of_issue_of_passport)
                                        }
                                    />
                                </Col>
                            </Row> 
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h2>Водительские права</h2>
                                </Col>
                                <Col span={4}>
                                    <Input
                                        addonBefore="Серия"
                                        onChange={e => setDriverLicense({...driver_license, series_license: e.target.value})}
                                        defaultValue={driver_license.series_license}
                                    />
                                </Col>
                                <Col span={6}offset={14} pull={14}>
                                    <Input
                                        addonBefore="Номер"
                                        onChange={e => setDriverLicense({...driver_license, number_license: e.target.value})}
                                        defaultValue={driver_license.number_license}
                                    />
                                </Col>
                                <Col span={8}>
                                    <p>Дата выдачи водительских прав</p>
                                    <DatePicker 
                                        format={dateFormat}
                                        onChange={val => {
                                            if (val != null){
                                                setDriverLicense({...driver_license, date_of_issue_of_the_valid_certificate: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }}
                                        defaultValue={!driver_license.date_of_issue_of_the_valid_certificate
                                            ? moment("1900-01-01")
                                            : moment(driver_license.date_of_issue_of_the_valid_certificate)
                                        }
                                    />
                                </Col>
                                <Col span={8}>
                                    <p>Дата начала стажа</p>
                                    <DatePicker 
                                        format={dateFormat}
                                        onChange={val => {
                                            if (val != null){
                                                setDriverLicense({...driver_license, driving_experience: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }}
                                        defaultValue={!driver_license.driving_experience
                                            ? moment("1900-01-01")
                                            : moment(driver_license.driving_experience)
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    

                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h2>Адрес и телефон</h2>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        addonBefore="Страна"
                                        onChange={e => setClient({...client, country: e.target.value})}
                                        defaultValue={client.country}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        addonBefore="Область"
                                        onChange={e => setClient({...client, region: e.target.value})}
                                        defaultValue={client.region}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        addonBefore="Город/населенный пункт"
                                        onChange={e => setClient({...client, locality: e.target.value})}
                                        defaultValue={client.locality}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input
                                        addonBefore="Улица"
                                        onChange={e => setClient({...client, street: e.target.value})}
                                        defaultValue={client.street}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Input
                                        addonBefore="Дом"
                                        onChange={e => setClient({...client, house_number: e.target.value})}
                                        defaultValue={client.house_number}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Input
                                        addonBefore="Корпус"
                                        onChange={e => setClient({...client, the_building_of_the_house: e.target.value})}
                                        defaultValue={client.the_building_of_the_house}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Input
                                        addonBefore="Квартира"
                                        onChange={e => setClient({...client, flat: e.target.value})}
                                        defaultValue={client.flat}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputNumber
                                        addonBefore="Телефон: +"
                                        prefix="+"
                                        onChange={val => setClient({...client, telephone: val})}
                                        defaultValue={
                                            client.telephone == ""
                                            ? "7"
                                            : client.telephone 
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <Input
                                        addonBefore="e-mail"
                                        onChange={e => setClient({...client, email: e.target.value})}
                                        defaultValue={client.email}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    
                    <Col span={6} offset={18}>
                        <Button onClick={() => setUserInfo()}>
                            Сохранить данные
                        </Button>
                    </Col>
                    

                    <h2>Транспорт</h2>
                    <Col span={24}>
                        {transportBlock}
                    </Col>

                    <Col span={24}>
                        <Button disabled>
                            Добавить транспорт
                        </Button>
                    </Col>
                </Row> 
            }
        </div>
    )
}

export default ClientIdPages
