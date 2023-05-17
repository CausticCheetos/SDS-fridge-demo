import { useEffect, useState } from "react"

const Clock = () => {
    const [date, setDate] = useState(new Date())
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="clock">{date.toLocaleString("en-AU")}</div>
    )
}

export default Clock