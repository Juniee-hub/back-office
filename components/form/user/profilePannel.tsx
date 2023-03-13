'use client'
import React, { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import UserFormFeed from './feed'
import UserFormGrpah from './grpah'
import UserFormHistory from './history'
import UserForm from './form'

const ProfilePannel = () => {
    //layoutStore 에서 값 가져와서 표기 처리... overView,Setting...
    const { tab } = useUserStore()

    // useEffect(() => {
    //     console.log('tab', tab)
    // })

    return (
        <>
            {tab === 'OverView' && (
                <>
                    <article>
                        <UserFormFeed />
                    </article>

                    <article>
                        <UserFormGrpah />
                        <UserFormHistory />
                    </article>
                </>
            )}

            {tab === 'Settings' && (
                <>
                    <article>
                        <UserForm />
                    </article>
                </>
            )}
        </>
    )
}

export default ProfilePannel
