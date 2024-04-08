import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"


export default function HabitacionesCard(props) {
    const {  capacidad, cant_camas,  imagen_hab}= props.props
    const {nombrehabitacion}=props.props.tipoHabitacion
    const context = useContext(ShoppingCartContext)
    



  return (
        <figure className="bg-gray-300  flex w-1/3 h-44 justify-center items-center rounded-lg gap-4 m-3">
        <div className="m-2 h-3/4">
            <p className="f">
                <h2 className="font-bold text-2xl ">{nombrehabitacion}</h2>
                <span className="font-light text-lg">{capacidad} </span>
                <br />
                <span className="font-light text-lg">{cant_camas} </span>
            </p>
            <div className="">
            <button className="bg-lime-500  rounded-lg w-20 h-10 text-white hover:">Reservar</button>
            <button className="bg-emerald-600 m-2 rounded-lg w-20 h-10 text-white">Detalles</button>
            </div>
            </div>
            <img  className= "w-40 h-32 object-cover rounded-lg"  src={imagen_hab} alt="Holi" />
        </figure>
   
    )
}
