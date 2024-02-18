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


const AppRoutes = () => {
  let routes = useRoutes([
    {path:'/',element:<Home/>},
    {path:'/my-account',element:<MyAccount/>},
    {path:'/my-order',element:<MyOrder/>},
    {path:'/my-orders',element:<MyOrders/>},
    {path:'/my-orders/last',element:<MyOrder/>},
    {path:'/sign-in',element:<SignIn/>},
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
      </BrowserRouter>
    </ShoppingCartProvider>
    )}

export default App
