import {useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import './App.css'
import Navbar from '../../Components/Navbar'
import { ShoppingCartProvider } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import Habitaciones from '../Habitaciones'
import Servicios from '../Servicios'
import UsuariosInfo from '../Admin/UsuariosInfo'
import HabitacionesForm from '../Admin/HabitacionesForm'
import UsuariosForm from '../Admin/UsuariosForm'
import HabitacionesInfo from '../Admin/HabitacionesInfo'
import Register from '../Register'
import Cobro from '../Empleado/Cobro'
import PagoModal from '../../Components/PagoModal'

const AppRoutes = () => {
  let routes = useRoutes([
    {path:'/',element:<Home/>},
    {path:'/habitaciones',element:<Habitaciones/>},
    {path:'/servicios',element:<Servicios/>},
    {path:'/my-account',element:<MyAccount/>},
    {path:'/my-order',element:<MyOrder/>},
    {path:'/my-orders',element:<MyOrders/>},
    {path:'/my-orders/last',element:<MyOrder/>},
    {path:'/my-orders/:id',element:<MyOrder/>},
    {path:'/admin/users',element:<UsuariosInfo/>},
    {path:'/admin/habitaciones',element:<HabitacionesInfo/>},
    {path:'/admin/habitaciones-form',element:<HabitacionesForm/>},
    {path:'/admin/users-form',element:<UsuariosForm/>},
    {path:'/empleado/cobro',element:<Cobro/>},
    {path:'/sign-in', element:<SignIn/> },
    {path:'/create-account',element:<Register/>},
    {path:'*',element:<NotFound/>}

  ])
  return routes
}


const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Navbar/>
        <CheckoutSideMenu/>
        <PagoModal/>
      </BrowserRouter>
    </ShoppingCartProvider>
    )}

export default App
