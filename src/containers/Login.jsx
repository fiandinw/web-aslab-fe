import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert'
import axios from "axios"
import logoUpi from '../upi.png'

export default function () {
  let navigate = useNavigate()

  const [inputs, setInputs] = useState({
    nim: '',
    password: ''
  })

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (sessionStorage.getItem("nim") && sessionStorage.getItem("nama")) {
      navigate('/dashboard')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    axios.get('http://127.0.0.1:5000/api/asisten')
      .then((res) => {
        //console.log(res.data.find((asisten) => asisten.nim == inputs.nim))
        const asisten = res.data.find((asisten) => asisten.nim == inputs.nim)

        if (asisten.password != inputs.password) {
          swal('Login Gagal', 'nim/password salah', 'error')
        } else {
          if (asisten.statusAsisten) {
            sessionStorage.setItem("nim", asisten.nim)
            sessionStorage.setItem("nama", asisten.nama)
            swal(`Login Berhasil`, `Selamat Datang ${asisten.nama}`, "success").then(() => {
              navigate('/dashboard')
            })
          }else{
            swal('Akun Tidak Aktif', 'Akun tidak aktif sebagai asisten, hubungi admin jika terdapat kesalahan', 'error')
          }
        }
      })
  }

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  const handleGotoAdmin = () => {
    navigate('/admin')
  }

  return (
    <>
      <div className="p-4 sm:p-16 flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col w-full max-w-md px-4 py-8 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Login Asisten Laboratorium
          </div>
          <div className="font-light text-center">
            <img className="w-16 inline-block" src={logoUpi} alt="logoupi" />
          </div>
          <div className="mt-8">
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                      </path>
                    </svg>
                  </span>
                  <input required type="number" value={inputs.nim} onChange={handleInputs} id="nim" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" placeholder="NIM" />
                </div>
              </div>
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
              {/* <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <a href="#" className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                    Forgot Your Password?
                  </a>
                </div>
              </div> */}
              <div className="flex w-full">
                <button type="submit" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <a className="cursor-pointer inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
              <span className="ml-2">
                Kontak Admin
              </span>
            </a>
            <span className="ml-2 text-gray-500 font-thin">
              |
            </span>
            <a onClick={handleGotoAdmin} className="cursor-pointer inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
              <span className="ml-2">
                Login Admin
              </span>
            </a>
          </div>
        </div>
        <div className="w-fit mt-4 mx-auto text-white text-xs text-center">Sistem Pelaporan Kegiatan Asisten Laboratorium Pendidikan Multimedia UPI Cibiru</div>
      </div>
    </>
  )
}