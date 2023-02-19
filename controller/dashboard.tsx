import dayjs from 'dayjs'
import randomInteger from 'random-int'

export const GetBoardStatisticsData = async () => {
    const resut = [...new Array(7)].map((v, i) => {
        return {
            xField: dayjs().subtract(i, 'day').format('MM-DD'),
            yField: randomInteger(3, 20),
        }
    })

    return resut.reverse()
}
