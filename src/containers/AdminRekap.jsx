import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useReactToPrint } from "react-to-print"
import kopSurat from "../kopSurat.png"

function AdminRekap() {
  const navigate = useNavigate()

  const tableRef = useRef()

  // const [akuns, setAkuns] = useState([])
  const [asistenAktif, setAsistenAktif] = useState([])
  const [laporans, setLaporans] = useState([])
  const [filteredLaporans, setFilteredLaporans] = useState([])
  const [filterState, setFilterState] = useState({
    asisten: '#',
    bulan: '#',
    tahun: '#'
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
    setFilteredLaporans(laporans.filter((laporan) => laporan.nim == nim && laporan.createdAt.split('T')[0].split('-')[1] == bulan && laporan.createdAt.split('T')[0].split('-')[0] == tahun))
  }

  const handleGotoKembali = () => {
    //console.log(laporans[0].createdAt.split('T')[0].split('-')[1])
    navigate('/admin/dashboard')
  }

  const handleAsistenFilter = (e) => {
    setFilterState({ ...filterState, [e.target.id]: e.target.value })
  }

  const handleAsistenSetFilter = () => {
    filterLaporan(filterState.asisten !== '#' ? filterState.asisten : asistenAktif[0].nim, filterState.bulan !== '#' ? filterState.bulan : '01', filterState.tahun !== '#' ? filterState.tahun : '2022')
  }

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    bodyClass: "p-12 printArea",
  })

  return (
    <>
      <div className="flex items-start justify-center min-h-screen font-light p-4 pb-24 md:px-8 lg:px-36 xl:px-60 2xl:px-72">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="w-full flex flex-row gap-8">
            <button onClick={handleGotoKembali} type="button" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-backward" aria-hidden="true"></i> Kembali
            </button>
            <select className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="asisten" id="asisten" onChange={handleAsistenFilter}>
              <option value="#" disabled>Pilih Asisten</option>
              {asistenAktif.map((el) => (
                <option key={el.nim} value={el.nim}>{el.nama}</option>
              ))}
            </select>
            <select className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="bulan" id="bulan" onChange={handleAsistenFilter}>
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="03">Maret</option>
              <option value="04">April</option>
              <option value="05">Mei</option>
              <option value="06">Juni</option>
              <option value="07">Juli</option>
              <option value="08">Agustus</option>
              <option value="09">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <select className="block w-fit text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="tahun" id="tahun" onChange={handleAsistenFilter}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
            <button onClick={handleAsistenSetFilter} className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Cari Data</button>
            <button onClick={handlePrint} className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "><i className="fa fa-print fa-lg " aria-hidden="true"></i> Cetak</button>
          </div>
          <div ref={tableRef} className="w-full">
            <div className="hidden">
              <div>
                <img src={kopSurat} alt="kop surat" />
              </div>
              <div>Nama Asisten : {filterState.asisten}</div>
              <div>Periode Laporan : {filterState.bulan} - {filterState.tahun}</div>
            </div>
            <table className="table p-4 bg-white shadow rounded-lg min-w-full font-serif">
              <thead>
                <tr>
                  {/* <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    #
                  </th> */}
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    No.
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Tanggal Laporan
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Catatan
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Luaran
                  </th>
                  <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                    Dokumentasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {!filteredLaporans[0] && <tr>
                  <td colSpan={4}>Tidak Ada Data Laporan</td>
                </tr>}
                {filteredLaporans.map((el, idx) => (
                  <tr key={el._id} className="text-gray-700">
                    {/* <td className="border p-4 dark:border-dark-5">
                      {el._id}
                    </td> */}
                    <td className="border p-4 dark:border-dark-5 text-center">
                      {idx + 1}
                    </td>
                    <td className="border p-4 dark:border-dark-5 text-center">
                      {el.createdAt.split("T")[0]}
                    </td>
                    <td className="border p-4 dark:border-dark-5 text-center">
                      {el.catatan}
                    </td>
                    <td className="border p-4 dark:border-dark-5 text-center">
                      {el.luaran}
                    </td>
                    <td className="border p-4 dark:border-dark-5 text-center">
                      <img src={el.dokumentasi} alt={el.dokumentasi} className="w-[50px] h-[50px] object-cover" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="hidden w-full font-serif">
              <div className="flex flex-row justify-between">
                <div></div>
                <div>
                  <div className="mt-8">Mengetahui,</div>
                  <div className="mb-24">Kepala Laboratorium</div>
                  <div>Feri H. Firmansyah, M.MT</div>
                  <div>NIP. 920190219910706101</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminRekap