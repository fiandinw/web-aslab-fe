import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import qs from 'qs'

function AdminAkun() {
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)
  const [akuns, setAkuns] = useState([])
  const [inputs, setInputs] = useState({
    nim: '',
    password: '',
    nama: '',
    email: '',
    statusAsisten: false,
  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    getAkun()
  }, [])

  const getAkun = () => {
    axios.get('http://127.0.0.1:5000/api/asisten')
      .then((res) => {
        setAkuns(res.data)
      })
  }

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  const handleToggleModal = () => {
    setModal(!modal)
    if (modal) {
      setInputs({
        nim: '',
        password: '',
        nama: '',
        email: '',
        statusAsisten: false,
      })
      setIsEdit(false)
    }
  }

  const handleEdit = (akun) => {
    handleToggleModal()
    setInputs({
      nim: akun.nim,
      password: akun.password,
      nama: akun.nama,
      email: akun.email,
      statusAsisten: akun.statusAsisten,
    })
    setIsEdit(akun._id)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(inputs, isEdit)
    if(!isEdit){
      console.log('post')
      axios(
        {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(inputs),
          url: 'http://127.0.0.1:5000/api/asisten'
        }
      ).then(() => {
        console.log("Sukses")
        handleToggleModal()
        getAkun()
      }).catch((err) => {
        console.log(err)
      })
    }else{
      console.log('put')
      axios(
        {
          method: 'PUT',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(inputs),
          url: `http://127.0.0.1:5000/api/asisten/${isEdit}`
        }
      ).then(() => {
        console.log("Sukses")
        handleToggleModal()
        getAkun()
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://127.0.0.1:5000/api/asisten/${id}`)
    .then(() => {
      console.log("Sukses")
      getAkun()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleGotoKembali = () => {
    navigate('/admin/dashboard')
  }


  return (
    <>
      <div className="flex items-start justify-center min-h-screen font-light p-4 pb-24 md:px-8 lg:px-36 xl:px-60 2xl:px-72">
        <div className="bg-white w-full rounded-lg px-4 py-8 flex flex-col items-center gap-2">
          <div className="w-full">
            <button onClick={handleGotoKembali} type="button" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-backward" aria-hidden="true"></i> Kembali
            </button>
          </div>
          <div>
            <h1 className="text-lg">Kelola Akun Asisten Laboratorium</h1>
          </div>
          <div className="container mx-auto px-4 sm:px-8 w-full">
            <div className="py-0">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                          Asisten
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                          Nim
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                          Email
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                          Status Asisten
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                          Kelola
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {akuns.map((akun) => (
                        <tr key={akun._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {akun.nama}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {akun.nim}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {akun.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                              <span aria-hidden="true" className={`absolute inset-0 ${akun.statusAsisten ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
                              </span>
                              <span className="relative">
                                {akun.statusAsisten ? 'Aktif' : 'Non-Aktif'}
                              </span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex gap-2">
                              <button onClick={() => { handleEdit(akun) }} type="button" className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white w-fit transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Edit
                              </button>
                              <button onClick={() => { handleDelete(akun._id) }} type="button" className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-fit transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleToggleModal} type="button" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Tambah Akun
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed z-50 w-screen h-screen top-0 left-0 bg-slate-900 bg-opacity-50 ${modal ? 'block' : 'hidden'} flex justify-center items-center`}>
        <div className="bg-white rounded-lg px-4 py-8 w-full max-w-md flex flex-col gap-4">
          <div>
            <button onClick={handleToggleModal} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <i className="fa fa-times mr-1" aria-hidden="true"></i>Tutup
            </button>
          </div>
          <div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <label htmlFor="nim" className="text-gray-700">
                  NIM
                </label>
                <input type="number" id="nim" className=" rounded-lg border-transparent flex-1 appearance-none border border-cyan-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" name="nim" placeholder="NIM" required value={inputs.nim} onChange={handleInputs} />
              </div>
              <div className="relative">
                <label htmlFor="password" className="text-gray-700">
                  Password
                </label>
                <input type="text" id="password" className=" rounded-lg border-transparent flex-1 appearance-none border border-cyan-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" name="password" placeholder="Password" required value={inputs.password} onChange={handleInputs} />
              </div>
              <div className="relative">
                <label htmlFor="nama" className="text-gray-700">
                  Nama Lengkap
                </label>
                <input type="text" id="nama" className=" rounded-lg border-transparent flex-1 appearance-none border border-cyan-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" name="nama" placeholder="Nama Lengkap" required value={inputs.nama} onChange={handleInputs} />
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-gray-700">
                  Email
                </label>
                <input type="text" id="email" className=" rounded-lg border-transparent flex-1 appearance-none border border-cyan-700 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" name="email" placeholder="Email" required value={inputs.email} onChange={handleInputs} />
              </div>
              <div className="relative mt-4">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input onChange={() => {setInputs({ ...inputs, statusAsisten: !inputs.statusAsisten })}} checked={inputs.statusAsisten} type="checkbox" name="statusAsisten" id="statusAsisten" className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                    <label htmlFor="statusAsisten" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                    </label>
                  </div>
                  <span className="text-gray-400 font-medium">
                    Status Asisten
                  </span>
              </div>
              <div className="relative mt-4">
                <button type="submit" className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAkun