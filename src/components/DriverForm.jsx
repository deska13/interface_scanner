import React, {createRef, useState} from 'react'
import { useFetching } from '../hooks/useFetching'
import { addNewDriver } from '../API/ClientBaseService';
import { Button, Modal, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'

const DriverForm = ({transport_id ,modal, setModal}) => {
    const navigate = useNavigate()
    const [driver, setDriver] = useState({
        transport_id: transport_id,
        driver_license_image: createRef()
    })

    const [addNewDriver, isAddNewDriverLoad, addNewDriverError] = useFetching(async () => {
        const response = await addNewDriver(driver)
        console.log(response.data)
    }) 

    return (
        <Modal 
            visible={modal}
            onCancel={() => setModal(false)}
            width={1000}
            footer={[
                <Button type="primary" onClick={() => addNewDriver()}>
                    Отправить на обработку
                </Button>]}
            >
            <Space direction="vertical" style={{ width: '100%' }}>
                <p>Водительские права</p>
                <Upload
                    listType="picture"
                    maxCount={2}
                    onChange={(file) => {
                        new Promise(() => {
                            console.log(file)
                            var arr = []
                            for (let i = 0; i < file.fileList.length; i++) {
                                console.log(i)
                                console.log(file.fileList[i]['originFileObj'])
                                const reader = new FileReader()
                                reader.readAsDataURL(file.fileList[i]['originFileObj'])
                                reader.onload = () => {
                                    arr.push(reader.result)
                                }
                            }
                            setDriver({...driver, driver_license_image: arr})
                        })
                    }}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>
                        Загрузить водительские права (обе стороны)
                    </Button>
                </Upload>
            </Space>
        </Modal>
    )
}

export default DriverForm
