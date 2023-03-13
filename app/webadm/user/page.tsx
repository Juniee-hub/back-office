import React from 'react'
import UserList from '@/components/lists/userLists'
import SearchBox from '@/components/layout/searchBox'

import styles from './page.module.css'

const AdminUserPage = () => {
    const addBtnUrl = '/webadm/user/form'

    return (
        <article className={styles.wrap}>
            <section>
                <SearchBox addBtnUrl={addBtnUrl} />
            </section>

            <UserList />
        </article>
    )
}

export default AdminUserPage
