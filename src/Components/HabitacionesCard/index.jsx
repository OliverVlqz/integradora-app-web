

export default function HabitacionesCard() {
  return (

        <figure className="bg-gray-300 border-  -950 flex w-1/3 h-44 justify-center items-center rounded-lg gap-4 m-3">
        <div className="m-2 h-3/4">
            
            <p className="f">
                <h2 className="font-bold text-3xl">Sencilla</h2>
                <span className="font-light text-lg">2 Personas</span>
                <br />
                <span className="font-light text-lg">1 Cama</span>
            </p>
            <div className="">
            <button className="bg-lime-500  rounded-lg w-20 h-10 text-white hover:">Reservar</button>
            <button className="bg-emerald-600 m-2 rounded-lg w-20 h-10 text-white">Detalles</button>
            </div>
        

            </div>
            <img  className= "max-w-60" src="../../public/HabitacionEjemplo.png" alt="" />
        </figure>
   
    )
}
