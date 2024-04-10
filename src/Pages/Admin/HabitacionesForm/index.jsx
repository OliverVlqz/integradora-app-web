import { useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout';

export default function HabitacionesForm() {
  const [habitacionData, setHabitacionData] = useState({
    num_habitacion: '',
    capacidad: '',
    cant_camas: '',
    precio: '', 
    descripcion: '',
    imagen_hab: '', // La imagen se almacenará en base64 aquí
    tipoHabitacion: {
      id_tipohab: '' // Cambiado para coincidir con el formato JSON proporcionado
    },
    estatus:true

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name.includes('.')) {
      const [key, subKey] = name.split('.');
      setHabitacionData(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subKey]: value
        }
      }));
    } else {
      setHabitacionData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHabitacionData(prevState => ({
          ...prevState,
          imagen_hab: reader.result // Guarda la imagen como base64 en el estado
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener el token del localStorage
      const actualUser = JSON.parse(localStorage.getItem('actualUser'));
      const token = actualUser.token;
      
      // Configurar el encabezado de la solicitud con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Asegurándose de que el token se envía correctamente
        }
      };

      // Ajustar habitacionData a la estructura correcta antes de enviar
      const dataToSend = {
        ...habitacionData,
        num_habitacion: parseInt(habitacionData.num_habitacion), // Asegurar que es un número
        precio: parseFloat(habitacionData.precio) // Asegurar que es un número decimal
      };

      // Realizar la solicitud POST con el token en el encabezado
      const response = await axios.post('http://localhost:8080/api/habitacion/crear/', dataToSend, config);
      console.log('Respuesta:', response.data);
      console.log('Habitacion se creo correctamente')
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };
  /// Haz un console log para ver la imagen en base64
  return (
    <Layout> 
      <h1 className='font-bold text-xl m-2'>Agregar Habitaciones</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Numero de habitacion
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="Habitacion"
              name="num_habitacion"
              value={habitacionData.num_habitacion}
              onChange={handleChange}
            />
            <p className="text-red-500 text-xs italic">Rellena este campo</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Precio
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="950"
              name="precio"
              value={habitacionData.precio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Descripcion
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Habitacion con vista al mar"
              name="descripcion"
              value={habitacionData.descripcion}
              onChange={handleChange}
            />
            <p className="text-gray-600 text-xs italic">Agrega una pequeña descripcion de lo que contiene la habitacion</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Cap. Personas
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="5"
              name="capacidad"
              value={habitacionData.capacidad}
              onChange={handleChange}
            />
          </div>
          
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Cantidad de camas
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="2"
              name="cant_camas"
              value={habitacionData.cant_camas}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Tipo
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="tipoHabitacion.id_tipohab"
                value={habitacionData.tipoHabitacion.id_tipohab}
                onChange={handleChange}
              >
                <option value={1}>Normal</option>
                <option value={2}>Premium</option>
                <option value={3}>Residencial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <label htmlFor="uploadFile1"
        className="bg-white text-black text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif] mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000" />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000" />
        </svg>
        Sube tu archivo
        <input type="file" id='uploadFile1' className="hidden" onChange={handleImageChange} />
        <p className="text-xs text-gray-400 mt-2">PNG, JPG, y WEBP son permitidos.</p>
      </label>
      <button className="bg-lime-900 hover:bg-lime-600 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full" type="submit">
          Crear Habitacion
      </button>
      </form>
    </Layout>
  );
}