import React from 'react'
import { Input, Select, Space, Upload, message } from 'antd';

const ClientFilter = ({filter, setFilter}) => {
    return (
        <div>
            <Input 
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder = "Поиск..."
            />
            <Select
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
    )
}

export default ClientFilter
