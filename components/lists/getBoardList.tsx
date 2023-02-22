'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CardLilsts from './cardLilsts'
import { BoardDataType, CardPorpTypes } from '@/types/board'
import { Skeleton } from 'antd'

type ListTypes = 'card' | 'list' | 'collapse'

type GetBoardProps = {
    listType: ListTypes
    apiUrl: string
    limit?: number
}

// type

const getData = async (apiUrl: string): Promise<BoardDataType[]> => {
    try {
        const resData = await axios.get(apiUrl)
        return resData.data
    } catch (error) {
        // 통신에러
        if (axios.isAxiosError(error)) {
            const stateCode = error.response?.status
            return []
        } else {
            throw Error(`Error!! ${error}`)
            return []
        }
    }
}

const GetBoardList = ({ listType, apiUrl, limit }: GetBoardProps): JSX.Element => {
    //Step1.. DataFetch..

    const searchParams = limit ? new URLSearchParams({ limit: limit?.toString() }) : {}
    const queryString = searchParams ? searchParams.toString() : ''

    const callApiUrl = limit ? `${apiUrl}?${queryString}` : apiUrl

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['test'],
        queryFn: () => getData(callApiUrl),
        refetchOnWindowFocus: false,
        notifyOnChangeProps: ['data'],
    })

    //Step2.. Component Connect
    let returendComponent: JSX.Element = (
        <>
            {[...new Array(limit)].map((v, i) => {
                return <Skeleton key={`skeleton_${i}`} loading={isLoading} active />
            })}
        </>
    )

    if (data !== undefined) {
        switch (listType) {
            case 'card':
                returendComponent = <CardLilsts dataLists={[...data.dataLists]} />
                break
            case 'list':
                returendComponent = <CardLilsts dataLists={[]} />
                break
            case 'collapse':
                returendComponent = <CardLilsts dataLists={[]} />
                break
        }
    }

    return <>{returendComponent}</>
}

export default GetBoardList
