import React from 'react'

import DefaultLayer from '@/components/panels/layerPanels/defaultLayerPanel'
import styles from './loading.module.css'

const Loading = () => {
    return (
        <DefaultLayer>
            <div className={styles.loader} />
        </DefaultLayer>
    )
}

export default Loading
