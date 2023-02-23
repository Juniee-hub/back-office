import express, { Request, Response, NextFunction } from 'express'
import next from 'next'

// 데브 상태냐 아니냐?
const dev = process.env.NODE_ENV !== 'production'

// 포트가 배포상태일 경우 3000 아닐경우 정해준대로 ㄱ
const port = parseInt(process.env.PORT || '3000', 10)

// next 앱 데브냐 아니냐로 next가 실행시킬 방향을 정한다.
const nextApp = next({ dev })

// next의 리퀘스트 핸들러
const handle = nextApp.getRequestHandler()

// next js 가 ssr을 진행하기전에 준비과정
nextApp.prepare().then(() => {
    // 서버
    const server = express()

    // SIGNIT 시그널을 받았는지 여부, 앱이 곧 종료 될 것임을 의미함.
    let isNextAppGoingToBeClose = false
    server.use((req: Request, res: Response, next: NextFunction) => {
        if (isNextAppGoingToBeClose) {
            // 앱이 곧 종료될 경우
            // 커넥션을 끊어버린다
            res.set('Connection', 'close')
        }
        // 그리고 넘김
        next()
    })

    // 위에 요청을 제외한 요청들은 next requestHandler에서 관리한다.
    server.all('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    const listeningServer = server.listen(port, (err?: Error) => {
        if (err) throw err
        console.log(`서버켜짐 port : ${port} state : ${process.env.NODE_ENV}`)

        // 서버가 켜지면 pm2에게 구동이 완료됨을 전달
        if (process.send) {
            process.send('ready')
            console.log(`sent to pm2 with ready message at ${new Date()}`)
        }
    })
    process.on('SIGINT', () => {
        console.log('앱이 곧 종료됩니다. received signit signal')

        // 앱이 곧 꺼지개 만들고 서버와의 커넥션도 닫게만든다
        isNextAppGoingToBeClose = true

        // pm2에서 _old_N 프로세스에서 종료 신호가 들어오면 서버를 종료한다.
        listeningServer.close((err?: Error) => {
            console.log('server closed')
            process.exit(err ? 1 : 0)
        })
    })
})
