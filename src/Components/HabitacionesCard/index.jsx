import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"


export default function HabitacionesCard(props) {
    const { capacidad,  imagen_hab, precio}= props.props
    const {nombrehabitacion}=props.props.tipoHabitacion
    const context = useContext(ShoppingCartContext)
    const handleReservar = () => {
        context.openPagoHabitacionModal(props)
    }
    const showProduct= (productDetail)=>{
        
        context.openProductDetail()
        context.setProductToShow(productDetail)
        context.closeCheckoutSideMenu()
    }
    console.log(props.props)


  return (
        
        <figure className="bg-gray-300  flex w-1/3 h-44 justify-center items-center rounded-lg gap-4 m-3">
        <div className="m-2 h-3/4">
            <p className="">
                <h2 className="font-bold text-2xl ">{nombrehabitacion}</h2>
                <span className="font-light text-lg">{capacidad} </span>
                <br />
                <span className="font-bold text-lg">${precio} </span>
            </p>
            <div className="">
            <button className="bg-lime-500  rounded-lg w-20 h-10 text-white hover:" onClick={handleReservar}>Reservar</button>
            <button className="bg-emerald-600 m-2 rounded-lg w-20 h-10 text-white" onClick={()=> showProduct(props.props)}>Detalles</button>
            </div>
            </div>
            <img  className= "w-40 h-32 object-cover rounded-lg"  src={imagen_hab} alt="Holi" />
           
        </figure>
        
   
    )
}
