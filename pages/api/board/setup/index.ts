import _ from 'lodash'
import { checkAuth } from '@/controller/auth'
import { randomFromArray, sleep } from '@/lib/functions'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { BoardSetupDataType, CardPorpTypes } from '@/types/board'
import { nanoid } from 'nanoid'

type ResDefaultData = {
    name: string
    message: string
}

type ResData = Partial<ResDefaultData> | CardPorpTypes

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    const { method, body, query } = req

    if (checkAuth() === false) {
        res.status(404).end()
        return
    }

    await sleep(1000)

    const { limit, page } = query

    if (method?.includes('GET')) {
        const dataSize = limit !== undefined ? parseInt(limit.toString()) : _.random(3, 20)
        const result: Partial<BoardSetupDataType>[] = [...new Array(dataSize)].map((v, i) => {
            return {
                id: nanoid(10),
                title: randomFromArray(['공지사항', '자유게시판']),
                content: randomFromArray(['전체 공유할 내용 등록하는 게시판입니다.', '장롭게 본인 이야기하는 게시판입니다.']),
                template: randomFromArray(['Card', 'Default']),
                scrollType: randomFromArray(['Infinity', 'Default']),
                pageLimit: randomFromArray([10, 20, 30, 5, 15]),
            }
        })

        res.status(200).json({ dataLists: [...result] })
    }

    res.status(404).end()
    return
}
