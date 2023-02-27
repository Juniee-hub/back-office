import React from 'react'
import BoardSetupLists from '@/components/lists/boardSetupLists'
import SearchBox from '@/components/layout/searchBox'

const AdminBoardSetupPage = () => {
    return (
        <article>
            <section>
                <SearchBox />
            </section>
            <BoardSetupLists />
        </article>
    )
}

export default AdminBoardSetupPage
