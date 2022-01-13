import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { getTransportById, setTransportById } from '../API/ClientBaseService'
import { useFetching } from '../hooks/useFetching'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DriverItem from '../components/DriverItem'
import { Button, Row, Col, Card, Spin, Input, DatePicker, Select, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import DriverForm from '../components/DriverForm'
const { Option } = Select


const TransportIdPages = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id_transport } = useParams()
    const [transport, setTransport] = useState({})
    const [transport_passport, setTransportPassport] = useState({})
    const [transport_registration, setTransportRegistration] = useState({})
    const [clients, setClients] = useState([])
    const [drivers, setDrivers] = useState([])
    const [modal, setModal] = useState(false)
    const [fetchTransportById, isLoading, loadError] = useFetching(async () => {
        const response = await getTransportById(id_transport)
        setTransport(response.data.transport)
        setTransportPassport(response.data.transport_passport)
        setTransportRegistration(response.data.transport_registration)
        setClients(response.data.clients)
        setDrivers(response.data.drivers)
    }) 

    const [setTrasnportInfo, isSet, setError] = useFetching(async () => {
        console.log(transport_passport)
        const response = await setTransportById(id_transport, 
                                                            transport, 
                                                            transport_passport, 
                                                            transport_registration)
        fetchTransportById(id_transport)
    }) 

    const dateFormat = 'DD.MM.YYYY'

    const driversBlock = drivers.sort(
        (a, b) => a.client_id > b.client_id ? 1 : -1
    ).map((driver, index) =>{
        return <Col span={24}>
            <Card>
                <TransitionGroup>
                    <CSSTransition
                        key={driver.id}
                        timeout={200}
                        classNames="client"
                    >
                        <DriverItem number={index + 1} driver={driver} client={clients[index]}/>
                    </CSSTransition>
                </TransitionGroup>
            </Card>
        </Col> 
    })

    useEffect(() => {
        fetchTransportById(params.id_transport)
    }, [])

    return (
        <div className='App'>
            <h1>Вы открыли страницу транспорта № {id_transport}</h1>
            {isLoading
                ? <Spin size="large" />
                :
                <Row gutter={[16, 8]}>
                    <DriverForm transport_id={id_transport} modal={modal} setModal={setModal}/>
                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h3>
                                        Транспорт: {transport.id}
                                    </h3>
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Марка"
                                        onChange={e => setTransport({...transport, vehicle_mark: e.target.value})}
                                        defaultValue={transport.vehicle_mark}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Модель"
                                        onChange={e => setTransport({...transport, vehicle_model: e.target.value})}
                                        defaultValue={transport.vehicle_model}
                                    />
                                </Col>
                                <Col span={6} offset={6} pull={6}>
                                    <Input 
                                        addonBefore="Мощность двигателя"
                                        onChange={e => setTransport({...transport, engine_power: e.target.value})}
                                        defaultValue={transport.engine_power}
                                    />
                                </Col>
                                <Col span={2}>
                                    <p>Тип КПП</p>
                                </Col>
                                <Col span={4}>
                                    <Select
                                        showSearch
                                        placeholder="Выберите тип КПП"
                                        style={{ width: '100%' }}
                                        defaultValue={
                                            transport.type_transmission == "Автоматическая"
                                            ? "Автоматическая"
                                            : transport.type_transmission == "Механическая"
                                            ? "Механическая"
                                            : false
                                        }
                                        onChange={(val) => {
                                            setTransport({...transport, type_transmission: val})
                                        }}
                                        >
                                        <Option value="Автоматическая">Автоматическая</Option>
                                        <Option value="Механическая">Механическая</Option>
                                    </Select>
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Тип кузова"
                                        onChange={e => setTransport({...transport, type_body: e.target.value})}
                                        defaultValue={transport.type_body}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Количество дверей"
                                        onChange={e => setTransport({...transport, number_of_doors: e.target.value})}
                                        defaultValue={transport.number_of_doors}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Привод"
                                        onChange={e => setTransport({...transport, type_of_drive: e.target.value})}
                                        defaultValue={transport.type_of_drive}
                                    />
                                </Col>
                                <Col span={24}>
                                    <p>* машинам старше 2002 года необязательно заполнять тип КПП, тип кузова и привод</p>
                                </Col>
                                <Col span={12}>
                                    <Input 
                                        addonBefore="Стоимость"
                                        onChange={e => setTransport({...transport, price: e.target.value})}
                                        defaultValue={transport.price}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Button disabled>
                                        Получить рыночную стоимость
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <h3>
                                        Регистрация транспортного средства
                                    </h3>
                                </Col>
                                <Col span={6}>
                                    <Input 
                                        addonBefore="Серия"
                                        onChange={e => setTransportRegistration({...transport_registration, registration_series: e.target.value})}
                                        defaultValue={transport_registration.registration_series}
                                    />
                                </Col>
                                <Col span={7}>
                                    <Input 
                                        addonBefore="Номер"
                                        onChange={e => setTransportRegistration({...transport_registration, registration_number: e.target.value})}
                                        defaultValue={transport_registration.registration_number}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input 
                                        addonBefore="Государственный номер"
                                        onChange={e => setTransport({...transport, registration_plates: e.target.value})}
                                        defaultValue={transport.registration_plates}
                                    />
                                </Col>
                                <Col span={12} offset={12} pull={12}>
                                    <Input 
                                        addonBefore="VIN номер"
                                        onChange={e => setTransport({...transport, identification_number_VIN: e.target.value})}
                                        defaultValue={transport.identification_number_VIN}
                                    />
                                </Col>
                                <Col span={24}>
                                    <p>Год выпуска</p>
                                    <DatePicker 
                                        picker="year"
                                        onChange={val => {
                                            if (val != null){
                                                setTransport({...transport, year_of_release: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }
                                        }
                                        defaultValue={!transport.year_of_release
                                            ? moment("1900-01-01", "YYYY")
                                            : moment(transport.year_of_release, "YYYY")
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Row gutter={16, 8}>
                                <Col span={24}>
                                    <h3>
                                        Паспорт транспортного средства
                                    </h3>
                                </Col>
                                <Col span={3}>
                                    <p>Тип ПТС</p>
                                </Col>
                                <Col span={12} offset={9} pull={9}>
                                    <Radio.Group defaultValue={transport_passport.digital_passport == false
                                        ? "old"
                                        : transport_passport.digital_passport == true
                                        ? "new"
                                        : false
                                    }>
                                        <Radio value="old" onChange={() => setTransportPassport({...transport_passport, digital_passport: false})}>Старый ПТС</Radio>
                                        <Radio value="new" onChange={() => setTransportPassport({...transport_passport, digital_passport: true})}>Электронный ПТС</Radio>
                                    </Radio.Group>
                                </Col>
                                {
                                    transport_passport.type_transport_passport == "old"
                                    ? <Col span={6}>
                                        <Input 
                                            addonBefore="Серия"
                                            onChange={e => setTransportPassport({...transport_passport, series_transport_passport: e.target.value})}
                                            defaultValue={transport_passport.series_transport_passport}
                                        />
                                    </Col>
                                    : <></>
                                }
                                <Col span={7}>
                                    <Input 
                                        addonBefore="Номер"
                                        onChange={e => setTransportPassport({...transport_passport, number_transport_passport: e.target.value})}
                                        defaultValue={transport_passport.number_transport_passport}
                                    />
                                </Col>
                                <Col span={24}>
                                    <p>Дата начала владения транспортом последним собственником</p>
                                    <DatePicker 
                                        format={dateFormat}
                                        onChange={val => {
                                            console.log(val)
                                            if (val != null){
                                                setTransport({...transport, date_of_commencement_of_vehicle_ownership_by_the_last_owner: moment(val._d).format("YYYY-MM-DD")})
                                            }
                                        }}
                                        defaultValue={!transport.date_of_commencement_of_vehicle_ownership_by_the_last_owner
                                            ? moment("1900-01-01", 'YYYY-MM-DD')
                                            : moment(transport.date_of_commencement_of_vehicle_ownership_by_the_last_owner, 'YYYY-MM-DD')
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => false} disabled>
                            Посчитать стоимость
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => false} disabled>
                            Проверить авто
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={() => setTrasnportInfo()}>
                            Сохранить данные
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button onClick={()=> navigate(`/orders/${transport.id}`)}>
                            Расчёт 
                        </Button>
                    </Col>

                    <Col span={24}>
                        <h1>Водители</h1>
                        <Row gutter={[16, 8]}>
                            {driversBlock}
                        </Row>
                    </Col>

                    <Col span={4} offset={18}>
                        <Button onClick={() => setModal(true)}>
                            Добавить водителя
                        </Button>
                    </Col>
                </Row> 
            }
        </div>
    )
}

export default TransportIdPages
