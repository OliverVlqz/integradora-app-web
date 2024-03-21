import Layout from '../../../Components/Layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import UserTableRow from '../../../Components/UserTableRow'
export default function UsuariosInfo() {
  return (
<Layout>
<section className="container mx-auto p-6 ">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-blue-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Rol</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white">
        
          <UserTableRow nombre='Sufyan' rol='Empleado' status={true}/>
          <UserTableRow nombre='Sufyan' rol='Usuario' status={false}/>

        
        </tbody>
      </table>
    </div>
  </div>
</section>
</Layout>
  )
}
