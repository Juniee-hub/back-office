import React from 'react'
import UserList from '@/components/lists/userLists'
import SearchBox from '@/components/layout/searchBox'

import styles from './page.module.css'

const AdminUserPage = () => {
    return (
        <article className={styles.wrap}>
            <section>
                <SearchBox />
            </section>

            <UserList />
        </article>
    )
}

export default AdminUserPage
