import { Link, useLocation } from "react-router-dom"

export default function () {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
      <div className="fixed bottom-0 z-50 w-screen bg-white flex flex-row justify-center h-[40px] items-center">
        <div className="w-[600px] flex flex-row justify-center h-full">
          <Link to='/dashboard' className={`text-center w-[100px] flex items-center justify-center ${path == '/dashboard' && 'bg-slate-300'}`}><i className="fa fa-home fa-lg" aria-hidden="true"></i></Link>
          <Link to='/lapor' className={`text-center w-[100px] flex items-center justify-center ${path == '/lapor' && 'bg-slate-300'}`}><i className="fa fa-sticky-note fa-lg" aria-hidden="true"></i></Link>
          <Link to='/rekap' className={`text-center w-[100px] flex items-center justify-center ${path == '/rekap' && 'bg-slate-300'}`}><i className="fa fa-calendar-check-o fa-lg" aria-hidden="true"></i></Link>
        </div>
      </div>
    </>
  )
}