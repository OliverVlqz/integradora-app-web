
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
export default function UserTableRow(props) {
    const{nombre, rol, status} = props
  return (
    <tr className="text-gray-700">
    <td className="px-4 py-3 border">
      <div className="flex items-center text-sm">
        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
          <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
        </div>
        <div>
          <p className="font-semibold text-black">{nombre}</p>
          <p className="text-xs text-gray-600">Developer</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-3 text-ms font-semibold border">{rol}</td>
    <td className="px-4 py-3 text-xs border">
      <span className={`px-2 py-1 font-semibold leading-tight ${status ? 'text-green-700 bg-green-100' :'text-red-700 bg-red-100' } rounded-lg`}> {status ? 'Activo' : 'Inactivo' } </span>
    </td>
    <td className="px-4 py-3 text-sm border ">  
         <button className='bg-yellow-500 rounded-lg mr-2 h-8'>
        <PencilSquareIcon className='h-6 w-12 text-white cursor-pointer'/>
         </button>
         <button className='bg-red-500 rounded-lg h-8'>
        <TrashIcon className='h-6 w-12 text-white cursor-pointer'/>
         </button>
    </td>
  </tr>
  )
}
