import React from 'react'
import UserFormProfile from '@/components/form/user/profile'

import styles from './userForm.module.css'
import ProfilePannel from '@/components/form/user/profilePannel'

export const revalidate = 0

const AdminUserFormPage = async () => {
    const dataInfo = await getDataFromDB()

    return (
        <section className={styles.wrap}>
            <div className={styles.container}>
                <UserFormProfile />
                <div className={styles.area}>
                    <ProfilePannel />
                </div>
            </div>
        </section>
    )
}

export default AdminUserFormPage

const getDataFromDB = async () => {
    return {}
}
