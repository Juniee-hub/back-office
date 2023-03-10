import type { Metadata } from 'next'

import AdminLayout from '@/components/layout/webadm/layout'
import React from 'react'

export const metadata: Metadata = {
    title: '관리 시스템',
    description: 'Welcome to Next.js',
}

interface PropsType {
    children: JSX.Element
}

const layout = ({ children }: PropsType) => {
    return <AdminLayout>{children}</AdminLayout>
}

export default layout
