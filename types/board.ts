export type BoardDataType = {
    id: string | number
    name: string
    hit: string | number
    title: string
    content: string
}

export type CardPorpTypes = {
    dataLists: Partial<BoardDataType>[]
}
