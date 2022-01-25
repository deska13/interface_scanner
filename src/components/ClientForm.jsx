import React, {createRef, useState} from 'react'
import { useFetching } from '../hooks/useFetching'
import { sendDocumentNewClient } from '../API/ClientBaseService';
import { Button, Input, Modal, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'

const ClientForm = ({modal, setModal}) => {
    const navigate = useNavigate()
    const [client, setClient] = useState({
        passport_image: createRef(),
        driver_license_image: createRef(),
        registration_transport_image: createRef(),
        passport_transport_image: createRef(),
        drivers_images: createRef()
    })


    const clickAddNewClient = () =>{
        addNewClient()
    }

    const [addNewClient, isAddNewClientLoad, addNewClientError] = useFetching(async () => {
        const response = await sendDocumentNewClient(client)
        navigate(`/clients/${response.data}`)
    }) 

    return (
        <Modal 
            visible={modal}
            onCancel={() => setModal(false)}
            width={1000}
            footer={[
                <Button type="primary" onClick={() => clickAddNewClient()}>
                    Отправить на обработку
                </Button>]}
            >
            <Space direction="vertical" style={{ width: '100%' }}>
                <p>Паспорт</p>
                <Upload
                    listType="picture"
                    maxCount={2}
                    onChange={(file) => {
                        new Promise(() => {
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setClient({...client, passport_image: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить паспорт
                    </Button>
                </Upload>
                <p>Водительские права</p>
                <Upload
                    listType="picture"
                    maxCount={2}
                    onChange={(file) => {
                        new Promise(() => {
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setClient({...client, driver_license_image: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить водительские права (обе стороны)
                    </Button>
                </Upload>
                <p>Регистрация ТС</p>
                <Upload
                    listType="picture"
                    maxCount={2}
                    onChange={(file) => {
                        new Promise(() => {
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setClient({...client, registration_transport_image: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить регистрацию ТС (обе стороны)
                    </Button>
                </Upload>
                <p>Паспорт ТС</p>
                <Upload
                    listType="picture"
                    maxCount={2}
                    onChange={(file) => {
                        new Promise(() => {
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setClient({...client, passport_transport_image: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить паспорт ТС
                    </Button>
                </Upload>
                {/* <p>Водители</p>
                <Upload
                    listType="picture"
                    maxCount={20}
                    multiple
                    onChange={(file) => {
                        new Promise(() => {
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setClient({...client, drivers_images: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить водительские права (Max: 20)
                    </Button>
                </Upload> */}
            </Space>
        </Modal>
    )
}

export default ClientForm