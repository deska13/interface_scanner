import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Row, Input, DatePicker, Spin } from 'antd'
import moment from 'moment'
import { useFetching } from '../hooks/useFetching'
import { setDriverById } from '../API/ClientBaseService'

const DriverItem = (props) => {
    const [client, setClient] = useState({})
    const [driver, setDriver] = useState({})

    const [setUserInfo, isLoad] = useFetching(async () => {
        await setClient(props.client)
        await setDriver(props.driver)
    })

    useEffect(() => {
        console.log(driver)
        setUserInfo()
    }, [])

    const dateFormat = 'DD.MM.YYYY'

    const [setDriverInfo, isSet, setError] = useFetching(async () => {
        const response = await setDriverById(client, driver)
    }) 

    return (
        <div>
            {isLoad
                ? <Spin />
                :<Row gutter={[16, 16]}>
                    <Col span={1}>
                        <h3>
                            {props.number}
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
                    <Col span={6} offset={5} pull={5}>
                        <Input
                            addonBefore="Отчество"
                            onChange={e => setClient({...client, patronymic: e.target.value})}
                            defaultValue={client.patronymic}
                        />
                    </Col>
                    <Col span={24}>
                        Водительские права
                    </Col>
                    <Col span={4}>
                        <Input
                            addonBefore="Серия"
                            onChange={e => setDriver({...driver, series_license: e.target.value})}
                            defaultValue={driver.series_license}
                        />
                    </Col>
                    <Col span={6} offset={14} pull={14}>
                        <Input
                            addonBefore="Номер"
                            onChange={e => setDriver({...driver, number_license: e.target.value})}
                            defaultValue={driver.number_license}
                        />
                    </Col>
                    <Col span={8}>
                        <p>Дата рождения</p>
                        <DatePicker 
                            format={dateFormat}
                            onChange={val => {
                                if (val != null) {
                                    setClient({...client, birthday: moment(val._d).format("YYYY-MM-DD")})
                                }
                            }}
                            defaultValue={!client.birthday
                                ? moment("1900-01-01")
                                : moment(client.birthday)
                            }
                        />
                    </Col>
                    <Col span={8}>
                        <p>Дата выдачи водительских прав</p>
                        <DatePicker 
                            format={dateFormat}
                            onChange={val => {
                                if (val != null) {
                                    setDriver({...driver, date_of_issue_of_the_valid_certificate: moment(val._d).format("YYYY-MM-DD")})
                                }
                            }}
                            defaultValue={!driver.date_of_issue_of_the_valid_certificate
                                ? moment("1900-01-01")
                                : moment(driver.date_of_issue_of_the_valid_certificate)
                            }
                        />
                    </Col>
                    <Col span={8}>
                        <p>Дата начала стажа</p>
                        <DatePicker 
                            format={dateFormat}
                            onChange={val => {
                                if (val != null) {
                                    setDriver({...driver, driving_experience: moment(val._d).format("YYYY-MM-DD")})
                                }
                            }}
                            defaultValue={!driver.driving_experience
                                ? moment("1900-01-01")
                                : moment(driver.driving_experience)
                            }
                        />
                    </Col>
                    <Col span={6} offset={18}>
                        <Button onClick={() => setDriverInfo()}>
                            Сохранить данные
                        </Button>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default DriverItem
