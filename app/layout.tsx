import 'antd/dist/reset.css'
import 'styles/reset.css'
import { Providers } from './provider'

export default function RootLayout({ children }: { children: JSX.Element }) {
    return (
        <html lang="ko">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
