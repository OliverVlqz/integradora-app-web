import { useEffect } from 'react'
import { createContext, useState } from 'react'
export const ShoppingCartContext = createContext()
export const ShoppingCartProvider = ({children}) =>{
    //Shopping cart count
    const [count, setCount] = useState(0)
    //Produc detail Show product
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    //Product detail open/close
    const openProductDetail =() => setIsProductDetailOpen(true)
    const closeProductDetail =() => setIsProductDetailOpen(false)
    //Show product detail
    const [productToShow, setProductToShow] = useState({})
    //ShoppingCart Add Products
    const [cartProducts, setCartProducts] = useState([])
    //Shopping Cart Order
    const [order, setOrder] = useState([])
    //Get product 
    const [items, setItems] = useState(null)
    //Search product
    const [searchByTitle, setSearchByTitle] = useState('')
    //Filtered Items
    const [filteredItems, setFilteredItems] = useState([])

    
    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then (data=> setItems(data))
    
        
      },[])

      const filteredItemsByTitle =(items, searchByTitle)=>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))

      }
      useEffect(()=>{
        if(searchByTitle){
            setFilteredItems(filteredItemsByTitle(items,searchByTitle))
        }
      },[items,searchByTitle])

    // Checkout Side Menu Open/Close
     //Produc detail Show product
     const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
     //Product detail open/close
     const openCheckoutSideMenu =() => setIsCheckoutSideMenuOpen(true)
     const closeCheckoutSideMenu =() => setIsCheckoutSideMenuOpen(false)


    return(
        <ShoppingCartContext.Provider value={{
            count, 
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )

}
