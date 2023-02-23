'use client'
import { useState, useEffect } from 'react'

function useDetectDeviceSize() {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isTablet, setIsTablet] = useState<boolean>(false)

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768)
            setIsTablet(window.innerWidth < 992)
        }
        setIsMobile(window.innerWidth < 768)
        setIsTablet(window.innerWidth < 992)

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return { isMobile, isTablet }
}
export default useDetectDeviceSize
