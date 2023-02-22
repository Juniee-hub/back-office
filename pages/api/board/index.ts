import randomInteger from 'random-int'
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkAuth } from '@/controller/auth'
import type { BoardDataType, CardPorpTypes } from '@/types/board'
import { randomFromArray, sleep } from '@/lib/functions'
import { nanoid } from 'nanoid'

type ResDefaultData = {
    name: string
    message: string
}

type ResData = ResDefaultData | CardPorpTypes

export default async function handler(req: NextApiRequest, res: NextApiResponse<Partial<ResData>>) {
    const { method, body, query } = req

    if (checkAuth() === false) {
        res.status(404).end()
        return
    }

    await sleep(1000)

    const { limit } = query

    if (method?.includes('GET')) {
        const dataSize = limit !== undefined ? parseInt(limit.toString()) : randomInteger(3, 20)
        const result: Partial<BoardDataType>[] = [...new Array(dataSize)].map((v, i) => {
            return {
                id: nanoid(10),
                name: randomFromArray(['직원1', '관리자', '방문자']),
                hit: randomInteger(0, 60),
                title: randomFromArray(['오늘의 맛집!', '출근길 생각...']),
                content: randomFromArray(['맛이 좋네요', '오늘은 심심하네요', '날씨가 좋습니다!!!']),
            }
        })

        res.status(200).json({ dataLists: [...result] })
    }

    res.status(404).end()
    return
}
