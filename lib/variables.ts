// const dayFormat = 'ddd MMM DD YYYY'
export const dayFormat = 'YYYY-MM-DD'
export const timeFormat = 'HH:mm'

export const domain = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL : 'http://localhost:3000'

export const fileApiLink = '/api/attachment'
export const fileDownLink = '/api/attachment/fileDown'
export const fileAttachPath = 'public/attachment'

export const isApiTestMode = true

export const userGradeToText = {
    1: '최고관리자',
    2: '행사업체',
}
