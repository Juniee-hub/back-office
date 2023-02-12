import React from 'react'

import styles from './defaultLayer.module.css'

interface PropsType {
    children: JSX.Element
    open?: boolean
}

const DefaultLayer = ({ children, open = true }: PropsType) => {
    if (open === false) {
        return <></>
    }

    return <div className={styles.wrap}>{React.cloneElement(children, { open })}</div>
}

export default DefaultLayer
