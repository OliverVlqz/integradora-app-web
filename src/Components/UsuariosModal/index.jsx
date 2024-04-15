import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context";

export default function UsuariosModal() {
  const context = useContext(ShoppingCartContext);
  const { userToModify } = context;
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    tipoUsuario: ''
  });

  useEffect(() => {
    // Cuando el usuario a modificar cambie, actualizamos el estado local con esos valores
    if (userToModify) {
      setFormData({
        nombre: userToModify.nombre || '',
        apellidoP: userToModify.apellidoP || '',
        apellidoM: userToModify.apellidoM || '',
        correo: userToModify.correo || '',
        tipoUsuario: userToModify.role?.id_role || ''

      });

    }
  }, [userToModify]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    const token = JSON.parse(localStorage.getItem('actualUser'))?.token;
    const url = `http://localhost:8080/api/usuario/${userToModify.id}`;
    const updatedUser = {
      ...formData,
      id: userToModify.id,
      status: true,
      role: {
        id_role: formData.tipoUsuario
      }
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User updated successfully:', data);
      context.closeUserModal();
      window.location.reload();
    } else {
      console.error('Failed to update user:', response.status);
    }
  console.log(updatedUser)
  };


  return (
    <form>
     
        <div className={context.isUserModalOpen ? "flex" : "hidden"}>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none`}
          >
            <div className="relative w-auto my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modificar usuario
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => context.closeUserModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
               
        <div className="w-full max-w-lg px-8 overflow-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Nombre
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-password" type="text" name="nombre" value={formData.nombre}onChange={handleChange}/>

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Apellido Paterno
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
      id="grid-first-name" type="text"name="apellidoP" value={formData.apellidoP}onChange={handleChange}/>

    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Apellido Materno
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-last-name" type="text" name="apellidoM" value={formData.apellidoM}onChange={handleChange}/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Correo
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-password" type="email" name="correo" value={formData.correo}onChange={handleChange}/>

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-password" type="password" placeholder="******************"/>

    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
   

    <div className="w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        Tipo de Empleado
      </label>
      <div className="relative">
        {
            //coloca el tipo de empleado que tiene el usuario en el select
        }
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         name="tipoUsuario"
         value={formData.tipoUsuario}
         onChange={handleChange}  
        id="grid-state" >
        <option value={1}>Gerente</option>
                          <option value={2}>Recepcionista</option>
               <option value={3}>Cliente</option>
                        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    
  </div>
  
 
</div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => context.closeUserModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-lime-500 text-white hover:bg-lime-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
     
    </form  >
  );
}