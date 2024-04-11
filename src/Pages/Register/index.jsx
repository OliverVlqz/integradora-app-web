import  { useState } from 'react';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Layout from '../../Components/Layout';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de datos
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Por favor, introduce un correo electrónico válido');
      return;
    }
    const userData = {
      correo: formData.email,
      contrasena: formData.password,
      status: true,
      role: {
        id_role: 3
      }
    };

    // Enviar la solicitud POST a la API
    fetch('http://localhost:8080/api/usuario/registro/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.ok) {
          // La solicitud fue exitosa
          console.log('Usuario registrado exitosamente');
         
          // redirige al usuario a la página de inicio de sesión sin recargar la pagina
          window.location.href = '/';          
        } else {
          // La solicitud falló
          console.error('Error al registrar el usuario');
          // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
        }
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
      });
  };
  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  return (
    
        <Layout >
        <div className="grid grid-cols-2">
        <div className="items-start">
          <img src="../../../public/aside.png" alt="" className="h-auto w-96 rounded-lg"/>
        </div>
        <div className="justify-center items-center p-8">
          <div className="justify-center items-center">
            <img src="../../../public/logo.png" alt="" className="h-32  ml-20"/>
          </div>
          <h1 className="text-green-700 text-4xl pb-10 text-center">Regístrate</h1>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="flex rounded-lg cursor-pointer bg-gray-300 h-10 items-center mb-5">
              <UserIcon className="h-6 w-6 text-black ml-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="correo@correo.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent p-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex rounded-lg cursor-pointer bg-gray-300 h-10 items-center mb-5">
              <LockClosedIcon className="h-6 w-6 text-black ml-3" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-transparent p-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex rounded-lg cursor-pointer bg-gray-300 h-10 items-center mb-5">
              <LockClosedIcon className="h-6 w-6 text-black ml-3" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}  
                className="bg-transparent p-2 w-full focus:outline-none"
              />
            </div> 
          <div className="">
          <button type="submit" className="rounded-lg bg-yellow-500 ml-20 mb-6  w-36 h-10 font-bold text-slate-100">Registrar</button>
          </div>
            
          
        </form>
        <div className="flex justify-center">
        <p className="mr-1 text-green-500">¿Ya tienes cuenta?</p>
        <Link to={'/sign-in'} className="text-green-700 font-bold">Inicia Sesion</Link>
        </div>
       
        </div>
        
        </div>
       
      </Layout>
  )
}
