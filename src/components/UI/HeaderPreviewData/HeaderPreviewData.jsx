import React from 'react'
import { Children } from 'react';
import classes from './HeaderPreviewData.module.css'

const MyInput = React.forwardRef((children, ...props) => {
    return (
        <div className={classes.block}>
            <p className={classes.text}>
                {children}
            </p>
        </div>
    )
});

export default MyInput
