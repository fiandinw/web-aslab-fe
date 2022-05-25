import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import swal from 'sweetalert'
import qs from 'qs'
import Navbar from "../components/Navbar"

export default function () {
  const navigate = useNavigate()

  const d = new Date()
  const hariIni = d.toISOString().split('T')[0]

  const [imageSelected, setImageSelected] = useState("")

  const [laporans, setLaporans] = useState([])

  const [laporan, setLaporan] = useState({
    nim: Number(sessionStorage.getItem("nim")),
    catatan: '',
    luaran: '',
    dokumentasi: ''
  })

  useEffect(() => {
    if (!sessionStorage.getItem("nim") && !sessionStorage.getItem("nama")) {
      navigate('/login')
    }

    axios.get('http://127.0.0.1:5000/api/laporan')
      .then((res) => {
        const newLaporans = res.data.filter((el) => {
          return el.nim == laporan.nim && el.createdAt.split('T')[0] == hariIni
        })
        if (newLaporans[0]) {
          setLaporans(newLaporans[0])
          setLaporan({
            ...laporan,
            catatan: newLaporans[0].catatan,
            luaran: newLaporans[0].luaran,
            dokumentasi: newLaporans[0].dokumentasi
          })
        }
      })
  }, [])

  const handleChange = (e) => {
    setLaporan({ ...laporan, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "krvjtctc")
    if (!laporans._id) {
      axios.post("https://api.cloudinary.com/v1_1/fiandinw/image/upload", formData)
        .then((res) => {
          console.log("sukses", res)
          axios(
            {
              method: 'POST',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: qs.stringify({...laporan, dokumentasi: res.data.secure_url}),
              url: 'http://127.0.0.1:5000/api/laporan'
            }
          ).then(() => {
            console.log("Sukses")
            swal(`Berhasil`, `Laporan berhasil dibuat`, "success").then(() => {
              navigate('/dashboard')
            })
          }).catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios.post("https://api.cloudinary.com/v1_1/fiandinw/image/upload", formData)
        .then((res) => {
          console.log("sukses", res.data.secure_url)
          axios(
            {
              method: 'PUT',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: qs.stringify({...laporan, dokumentasi: res.data.secure_url}),
              url: `http://127.0.0.1:5000/api/laporan/${laporans._id}`
            }
          ).then(() => {
            console.log("Sukses")
            swal(`Berhasil`, `Laporan berhasil diubah`, "success").then(() => {
              navigate('/dashboard')
            })
          }).catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
      // axios(
      //   {
      //     method: 'PUT',
      //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //     data: qs.stringify(laporan),
      //     url: `http://127.0.0.1:5000/api/laporan/${laporans._id}`
      //   }
      // ).then(() => {
      //   console.log("Sukses")
      //   swal(`Berhasil`, `Laporan berhasil diubah`, "success").then(() => {
      //     navigate('/dashboard')
      //   })
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  }

  const handleGotoKembali = () => {
    navigate('/dashboard')
    //console.log(imageSelected)
  }

  const handleFile = (e) => {
    setImageSelected(e.target.files[0])
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center font-light p-4 pb-24 md:px-8 lg:px-36">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="w-full">
            <button onClick={handleGotoKembali} type="button" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-backward" aria-hidden="true"></i> Kembali
            </button>
          </div>
          <div className="w-full text-2xl font-medium">Lapor Kegiatan Harian</div>
          <div className="w-full">Tanggal {hariIni}</div>
          <hr className="border-[1px] border-slate-200 w-full" />
          <form onSubmit={handleSubmit} className="w-full">

            <div>
              <div>Catatan Harian</div>
              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" name="checked-demo" className="form-tick appearance-none bg-white bg-check h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none" />
                  <span className="text-gray-700 dark:text-white font-light">
                    Piket
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" name="checked-demo" className="form-tick appearance-none bg-white bg-check h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none" />
                  <span className="text-gray-700 dark:text-white font-light">
                    Mengawas
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" name="checked-demo" className="form-tick appearance-none bg-white bg-check h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none" />
                  <span className="text-gray-700 dark:text-white font-light">
                    Mengajar
                  </span>
                </label>
              </div>
            </div>

            <div>
              <div>Catatan Tambahan</div>
              <label className="text-gray-700" htmlFor="name">
                <textarea onChange={handleChange} value={laporan.catatan} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" id="catatan" placeholder="Tulis catatan tambahan" name="catatan" rows="5" cols="40">
                </textarea>
              </label>
            </div>

            <div>
              <div>Luaran Kegiatan</div>
              <label className="text-gray-700" htmlFor="name">
                <textarea onChange={handleChange} value={laporan.luaran} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" id="luaran" placeholder="Tulis luaran kegiatan" name="luaran" rows="5" cols="40">
                </textarea>
              </label>
            </div>

            <div>
              <div>{laporan.dokumentasi ? "Ubah" : "Tambah"} Dokumentasi Kegiatan</div>
              {laporan.dokumentasi && (<div className="p-4"><img src={laporan.dokumentasi} alt={laporan.dokumentasi} className="w-[50px] h-[50px] object-cover"/></div>)}
              {/* <button onClick={showUploadWidget} type="button" className="w-fit py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                  </path>
                </svg>
                Upload
              </button> */}
              <div className="border-2 w-fit p-4">
                <input onChange={handleFile} type="file" name="dokumentasi" id="dokumentasi" accept=".jpg,.png,.gif" />
              </div>
            </div>

            <div className="w-full mt-8">
              <button type="submit" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Simpan Laporan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}