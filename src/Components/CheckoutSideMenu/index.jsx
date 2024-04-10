
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
    const handleCheckout = async () => {
        const now = new Date();
        const formattedDate = now.getFullYear() + '-'
        + String(now.getMonth() + 1).padStart(2, '0') + '-'
        + String(now.getDate()).padStart(2, '0') + 'T'
        + String(now.getHours()).padStart(2, '0') + ':'
        + String(now.getMinutes()).padStart(2, '0') + ':'
        + String(now.getSeconds()).padStart(2, '0');
    
        const orderToAdd = {
            date: formattedDate,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        };
    
        // Suponiendo que necesitas usar el último producto para algo específico aquí
        context.setOrder([...context.order, orderToAdd]);
    
        // Preparar el cuerpo de la solicitud según el formato deseado
        const requestBody = {
            fecha_entrada: "2024-05-01T14:00:00", // Este valor deberá ser dinámico según tu lógica de negocio
            fecha_salida: "2024-05-05T11:00:00", // Igualmente, ajusta dinámicamente
            total: totalPrice(context.cartProducts),
            total_productos: context.cartProducts.length,
            fecha_compra: formattedDate,
            usuarioId: JSON.parse(localStorage.getItem('actualUser')).usuario.id,
            elementoIds: context.cartProducts.map(product => product.id_producto),
            habitacionIds: [] // Asume una lógica para determinar esto, si es necesario
        };
    
        // Obtener el token del usuario actual para la cabecera de autorización
        const token = JSON.parse(localStorage.getItem('actualUser')).token;
    
        try {
            const response = await fetch('http://localhost:8080/api/reserva/crear/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('La solicitud de reserva falló');
            }
    
            // Procesar respuesta...
            const responseData = await response.json();
            console.log('Reserva creada con éxito:', responseData);
    
            // Limpieza después de la compra
            context.setCartProducts([]);
            context.setCount(0);
            context.closeCheckoutSideMenu();
    
            // Redirigir al usuario o mostrar un mensaje de éxito, según corresponda
        } catch (error) {
            console.error('Error al crear reserva:', error);
        }
    };
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