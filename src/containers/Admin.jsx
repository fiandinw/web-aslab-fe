import { useState } from "react"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert'
import logoUpi from '../upi.png'

function Admin() {
  let navigate = useNavigate()

  const [inputs, setInputs] = useState({
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if(inputs.password === '123456'){
      swal(`Login Berhasil`, `Selamat Datang Admin`, "success").then(() => {
        sessionStorage.setItem("admin", true)
        navigate('/admin/dashboard')
      })
    }else{
      swal('Login Gagal', 'nim/password salah', 'error')
    }
  }

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  const handleGotoAsisten = () => {
    navigate('/login')
  }

  return (
    <>
      <div className="p-4 sm:p-16 flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col w-full max-w-md px-4 py-8 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Login Admin Asisten Laboratorium
          </div>
          <div className="mt-8">
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                      </path>
                    </svg>
                  </span>
                  <input required type="password" value={inputs.password} onChange={handleInputs} id="password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" placeholder="Password" />
                </div>
              </div>
              <div className="flex w-full">
                <button type="submit" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <a onClick={handleGotoAsisten} className="cursor-pointer inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
              <span className="ml-2">
                Login Asisten
              </span>
            </a>
          </div>
        </div>
        <div className="w-fit mt-4 mx-auto text-white text-xs text-center">Sistem Pelaporan Kegiatan Asisten Laboratorium Pendidikan Multimedia UPI Cibiru</div>
      </div>
    </>
  )
}

export default Admin