import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { UserContext } from "../context/UserContext"

export default function () {
  // const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const d = new Date()
  const today1 = d.toISOString().split('T')[0]

  const [sidebar, setSidebar] = useState('home')
  const [laporans, setLaporans] = useState([])
  const [todayStatus, setTodayStatus] = useState(false)

  const nama = sessionStorage.getItem("nama")
  const nim = sessionStorage.getItem("nim")

  const sidebarClassName = {
    active: 'w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500 cursor-pointer',
    inactive: 'w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent cursor-pointer'
  }

  useEffect(() => {
    if(!sessionStorage.getItem("nim") && !sessionStorage.getItem("nama")){
      navigate('/login')
    }

    axios.get('http://127.0.0.1:5000/api/laporan')
      .then((res) => {
        const newLaporans = res.data.filter((laporan) => {
          //return laporan.nim == Number(nim)
          return laporan.nim === Number(nim) && laporan.createdAt.split('T')[0] === today1
        })
        if(newLaporans[0]){
          setLaporans(newLaporans)
          setTodayStatus(true)
        }
      })

  }, [])

  const handleLapor = () => {
    console.log(lapor)
  }

  const handleGotoLapor = () => {
    navigate('/lapor')
  }

  const handleGotoRekap = () => {
    navigate('/rekap')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('nim')
    sessionStorage.removeItem('nama')
    swal(`Logout`, `Akun Asisten Telah Logout`, "warning").then(() => {
      navigate('/login')
    })
  }

  return (
    <>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen font-light p-4 pb-24 md:px-8 lg:px-36 xl:px-60 2xl:px-72">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="text-center"><i className="fa fa-user-circle fa-2x" aria-hidden="true"></i></div>
          <div className="text-xl font-medium text-center">{nama}</div>
          <hr className="border-[1px] border-slate-200 w-full" />
          <div>
            <div>
              <div className="text-sm mb-2 text-center">Laporan Hari Ini</div>
              <div className="mb-4">
                {!todayStatus ? (
                  <>
                    <span className="px-4 py-2 text-base rounded-full text-red-600 bg-red-200">
                      belum ada laporan
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-4 py-2 text-base rounded-full text-green-600  bg-green-200">
                      sudah laporan
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div id="dashboard-card" className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
              <a onClick={handleGotoLapor} className="w-full block h-full">
                <img alt="blog photo" src="https://cdn.discordapp.com/attachments/820516437118025780/961822660684316733/pablita-blur-desk-with-notes-1.png" className="max-h-40 w-full object-cover bg-slate-200 px-8 py-4" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                  <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                    Laporan Kegiatan Harian
                  </p>
                  <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                    Laporkan kegiatan harian anda disini
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
                    Lihat rekap anda disini
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
    // <>
    //   <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
    //     <div className="flex items-start justify-between">
    //       <div className="h-screen hidden lg:block shadow-lg relative w-80">
    //         <div className="bg-white h-full dark:bg-gray-700">
    //           <div className="flex items-center justify-start pt-6 ml-8">
    //             <p className="font-bold dark:text-white text-lg">
    //               ASLAB PMM UPI CIBIRU
    //             </p>
    //           </div>
    //           <nav className="mt-6">
    //             <div>
    //               <a onClick={() => { setSidebar('home') }} className={sidebar === 'home' ? sidebarClassName.active : sidebarClassName.inactive}>
    //                 <span className="mx-2 text-sm font-normal">
    //                   Home
    //                 </span>
    //               </a>
    //               <a onClick={() => { setSidebar('laporanHarian') }} className={sidebar === 'laporanHarian' ? sidebarClassName.active : sidebarClassName.inactive}>
    //                 <span className="mx-2 text-sm font-normal">
    //                   Laporan Harian
    //                   <span className="p-1 px-2 ml-4 rounded-lg w-4 h-2 bg-amber-300 text-zinc-50 text-xs font-black">
    //                     !
    //                   </span>
    //                 </span>
    //               </a>
    //               <a onClick={() => { setSidebar('rekap') }} className={sidebar === 'rekap' ? sidebarClassName.active : sidebarClassName.inactive}>
    //                 <span className="mx-2 text-sm font-normal">
    //                   Rekap
    //                 </span>
    //               </a>
    //             </div>
    //           </nav>
    //         </div>
    //       </div>
    //       <div className="flex flex-col w-full md:space-y-4">
    //         <header className="w-full h-16 z-40 flex items-center justify-between">
    //           <div className="block lg:hidden ml-6">
    //             <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
    //               <svg width="20" height="20" className="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
    //                 </path>
    //               </svg>
    //             </button>
    //           </div>
    //           <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
    //             <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
    //               <button className="flex p-2 items-center rounded-full text-gray-400 hover:text-gray-700 bg-white shadow text-md">
    //                 <svg width="20" height="20" className="" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
    //                   </path>
    //                 </svg>
    //               </button>
    //               <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md">
    //                 <svg width="20" height="20" className="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z">
    //                   </path>
    //                 </svg>
    //               </button>
    //               <span className="w-1 h-8 rounded-lg bg-gray-200">
    //               </span>
    //               <a href="#" className="block relative">
    //                 <img alt="profil" src="/images/person/1.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
    //               </a>
    //               <button className="flex items-center text-gray-500 dark:text-white text-md">
    //                 {user}
    //                 <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
    //                   </path>
    //                 </svg>
    //               </button>
    //             </div>
    //           </div>
    //         </header>
    //         <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
    //           {sidebar === 'home' && (
    //             <div>
    //               <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
    //                 Halo, {user}
    //               </h1>
    //               <h2 className="text-md text-gray-400">
    //                 Here&#x27;s what&#x27;s happening with your account today.
    //               </h2>
    //               <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
    //                 <div className="flex items-center w-full md:w-1/2 space-x-4">
    //                   <div className="w-1/2">
    //                     <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
    //                       <p className="text-2xl text-black dark:text-white font-bold">
    //                         01-01-2022
    //                       </p>
    //                       <p className="text-gray-400 text-sm">
    //                         Tanggal Hari Ini
    //                       </p>
    //                     </div>
    //                   </div>
    //                   <div className="w-1/2">
    //                     <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
    //                       <p className="text-2xl text-red-500 dark:text-white font-bold">
    //                         Belum Ada Laporan
    //                       </p>
    //                       <p className="text-gray-400 text-sm">
    //                         Status Laporan Hari Ini
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="flex items-center space-x-4">
    //                 <button className="flex items-center text-gray-400 text-md border-gray-300 border px-4 py-2 rounded-tl-sm rounded-bl-full rounded-r-full">
    //                   <svg width="20" height="20" fill="currentColor" className="mr-2 text-gray-400" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z">
    //                     </path>
    //                   </svg>
    //                   Last month
    //                   <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
    //                     </path>
    //                   </svg>
    //                 </button>
    //                 <span className="text-sm text-gray-400">
    //                   Compared to oct 1- otc 30, 2020
    //                 </span>
    //               </div>
    //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
    //                 {laporans.map((el) => (
    //                   <div className="w-full" key={el._id}>
    //                     <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
    //                       <a href="#" className="w-full block h-full">
    //                         <img alt="blog photo" src="https://picsum.photos/200" className="max-h-40 w-full object-cover" />
    //                         <div className="bg-white dark:bg-gray-800 w-full p-4">
    //                           <p className="text-indigo-500 text-md font-medium">
    //                             {el.createdAt}
    //                           </p>
    //                           <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
    //                             {el.catatan}
    //                           </p>
    //                           <p className="text-gray-400 dark:text-gray-300 font-light text-md">
    //                             {el.luaran}
    //                           </p>
    //                         </div>
    //                       </a>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           )}
    //           {sidebar === 'laporanHarian' && (
    //             <form className="flex w-full max-w-sm space-x-3">
    //               <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
    //                 <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
    //                   Contact us !
    //                 </div>
    //                 <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
    //                   <div className="col-span-2 lg:col-span-1">
    //                     <div className=" relative ">
    //                       <input type="text" id="contact-form-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name" />
    //                     </div>
    //                   </div>
    //                   <div className="col-span-2 lg:col-span-1">
    //                     <div className=" relative ">
    //                       <input type="text" id="contact-form-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email" />
    //                     </div>
    //                   </div>
    //                   <div className="col-span-2">
    //                     <label className="text-gray-700" for="name">
    //                       <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your comment" name="comment" rows="5" cols="40">
    //                       </textarea>
    //                     </label>
    //                   </div>
    //                   <div className="col-span-2 text-right">
    //                     <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
    //                       Send
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </form>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </>
  )
}