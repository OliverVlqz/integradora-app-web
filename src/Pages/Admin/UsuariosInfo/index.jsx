import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout';
import UserTableRow from '../../../Components/UserTableRow';
import UsuariosModal from '../../../Components/UsuariosModal';


export default function UsuariosInfo() {
  const [datosUsuarios, setDatosUsuarios] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const actualUser = localStorage.getItem('actualUser');
        if (!actualUser) {
          console.error('Datos de usuario no encontrados en localStorage.');
          return;
        }
        const token = JSON.parse(actualUser).token;

        const response = await axios.get('http://localhost:8080/api/usuario/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.status === 'OK' && response.data.data) {
          setDatosUsuarios(response.data.data);
        }
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchData();
  }, []);

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
                {datosUsuarios.map((usuario) => (
                  <UserTableRow key={usuario.id_usuario} props={usuario} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <UsuariosModal />
    </Layout>
  );
}
