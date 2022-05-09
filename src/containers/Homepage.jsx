import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function () {
  let navigate = useNavigate()

  useEffect(() => {
    if(true){
      navigate('/login')
    }
  })

  const handleLoginAsisten = () => {
    navigate('/login')
  }

  return (
    <>

      {/* <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <img src="https://wartaparahyangan.com/wp-content/uploads/2021/01/KAMPUS-UPI-768x576.jpg" className="absolute h-full w-full object-cover" />
        <div className="inset-0 bg-black opacity-25 absolute">
        </div>
        <header className="absolute top-0 left-0 right-0 z-20">
          <nav className="container mx-auto px-6 md:px-12 py-4">
            <div className="md:flex justify-center items-center">
              <div className="flex justify-between items-center">
                <div className="md:hidden">
                  <button className="text-white focus:outline-none">
                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div className="w-full flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-xl text-center sm:text-6xl text-white leading-tight mt-4 uppercase">
              Asisten Laboratorium Pendidikan Multimedia UPI Cibiru
            </h1>
            <a onClick={handleLoginAsisten} className="block bg-gray-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10 cursor-pointer">
              Login Asisten
            </a>
          </div>
        </div>
      </div> */}

    </>
  )
}