import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";


function SignIn() {
  return (
      <Layout >
        <div className="grid grid-cols-2">
        <div className="items-start">
          <img src="../../../public/aside.png" alt="" className="h-auto w-96 rounded-lg"/>
        </div>
        <div className="justify-center items-center p-8">
          <div className="justify-center items-center">
            <img src="/logo.png" alt="" className="h-32  ml-20"/>
          </div>
        <h1 className="text-green-700 text-4xl pb-10 text-center">Iniciar Sesion</h1>
        <form>
          <div className="flex rounded-lg cursor-pointer bg-gray-300 h-10 items-center mb-5">
            <UserIcon className='h-6 w-6 text-black ml-3'/>
            <input type="email" id="email" name="email" placeholder="correo@correo.com" className="bg-transparent p-2 w-full focus:outline-none"/>
          </div>
          <div className="flex rounded-lg cursor-pointer bg-gray-300 h-10 items-center mb-5">
            <LockClosedIcon className='h-6 w-6 text-black ml-3'/>
            <input type="password" id="password" name="password" placeholder="contraseña" className="bg-transparent p-2 w-full focus:outline-none"/>
          </div>  
          <div className="">
          <button type="submit" className="rounded-lg bg-yellow-500 ml-20 mb-6  w-36 h-10 font-bold text-slate-100">Iniciar Sesion</button>
          </div>
            
          
        </form>
        <div className="flex justify-center">
        <p className="mr-1 text-green-500">¿No tienes cuenta?</p>
        <Link to={'/create-account'} className="text-green-700 font-bold">Registrate</Link>
        </div>
       
        </div>
        
        </div>
       
      </Layout>
    )
  }
  export default SignIn
  