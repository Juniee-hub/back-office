import dayjs from 'dayjs'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const validURL = (str: string) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ) // fragment locator
    return !!pattern.test(str)
}

export const dayToMyTimeZone = (day: string) => {
    return dayjs(day).add(9, 'h')
}

export const dayToDBTimeZone = (day: string) => {
    return dayjs(day).subtract(9, 'h')
}

// type ArrStr = {
//     [key: string]: any | number
//     // [key: string]: string | number
//     // // [field: string]: string; // Duplicate index signature for type 'string'
//     // [index: number]: string // 인덱스 시그니처에 number를 넣으면 string 타입 데이터를 참조
//     // length: number // 일반 프로퍼티와 공존 가능
// }
// export const paramsToObject = (entries) => {
//     const result = {}
//     for (const [key, value] of entries) {
//         result[key] = value
//     }
//     return result
// }

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const makeTelNumberHypen = (tel: string) => {
    return tel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

export const onlyNumber = (value: string) => {
    const regex = /[^0-9]/g
    return value.replace(regex, '')
}

export const birthToAge = (birth: string, decade = false) => {
    const yearCheck = parseInt(birth.substring(0, 1)) > 3 ? 19 : 20
    const year = parseInt(`${yearCheck}${birth.substring(0, 2)}`)
    const age = parseInt(dayjs().format('YYYY')) - year + 1

    if (decade) {
        return age
    } else {
        return Math.floor(age / 10) * 10
    }
}

export const infoFromReqHeader = (req: any) => {
    const protocol = req.headers.referer.split('://')[0]
    const host = req.headers.host

    return {
        host,
        protocol,
    }
}

export const addhttp = (url: string) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url
    }
    return url
}

export const firstUpperString = (str: string) => {
    const firstChar = str.charAt(0)
    const others = str.slice(1)
    return firstChar.toUpperCase() + others
}

export const randomFromArray = <T>(arr: T[]): T | undefined => {
    return arr.sort(() => Math.random() - 0.5).shift()
}
