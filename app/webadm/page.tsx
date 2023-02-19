import AreaGraph from '@/components/dashboard/areaGraph'
import { GetBoardStatisticsData } from '@/controller/dashboard'

import styles from './page.module.css'
//TODO: 폰트 적용

export const revalidate = 0

const AdminHome = async () => {
    const graphData = await getGraphData()

    return (
        <div className={styles.wrap}>
            <section></section>

            <section>
                <AreaGraph title={'게시글 수'} graphData={graphData} tooltip={{ name: '새 글', value: '개' }} />
            </section>
        </div>
    )
}

export default AdminHome

const getGraphData = async () => {
    return await GetBoardStatisticsData()
}
