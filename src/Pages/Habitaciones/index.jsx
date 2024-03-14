

import { useContext } from "react"
import Card from "../../Components/Card"
import Layout from "../../Components/Layout"
import ProductDetail from "../../Components/ProductDetail"
import { ShoppingCartContext } from "../../Context"


function Habitaciones() {
  const context = useContext(ShoppingCartContext)
  const renderView=() =>{
    if(context.searchByTitle?.length>0){
      if(context.filteredItems?.length>0){
        return(context.filteredItems?.map(item=>(
          <Card key={item.id} data={item}/>
        )))
      }else{
        return(
          <div> No hay coincidencias :( </div>
        )
      }
      
    } else{
      return(context.items?.map(item=>(
        <Card key={item.id} data={item}/>
      )))
    }
  }
  return (
   
    <Layout>
      <div className="flex w-80 items-center justify-center relative mb-4">
          <h1 className="font-medium text-x l">Home</h1>
      </div>
      <input className="rounded-lg border-black border w-80 p-4 mb-4 focus:outline-none"
      onChange={(event)=>{ context.setSearchByTitle(event.target.value)}} 
      type="text" placeholder="Search a product" />
      <div className="grid md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-screen-lg">
      {
        renderView()
      }
      </div>
     <ProductDetail/>
      
    </Layout>
  )
}
export default Habitaciones