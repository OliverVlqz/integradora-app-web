import { useContext } from "react"
import Layout from "../../Components/Layout"
import OrderCard from "../../Components/OrderCard"
import { ShoppingCartContext } from "../../Context"

function MyOrder() {
  const context = useContext(ShoppingCartContext)

    return (
      <Layout>
        My Order
        <div className='overflow-y-auto flex flex-col w-80'>
            {
                context.order?.slice(-1)[0].products.map(product =>(
                    <OrderCard 
                    key={product.id}
                    id={product.id}
                    title ={product.title}
                    imageUrl="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    price={product.price}
                    />

                    ))
            }
            </div>
      </Layout> 
    )
  }
  export default MyOrder