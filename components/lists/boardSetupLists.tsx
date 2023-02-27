'use client'
import React, { useEffect, useMemo } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Skeleton, List, Space } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'

import styles from './boardSetupLists.module.css'

const apiUrl = '/api/board/setup'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

const LoadingData = () => {
    return (
        <>
            <Skeleton paragraph={{ rows: 3 }} />
        </>
    )
}

const BoardSetupLists = () => {
    // Infinit React Query 고정으로 표기...

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ['boardSetup'],
        queryFn: async ({ pageParam = 1 }) => {
            const searchParams = new URLSearchParams({ page: pageParam })
            const queryString = searchParams ? searchParams.toString() : ''

            const callApiUrl = `${apiUrl}?${queryString}`

            const res = await axios.get(callApiUrl)
            return res.data
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1
            return nextPage
        },
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        let fetching = false

        const handleScroll = async (e: Event) => {
            const { scrollHeight, scrollTop, clientHeight } = (e.target as Document).scrollingElement as HTMLElement
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
                fetching = true
                if (hasNextPage) await fetchNextPage()
                fetching = false
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [fetchNextPage, hasNextPage])

    // Infinite Scolloing 용 데이터 가공
    const listData = useMemo(() => {
        if (!data) return []

        const flatLists = data.pages.flatMap((page) => page.dataLists)

        // 로딩중 목록 구현
        const loadingFetchData = flatLists.concat({ title: '', content: '', loading: true })

        return isFetchingNextPage && hasNextPage ? loadingFetchData : flatLists
    }, [data, isFetchingNextPage, hasNextPage])

    if (isLoading || isError) {
        return <LoadingData />
    }

    return (
        <div className={styles.wrap}>
            <List
                itemLayout={'horizontal'}
                size={'large'}
                dataSource={[...listData]}
                renderItem={(item) => {
                    const { title, content, loading } = item
                    if (loading) {
                        return <LoadingData />
                    }
                    return (
                        <>
                            <List.Item
                                actions={[
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={<p>우측 내용..</p>}
                            >
                                <List.Item.Meta title={title} description={content} />
                            </List.Item>
                        </>
                    )
                }}
            />
        </div>
    )
}

export default BoardSetupLists
