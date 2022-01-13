import React from 'react'
import {getPagesArray} from "../../../utils/pages";
import { Button, Modal, Input, Upload, Space, Row, Col, Spin } from 'antd';

const Pagination = ({totalPages, page, changePage}) => {
    
    let pagesArray = getPagesArray(totalPages)

    return (
        <Row gutter={[16, 16]}>
            {pagesArray.map(p =>
            <span 
                onClick={() => changePage(p)}
                key={p} >
                {p}
            </span> 
            )}
        </Row>
    )
}

export default Pagination
