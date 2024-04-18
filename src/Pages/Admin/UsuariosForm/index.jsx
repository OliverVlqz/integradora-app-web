import { useState } from 'react';
import axios from 'axios';
import Layout from '../../../Components/Layout';

export default function UsuariosForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    contrasena: '',
    role: '3'  // Default role id, assuming it's Gerente
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        return false;
      }
    }
    // Additional validation logic here, e.g., email format, password strength, etc.
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Todos los campos son obligatorios y deben cumplir con los formatos adecuados.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const actualUser = JSON.parse(localStorage.getItem('actualUser'));
      const token = actualUser.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const dataToSend = {
        ...formData,
        role: {
          id_role: parseInt(formData.role)
        },
        status: true  // Assuming all users are active by default
      };

      const response = await axios.post('http://api5a-back-env.eba-kknjdvq2.us-east-1.elasticbeanstalk.com/api/usuario/registro/', dataToSend, config);
      console.log('Usuario creado con éxito:', response.data);
      // Redirect or clear form here based on your requirements
      window.location.href = '/admin/users';
    } catch (error) {
      setError('Error al crear el usuario. Por favor, intente de nuevo.');
      console.error('Error en la solicitud:', error);
    }
  };
  return(
    <Layout>
        <h1 className="font-bold text-xl m-2 ">Crear un Usuario</h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Nombre
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"
       placeholder="Jane" name='nombre' onChange={handleChange}/>

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Apellido Paterno
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
       type="text" placeholder="Doe" name='apellidoP' onChange={handleChange}/>
    
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Apellido Materno
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
      leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-last-name" type="text" placeholder="Does" name='apellidoM' onChange={handleChange}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Correo
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border
       border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
       id="grid-password" type="email" placeholder="correo@correo.com" name="correo" onChange={handleChange}/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as youd like</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-password" type="password" name="contrasena" onChange={handleChange} placeholder="******************"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as youd like</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
   

    <div className="w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Tipo de Empleado
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         id="grid-state" name="role"onChange={handleChange} >
          <option value={1}>Cliente</option>
          <option value={2}>Recepcionista</option>
          <option value={3}>Cliente</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    
  </div>
  {error && <p className="text-red-500">{error}</p>}
  <button className="bg-lime-900 hover:bg-lime-600 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
    Crear Usuario
</button>
</form>
    </Layout>
  )
}
