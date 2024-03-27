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

    // UserModal Open/Close
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const openUserModal = () => setIsUserModalOpen(true)
    const closeUserModal = () => setIsUserModalOpen(false)
    //User To Modify
    const [userToModify, setUserToModify] = useState({})

    const datosUsuarios=[{
      "id_usuario": 1,
      "nombre": "lizz",
      "apellidoP": "jojo",
      "apellidoM": "jaja",
      "correo": "jksdk",
      "contrasena": "123",
      "status": true,
      "role": {
          "id_role": 1,
          "nombre_role": "cliente"
      } 
    
    }, {
      "id_usuario": 2,
      "nombre": "rola",
      "apellidoP": "jojo",
      "apellidoM": "jaja",
      "correo": "jksdk",
      "contrasena": "123",
      "status": false,
      "role": {
          "id_role": 1,
          "nombre_role": "gerente"
      } 
    },
    {
      "id_usuario": 3,
      "nombre": "uwu",
      "apellidoP": "jojo",
      "apellidoM": "jaja",
      "correo": "jksdk",
      "contrasena": "123",
      "status": true,
      "role": {
          "id_role": 1,
          "nombre_role": "empleado"
      } 
    },
    
  ]


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
            isUserModalOpen,
            openUserModal,
            closeUserModal,
            userToModify,
            setUserToModify,
            datosUsuarios
            }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )

}
