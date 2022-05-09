import swal from 'sweetalert'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if(!sessionStorage.getItem("admin")){
      navigate('/admin')
    }
  }, [])

  const handleGotoAkun = () => {
    navigate('/admin/akun')
  }

  const handleGotoRekap = () => {
    navigate('/admin/rekap')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin')
    swal(`Logout`, `Akun Admin Telah Logout`, "warning").then(() => {
      navigate('/admin')
    })
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen font-light p-4 pb-24 md:px-8 lg:px-36 xl:px-60 2xl:px-72">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="text-center"><i className="fa fa-user-circle fa-2x" aria-hidden="true"></i></div>
          <div>Admin</div>
          <hr className="border-[1px] border-slate-200 w-full" />
          <div className="mt-4 flex flex-col gap-8 md:flex-row">
            <div id="dashboard-card" className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
              <a onClick={handleGotoAkun} className="w-full block h-full">
                <img alt="blog photo" src="https://cdn.discordapp.com/attachments/820516437118025780/961822660684316733/pablita-blur-desk-with-notes-1.png" className="max-h-40 w-full object-cover bg-slate-200 px-8 py-4" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                  <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                    Akun dan Status Asisten
                  </p>
                  <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    Kelola status dan akun asisten
                  </p>
                </div>
              </a>
            </div>
            <div id="dashboard-card" className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
              <a onClick={handleGotoRekap} className="w-full block h-full">
                <img alt="blog photo" src="https://cdn.discordapp.com/attachments/820516437118025780/961822660684316733/pablita-blur-desk-with-notes-1.png" className="max-h-40 w-full object-cover bg-slate-200 px-8 py-4" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                  <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                    Rekap Laporan
                  </p>
                  <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    Lihat rekap laporan kegiatan
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-8">
            <button onClick={handleLogout} type="button" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard