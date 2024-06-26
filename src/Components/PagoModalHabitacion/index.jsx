import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import CreditCard from "../CreditCard";


export default function PagoModalHabitacion() {
    const context = useContext(ShoppingCartContext);
    const datosHabitacion = context.roomToBuy
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [mes, setMes] = useState('');
    const [año, setAño] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
   

    const validarFormulario = () => {
        // Limpiar el error previo
        setError('');

        // Validaciones básicas
        if (!nombre.trim()) {
            setError('El nombre en la tarjeta es requerido');
            return false;
        }
        if (!numero.trim() || numero.length !== 16 || !numero.match(/^[0-9]+$/)) {
            setError('El número de tarjeta debe contener 16 dígitos numéricos');
            return false;
        }
        if (!mes.trim() || mes < 1 || mes > 12) {
            setError('El mes de expiración no es válido');
            return false;
        }
        if (!año.trim() || año.length !== 2 || !año.match(/^[0-9]+$/)) {
            setError('El año de expiración debe ser los últimos 2 dígitos');
            return false;
        }
        if (!cvv.trim() || cvv.length !== 3 || !cvv.match(/^[0-9]+$/)) {
            setError('El CVV debe contener 3 dígitos');
            return false;
        }

        // Si todas las validaciones pasan
        return true;
    };

    const realizarPago = () => {
      if(validarFormulario()) {
          console.log('Realizando pago...');
  
          // Extracción del usuario y token del localStorage
          const actualUser = JSON.parse(localStorage.getItem('actualUser'));
          const token = actualUser?.token;
          const usuarioId = actualUser?.usuario?.id;
  
          // Preparación de los datos para la reserva basado en datosHabitacion y otros datos necesarios
          const data = {
              fecha_entrada: datosHabitacion.selectedDate,
              fecha_salida: datosHabitacion.endDate,
              total: datosHabitacion.props.precio, // Asumiendo que este es el total por ahora
              total_productos: 1, // Asumir por ahora, ajustar según tu lógica de negocio
              fecha_compra: new Date().toISOString(), // Fecha actual en formato ISO
              usuarioId: usuarioId,
              elementoIds: [], // Asumir vacío por ahora, ajustar según tu lógica de negocio
              habitacionIds: [datosHabitacion.props.id_habitacion]
          };
  
          realizarPost(data, token);
  
          // Limpiar los campos del formulario después del pago
          setNombre('');
          setNumero('');
          setMes('');
          setAño('');
          setCvv('');
          window.location.href = '/my-orders/last';
          context.closePagoHabitacionModal();
        
      }
    
  
  };
  const realizarPost = async (data, token) => {
    const url = 'http://localhost:8080/api/reserva/crear/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Asegúrate de incluir el token en la cabecera de autorización
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al realizar la reserva');
        }

        const responseData = await response.json();
        console.log('Reserva realizada con éxito:', responseData);
        // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje al usuario
        
    } catch (error) {
        console.error('Error en la petición POST:', error);
        // Manejar el error, como mostrar un mensaje al usuario
    }
};

  return (
    <>
     
        <div className={context.isPagoModalOpen? "flex" : "hidden"}>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none`}
          >
            <div className="relative w-auto my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  rounded-t">
                  <h3 className="text-3xl font-semibold">
                  <div>
                        <span className="mr-2">Pago</span>
                        <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
                        <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
                        <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
                    </div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => context.closePagoModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div>
           
          
          <section className="flex w-11/12 h-1/3 mt-5  ">
              <div className="flex justify-center items-center p-10 h-4/4">
              <CreditCard nombre={nombre} numero={numero} mes={mes} año={año} cvv={cvv} />
              </div>
              
              <div className="">
            
          <form className="w-full max-w-lg ">
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full  px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
          Nombre
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jonh Doe"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
        />
        <p className="text-red-500 text-xs italic"></p>
      </div>
      
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Numero de tarjeta
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="textarea" placeholder="0000 0000 0000 0000"
        value={numero}
        onChange={(event) => setNumero(event.target.value)}
        />
        <p className="text-gray-600 text-xs italic"></p>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
         Mes
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="5"
        value={mes}
        onChange={(event) => setMes(event.target.value)}
        />
      </div>
      
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
          Año
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="30"
        value={año}
        onChange={(event) => setAño(event.target.value)}
        />
      </div>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
          CVV
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="password" placeholder="***"
        value={cvv}
        onChange={(event) => setCvv(event.target.value)}
        />
      </div>
      
    </div>
  
  </form>
  {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
   </section>
  
                </div>
               
        
                {/*footer*/}
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => context.closePagoHabitacionModal()}
                  >
                    Cerrar
                  </button>

                  
                  <button
                    className="bg-lime-500 text-white hover:bg-lime-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={realizarPago}
                  >
                    Realizar pago
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
     
    </>
  );
}
