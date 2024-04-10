import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"

const Navbar =() => {
    const activeStyle = 'underline underline-offset-4'
    const context = useContext(ShoppingCartContext)
    const openCheckoutSideMenu = () =>{
        context.openCheckoutSideMenu()
    }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-lime-800'>
        <ul className='flex items-center gap-3 text-slate-200 font-medium'>
            <li className='font-semibold text-lg'>
                <NavLink to='/home'>
                <img className="h-7" src="../../../public/logosinfondo.png" alt="" />
                </NavLink>

            </li>
            <li>
                <NavLink to='/home' className = {({isActive}) => isActive ? activeStyle : undefined}>
                    Inicio
                </NavLink>
            </li>

           
            <li>
                <NavLink to='/servicios'className = {({isActive}) => isActive ? activeStyle : undefined}>
                    Servicios
                </NavLink>
            </li>
            <li>
                <NavLink to={'/admin/users'} className={({isActive}) => isActive ? activeStyle: undefined}>
                    Usuarios
                </NavLink>
            </li>
            <li>
            <NavLink to={'/admin/habitaciones'} className={({isActive}) => isActive ? activeStyle: undefined}>
                    Habitaciones
                </NavLink>

            </li>
            <li>
                <NavLink to={'/admin/habitaciones-form'} className={({isActive}) => isActive ? activeStyle: undefined}>
                    Crear habitaciones
                </NavLink>
            </li>
            <li>
                <NavLink to={'/admin/users-form'} className={({isActive}) => isActive ? activeStyle: undefined}>
                    Crear usuario
                </NavLink>
            </li>
            
            
          

        </ul>
        <ul className="flex items-center gap-3 text-slate-200">
            <li className="text-slate-200/60">
                correo@correo.com
            </li>
            <li>
                <NavLink to='/my-orders' className = {({isActive}) => isActive ? activeStyle : undefined}>
                    Mis Ordenes
                </NavLink>
            </li>
          
            <li>
                <NavLink to='/' className = {({isActive}) => isActive ? activeStyle : undefined}>
                    Iniciar Sesión
                </NavLink>
            </li>
            <li className="flex items-center gap-1" onClick={()=>{openCheckoutSideMenu()}}>
                <ShoppingBagIcon className="h-6 w-6 text-white"/>
                <div className="font-semibold">{context.count}</div>
            </li>
        </ul>
    </nav>
  )


}
export default Navbar

