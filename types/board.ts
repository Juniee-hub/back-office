type DefaultDataType = {
    id: string | number
    title: string
    content: string
    createAt: string | Date
    updatedAt: string | Date
}

export type BoardDataType = DefaultDataType & {
    name: string
    hit: string | number
}

export type CardPorpTypes = {
    dataLists: Partial<Readonly<BoardDataType>>[]
}

// 게시판 설정 Type
export type BoardSetupDataType = DefaultDataType & {
    template: string
    scrollType: string
    pageLimit: number
}
