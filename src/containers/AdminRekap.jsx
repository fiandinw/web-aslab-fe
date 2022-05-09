import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function AdminRekap() {
  const navigate = useNavigate()

  // const [akuns, setAkuns] = useState([])
  const [asistenAktif, setAsistenAktif] = useState([])
  const [laporans, setLaporans] = useState([])
  const [filteredLaporans, setFilteredLaporans] = useState([])
  const [filterState, setFilterState] = useState({
    asisten: '#',
    bulan:'#',
    tahun:'#'
  })

  useEffect(() => {
    if (!laporans[0]) {
      axios.get('http://127.0.0.1:5000/api/laporan')
        .then((res) => {
          setLaporans(res.data)
          axios.get('http://127.0.0.1:5000/api/asisten')
            .then((res) => {
              // setAkuns(res.data)
              setAsistenAktif(res.data.filter((asisten) => asisten.statusAsisten == true))
            })
        })
    }

  }, [])

  const filterLaporan = (nim, bulan, tahun) => {
    setFilteredLaporans(laporans.filter((laporan) => laporan.nim == nim))
  }

  const handleGotoKembali = () => {
    //console.log(asistenAktif)
    navigate('/admin/dashboard')
  }

  const handleAsistenFilter = (e) => {
    setFilterState({...filterState, [e.target.id]:e.target.value})
  }

  const handleAsistenSetFilter = () => {
    filterLaporan(filterState.asisten !== '#' ? filterState.asisten : asistenAktif[0].nim, filterState.bulan, filterState.tahun)
  }

  return (
    <>
      <div className="flex items-start justify-center min-h-screen font-light p-4 pb-24 md:px-8 lg:px-36 xl:px-60 2xl:px-72">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="w-full">
            <button onClick={handleGotoKembali} type="button" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-backward" aria-hidden="true"></i> Kembali
            </button>
            <select name="asisten" id="asisten" onChange={handleAsistenFilter}>
                <option value="#" disabled>Pilih Asisten</option>
              {asistenAktif.map((el) => (
                <option key={el.nim} value={el.nim}>{el.nama}</option>
              ))}
            </select>
            <select name="bulan" id="bulan" onChange={handleAsistenFilter}>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <button onClick={handleAsistenSetFilter}>Filter</button>
          </div>
          <div className="">
            <table className="table p-4 bg-white shadow rounded-lg">
              <thead>
                <tr>
                  {/* <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    #
                  </th> */}
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Catatan
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Luaran
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Dokumentasi
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Tanggal Laporan
                  </th>
                </tr>
              </thead>
              <tbody>
                {!filteredLaporans[0] && <tr>
                  <td colSpan={4}>Pilih Filter</td>
                </tr>}
                {filteredLaporans.map((el) => (
                  <tr key={el._id} className="text-gray-700">
                    {/* <td className="border p-4 dark:border-dark-5">
                      {el._id}
                    </td> */}
                    <td className="border p-4 dark:border-dark-5">
                      {el.catatan}
                    </td>
                    <td className="border p-4 dark:border-dark-5">
                      {el.luaran}
                    </td>
                    <td className="border p-4 dark:border-dark-5">
                      {el.dokumentasi}
                    </td>
                    <td className="border p-4 dark:border-dark-5">
                      {el.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminRekap