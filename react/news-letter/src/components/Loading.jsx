import { useEffect, useState } from "react"

function TopLoader({ loading }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (loading) {
      const resetTimeout = setTimeout(() => setWidth(0), 0)
      const interval = setInterval(() => {
        setWidth(prev => (prev >= 90? 90 : prev + Math.random() * 20))
      }, 150)
      return () => {
        clearTimeout(resetTimeout)
        clearInterval(interval)
      }
    } else {
      const completeTimeout = setTimeout(() => setWidth(100), 0)
      const resetTimeout = setTimeout(() => setWidth(0), 300)
      return () => {
        clearTimeout(completeTimeout)
        clearTimeout(resetTimeout)
      }
    }
  }, [loading])

  return (
    <div className="h-[3px] w-full bg-transparent">
      <div
        style={{ width: `${width}%` }}
        className="h-full bg-blue-600 transition-all duration-200 ease-out"
      ></div>
    </div>
  )
}

export default TopLoader