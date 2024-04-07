import { useState } from "react";
import CreditCard from "../../../Components/CreditCard";
import Layout from "../../../Components/Layout";

export default function Cobro() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [mes, setMes] = useState('');
  const [año, setAño] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <Layout> 
        <h1 className="font-bold text-2xl">Cobro</h1>
          
        <section className="flex w-9/12 h-1/3 mt-20 ">
            <div className="flex justify-center items-center w-2/4 h-4/4">
            <CreditCard nombre={nombre} numero={numero} mes={mes} año={año} cvv={cvv} />
            </div>
            
            <div className="">
          
        <form className="w-full max-w-lg">
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
<button className="bg-lime-900 hover:bg-lime-600 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
    Realizar pago
</button>
</form>
</div>
 </section>

    </Layout>
  )
}
