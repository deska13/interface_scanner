import React, { useState, useEffect, useRef } from 'react';
// import ClientFilter from '../components/ClientFilter';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import Pagination from '../components/UI/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { useClients } from '../hooks/useClients';
import '../styles/App.css'
import { getPageCount } from '../utils/pages';
import { Button, Modal, Input, Upload, Space, Row, Col, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllClients } from '../API/ClientBaseService'


function Clients() {
    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedClients = useClients(clients, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchClients, isClientsLoading, clientError] = useFetching(async (limit, page) => {
        const response = await getAllClients()
        setClients([...clients, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isClientsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchClients(limit, page)
    }, [page, limit])

    const createClient = (newClient) => {
        setClients([...clients, newClient])
        setModal(false)
    }

    const removeClient = (post) => {
        setClients(clients.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <Button onClick={() => setModal(true)}>
                Создать пользователя
            </Button>
            <ClientForm modal={modal} setModal={setModal}/>
            {/* <ClientFilter 
                filter={filter}
                setFilter={setFilter}
            /> */}
            {/* <MySelect 
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value:5, name:'5'},
                    {value:10, name:'10'},
                    {value:25, name:'25'},
                    {value:-1, name:'Все'},
                ]}
            /> */}
            {clientError &&
                <h1>Error ${clientError}</h1>
            }
            <ClientList remove={removeClient} clients={sortedAndSearchedClients} title="Клиенты" />
            <Row gutter={[16, 16]} ref={lastElement}>
                {isClientsLoading &&
                    <Col span={24}><Spin size="large" /></Col> 
                }
            </Row>
            {/* <Pagination 
                page={page} 
                changePage={changePage} 
                totalPages={totalPages} /> */}
        </div>
    );
}

export default Clients;
