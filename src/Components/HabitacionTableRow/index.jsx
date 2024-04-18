import { TrashIcon } from "@heroicons/react/20/solid"

export default function HabitacionesTableRow(props) {
    const { id_habitacion, num_habitacion, capacidad, descripcion, estatus, imagen_hab } = props.props;
    console.log(props.props);

    const changeStatus = async () => {
        const currentStatus = !estatus; // Cambiar el estatus al opuesto
        const url = `http://api5a-back-env.eba-kknjdvq2.us-east-1.elasticbeanstalk.com/api/habitacion/${id_habitacion}/changestatus`;

        // Obtener el token de autenticación desde localStorage
        const user = JSON.parse(localStorage.getItem('actualUser'));
        const token = user ? user.token : null;

        if (!token) {
            alert('No autorizado o sesión expirada');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT', // Usar PATCH ya que solo estás actualizando una parte del recurso
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Asegúrate de enviar el token de autenticación
                },
                body: JSON.stringify({ estatus: currentStatus })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Estatus actualizado correctamente.');
                window.location.reload(); // Recargar la página para ver los cambios
            } else {
                alert(data.message || 'Error al actualizar el estatus.');
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            alert('Error al conectar con el servidor.');
        }
    };

    return (
      <tr className="text-gray-700">
        <td className="px-4 py-3 border">
            <div className="flex items-center text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                    <img className="object-cover w-full h-full rounded-full" src={imagen_hab} alt="" loading="lazy" />
                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <p className="font-semibold text-black">{num_habitacion}</p>
                    <p className="text-xs text-gray-600">{capacidad} personas</p>
                </div>
            </div>
        </td>
        <td className="px-4 py-3 text-ms font-semibold border">{descripcion}</td>
        <td className="px-4 py-3 text-xs border">
            <span className={`px-2 py-1 font-semibold leading-tight ${estatus ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'} rounded-lg`}>
                {estatus ? 'Activo' : 'Inactivo'}
            </span>
        </td>
        <td className="px-4 py-3 text-sm border">  
            <button className='bg-red-500 rounded-lg h-8' onClick={changeStatus}>
                <TrashIcon className='h-6 w-12 text-white cursor-pointer'/>
            </button>
        </td>
      </tr>
    );
}
