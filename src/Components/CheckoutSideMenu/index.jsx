import{XMarkIcon} from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
const CheckoutSideMenu=()=>{
    const context = useContext(ShoppingCartContext)
    console.log('Cart', context.cartProducts)
    
    const handleDelete = (id) =>{
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
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
            <div className='px-6 overflow-y-auto'>
            {
                context.cartProducts.map(product =>(
                    <OrderCard 
                    key={product.id}
                    id={product.id}
                    title ={product.title}
                    imageUrl="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    price={product.price}
                    handleDelete={handleDelete}
                    />

                    ))
            }
            </div>
            

           
        </aside>
    )
}
export default CheckoutSideMenu