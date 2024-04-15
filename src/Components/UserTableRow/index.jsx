import  { useContext, useState } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import axios from 'axios'


export default function UserTableRow(props) {

    const{id,nombre, status} = props.props
    const rol = props.props.role.nombre
    const [userStatus, setUserStatus] = useState(status);
    
  
    const context = useContext(ShoppingCartContext)
    const showUserModal = (usuarioMod) => { 
        context.openUserModal()
        context.setUserToModify(usuarioMod)
    }
    const changeStatus = async () => {
      const newStatus = !userStatus; // Invierte el estado actual
      setUserStatus(newStatus); // Actualiza el estado local
  
      try {
        const currentUser = JSON.parse(localStorage.getItem('actualUser'));
        const response = await axios.put(`http://localhost:8080/api/usuario/${id}/changeStatus?status=${newStatus}`, {}, {
          headers: {
            Authorization: `${currentUser.tokenType} ${currentUser.token}` // Usa el token desde localStorage
          }
        });
  
        if (response.status === 200) {
          console.log('Estado actualizado correctamente:', response.data);
        } else {
          console.error('Error al actualizar el estado:', response.data);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setUserStatus(status); // Revertir el estado en caso de error
      }
    }
  
  return (
    <tr className="text-gray-700">
    <td className="px-4 py-3 border">
      <div className="flex items-center text-sm">
        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
          <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
        </div>
        <div>
          <p className="font-semibold text-black">{nombre || 'usuario '}</p>
      
        </div>
      </div>
    </td>
    <td className="px-4 py-3 text-ms font-semibold border">{rol}</td>
    <td className="px-4 py-3 text-xs border">
      <span className={`px-2 py-1 font-semibold leading-tight ${userStatus  ? 'text-green-700 bg-green-100' :'text-red-700 bg-red-100' } rounded-lg`}> {userStatus  ? 'Activo' : 'Inactivo' } </span>
    </td>
    <td className="px-4 py-3 text-sm border ">  

         <button className='bg-yellow-500 rounded-lg mr-2 h-8' onClick={() => showUserModal(props.props) }>
        <PencilSquareIcon className='h-6 w-12 text-white cursor-pointer' />
         </button>
         <button className='bg-red-500 rounded-lg h-8' onClick={changeStatus}>
        <TrashIcon className='h-6 w-12 text-white cursor-pointer'/>
         </button>
    </td>
  </tr>
  )
}
