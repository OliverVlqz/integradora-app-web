
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import{XMarkIcon} from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import {totalPrice} from '../../utils'
const CheckoutSideMenu=()=>{
    const context = useContext(ShoppingCartContext)

    
    const handleDelete = (id) =>{
        context.setCount(context.count - 1)
        const filteredProducts = context.cartProducts.filter(product => product.id_producto != id)
        context.setCartProducts(filteredProducts)
    }
    const handleCheckout = () =>{
        const orderToAdd = {
            date:'01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setCount(0)
        context.closeCheckoutSideMenu()
    }
  
    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed top-20 right-0 
        border bg-white border-black
        rounded-lg w-[360px] h-[calc(100vh-82px)]`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className="font-medium text-xl">My Order</h2>
                <div>
                    <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={()=>context.closeCheckoutSideMenu()}></XMarkIcon>
                </div>

            </div>
            <div className='px-6 overflow-y-auto flex-1'>
            {
                context.cartProducts.map(product =>(
                    <OrderCard 
                    key={product.id_producto}
                    id={product.id_producto}
                    title ={product.nombre_producto}
                    imageUrl={product.imagen_elemento}
                    price={product.precio}
                    handleDelete={handleDelete}
                    />

                    ))
            }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                <button className='w-full bg-black py-3 text-white rounded-lg' onClick={()=> handleCheckout()} >Comprar</button>
                
                </Link>

            </div>
            

           
        </aside>
    )
}
export default CheckoutSideMenu