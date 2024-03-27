import { useContext } from 'react'
import Layout from '../../../Components/Layout'
import UserTableRow from '../../../Components/UserTableRow'
import UsuariosModal from '../../../Components/UsuariosModal'
import { ShoppingCartContext } from '../../../Context'


export default function UsuariosInfo() {
  const context = useContext(ShoppingCartContext)
  const {datosUsuarios} = context
  return (
<Layout>
  <h1 className='text-lg font-bold '>Usuarios</h1>
<section className="container mx-auto p-6 ">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-blue-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3">Estatus</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white">
        {
          datosUsuarios.map((usuario) => (
          <UserTableRow key={usuario.id} props={usuario}/>
          ))
        }

        </tbody>
      </table>
    </div>
  </div>
</section>
<UsuariosModal/>
</Layout>
  )
}
