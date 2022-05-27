import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";

export default function () {
  const navigate = useNavigate()

  const nim = Number(sessionStorage.getItem("nim"))

  const [laporans, setLaporans] = useState([])

  useEffect(() => {
    if (!sessionStorage.getItem("nim") && !sessionStorage.getItem("nama")) {
      navigate('/login')
    }

    axios.get('http://127.0.0.1:5000/api/laporan')
      .then((res) => {
        const newLaporans = res.data.filter((el) => {
          return el.nim == nim
        })
        setLaporans(newLaporans)
      })
  }, [])

  const debuger = () => {
    console.log(laporans)
  }
  return (
    <>
      <Navbar />
      <button onClick={debuger}>debug</button>
      <div className="flex justify-center font-light p-4 pb-24">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <table className="table p-4 bg-white shadow rounded-lg min-w-full">
            <thead>
              <tr>
                <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Tanggal</th>
                <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Catatan</th>
                <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Luaran</th>
                <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
              {laporans.map((el) => {
                return (
                  <tr key={el._id}>
                    <td className="border p-4 dark:border-dark-5 text-center">{el.createdAt.split('T')[0]}</td>
                    <td className="border p-4 dark:border-dark-5 text-center">{el.catatan}</td>
                    <td className="border p-4 dark:border-dark-5 text-center">{el.luaran}</td>
                    <td className="border p-4 dark:border-dark-5 text-center">
                      <img src={el.dokumentasi} alt={el.dokumentasi} className="w-[50px] h-[50px] object-cover" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}