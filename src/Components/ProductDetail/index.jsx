    import{XMarkIcon} from '@heroicons/react/24/solid'
    import { useContext } from 'react'
    import { ShoppingCartContext } from '../../Context'
    const ProductDetail =()=>{
        const context = useContext(ShoppingCartContext)
        console.log(context.productToShow)
        return(
            <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} flex-col fixed right-0 
            border bg-white border-black
            rounded-lg w-[360px] h-[calc(100vh-82px)]`}>
                <div className='flex justify-between items-center p-6'>
                    <h2 className="font-medium text-xl">Detalles</h2>
                    <div>
                        <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={()=>context.closeProductDetail()}></XMarkIcon>
                    </div>

                </div>
                <figure className='px-6'>
                    <img  className='w-full h-56 rounded-lg object-cover'
                    src={context.productToShow.imagen_elemento || context.productToShow.imagen_hab }
                    alt={context.productToShow.nombre_producto || context.productToShow.num_habitacion} />
                </figure>
                <p className='flex flex-col p-6'>
                    <span className='font-medium text-2xl mb-2'>${context.productToShow.precio}</span>
                    <span className='font-medium text-md'>{context.productToShow.nombre_producto || context.productToShow.num_habitacion}</span>
                    <span className='font-light text-sm'>{context.productToShow.descripcion}</span>
                    {
                        context.productToShow.capacidad && (
                            <span className='font-light text-sm'> <strong className='font-bold'>Capacidad:</strong> {context.productToShow.capacidad}</span>
                        )
                        

                    }
                </p>
            </aside>
        )
    }
    export default ProductDetail