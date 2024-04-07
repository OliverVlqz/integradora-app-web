import axios from 'axios';
import HabitacionesTableRow from '../../../Components/HabitacionTableRow'
import Layout from '../../../Components/Layout'
import { useEffect, useState } from 'react';


export default function HabitacionesInfo() {
   const [datosHabitaciones, setDatosHabitaciones] = useState([]);


  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const actualUser = localStorage.getItem('actualUser');
        if (!actualUser) {
          console.error('Datos de usuario no encontrados en localStorage.');
          return;
        }
        const token = JSON.parse(actualUser).token;

        const response = await axios.get('http://localhost:8080/api/habitacion/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.status === 'OK' && response.data.data) {
          setDatosHabitaciones(response.data.data);
        }
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchData();
  }, []);
console.log(datosHabitaciones)

  return (
    <Layout>
  <h1 className='text-lg font-bold '>Habitaciones</h1>
    <section className="container mx-auto p-6 ">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-lime-100 uppercase border-b border-gray-600">
                        <th className="px-4 py-3">Numero de habitacion</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Estatus</th>
                        <th className="px-4 py-3">Acciones</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white">
                {datosHabitaciones.map((habitacion) => (
                  <HabitacionesTableRow key={habitacion.id_habitacion} props={habitacion} />
                ))}
              </tbody>
                </table>
            </div>
    </div>

</section>
 
</Layout>
  )
}
