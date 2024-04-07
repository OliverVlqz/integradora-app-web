import { useContext } from "react"
import Layout from "../../Components/Layout"
import OrderCard from "../../Components/OrderCard"
import { ShoppingCartContext } from "../../Context"
import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"


function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if(index ==='last') {index = context.order?.length-1}
console.log()
    return (
      <Layout>  
        <div className="flex w-80 items-center justify-center relative mb-6">
          <Link to={'/my-orders'} className=" absolute left-0 ">
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
          </Link>
          <h1>MyOrder</h1>

        </div>
        
        <div className='overflow-y-auto flex flex-col w-80'>
            {
                context.order?.[index]?.products.map(product =>(
                    <OrderCard 
                    key={product.id_producto}
                    id={product.id_producto}
                    title ={product.nombre_producto}
                    imageUrl={product.imagen_elemento}
                    price={product.precio}
                    />

                    ))
            }
            </div>
      </Layout> 
    )
  }
  export default MyOrder