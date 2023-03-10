import type { Metadata } from 'next'

import AreaGraph from '@/components/dashboard/areaGraph'
import GetBoardList from '@/components/lists/getBoardList'
import { GetBoardStatisticsData } from '@/controller/dashboard'

import styles from './page.module.css'

export const metadata: Metadata = {
    title: '관리 시스템 - 대시보드',
    description: 'Welcome to Next.js',
}

export const revalidate = 0

const AdminHome = async () => {
    const graphData = await getGraphData()

    return (
        <div className={styles.wrap}>
            <section>
                <GetBoardList listType={'card'} apiUrl={'/api/board'} limit={2} />
            </section>

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
