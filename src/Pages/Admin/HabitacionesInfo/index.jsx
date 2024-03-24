import { useState } from 'react'
import HabitacionesTableRow from '../../../Components/HabitacionTableRow'
import Layout from '../../../Components/Layout'


export default function HabitacionesInfo() {
    const [openModal, setOpenModal] = useState(false)
    const handleModal = () => {
        setOpenModal(!openModal)
    }
  return (
    <Layout>
  <h1 className='text-lg font-bold '>Habitaciones</h1>
    <section className="container mx-auto p-6 ">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-lime-100 uppercase border-b border-gray-600">
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Estatus</th>
                        <th className="px-4 py-3">Acciones</th>
                        </tr>
                     </thead>
                            <tbody className="bg-white">
        
                                <HabitacionesTableRow nombre='101' personas={5} tipo='Suit' status={true}/>
                                <HabitacionesTableRow nombre='101' personas={4} tipo='Normal' status={false}/>

        
                             </tbody>
                </table>
            </div>
    </div>

</section>
 
</Layout>
  )
}
