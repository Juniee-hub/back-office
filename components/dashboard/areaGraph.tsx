'use client'
import { Area } from '@ant-design/plots'

import styles from './areaGraph.module.css'

type GraphDataSet = {
    xField: string
    yField: string | number
}
type GraphPropTypes = {
    title: string | null
    graphData: GraphDataSet[]
    tooltip?: {
        name: number | string
        value: number | string
    }
}

const AreaGraph = ({ title, graphData, tooltip }: GraphPropTypes) => {
    const config = {
        data: graphData,
        padding: [30, 0],
        renderer: 'svg',
        xField: 'xField',
        yField: 'yField',
        xAxis: {
            range: [0, 1],
        },
        smooth: true,
        yAxis: false,
        tooltip: {
            formatter: (data: GraphDataSet) => {
                if (tooltip) {
                    return { name: tooltip.name, value: `${data.yField} ${tooltip.value}` }
                } else {
                    return { name: data.xField, value: data.yField }
                }
            },
        },
    }

    return (
        <div className={styles.wrap}>
            {title && <h2 className={styles.title}>{title}</h2>}

            <Area {...config} />
        </div>
    )
}

export default AreaGraph
