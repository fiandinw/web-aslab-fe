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
          <table className="w-full">
            <thead>
              <tr>
                <td>Tanggal</td>
                <td>Catatan</td>
                <td>Luaran</td>
                <td>Dokumentasi</td>
              </tr>
            </thead>
            <tbody>
              {laporans.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.createdAt.split('T')[0]}</td>
                    <td>{el.catatan}</td>
                    <td>{el.luaran}</td>
                    <td>{el.dokumentasi}</td>
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