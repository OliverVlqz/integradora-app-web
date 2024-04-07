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
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const actualUser = JSON.parse(localStorage.getItem('actualUser'));
          const token = actualUser.token;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
         fetch('http://localhost:8080/api/elemento/', config).
          then( response=> response.json()).
          then(data=>{
            //dentro de data necesito el array de elementos que esta dentro de data 
            setItems(data.data)
          });

        } catch (error) {
          console.error('Error al obtener los elementos:', error);
        }
      };
  
      fetchData();
    }, []);
      // Get next api : http://localhost:8080/api/usuario 
    
      const filteredItemsByTitle =(items, searchByTitle)=>{
        return items?.filter(item => item.nombre_producto.toLowerCase().includes(searchByTitle.toLowerCase()))
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

    //Loading modal
    const [showLoading, setShowLoading] = useState  (false)
    //Loading modal open/close
    const openLoadingModal =() => setShowLoading(true)
    const closeLoadingModal =() => setShowLoading(false)
    //Mensaje que se muestra en el loading modal
    const [mensaje, setMensaje] = useState('Cargando')

    //HabitacionesModal Open/Close
    const [isHabitacionesModalOpen, setIsHabitacionesModalOpen] = useState(false)
    const openHabitacionesModal = () => setIsHabitacionesModalOpen(true)
    const closeHabitacionesModal = () => setIsHabitacionesModalOpen(false)
    //Habitaciones To Modify
    const [habitacionesToModify, setHabitacionesToModify] = useState({})

    //PagoModal Open/Close
    const [isPagoModalOpen, setIsPagoModalOpen] = useState(false)
    const openPagoModal = () => setIsPagoModalOpen(true)
    const closePagoModal = () => setIsPagoModalOpen(false)
    

 
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
            showLoading,
            openLoadingModal,
            closeLoadingModal,
            mensaje,
            setMensaje,
            isHabitacionesModalOpen,
            openHabitacionesModal,
            closeHabitacionesModal,
            habitacionesToModify,
            setHabitacionesToModify,
            isPagoModalOpen,
            openPagoModal,
            closePagoModal
            }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )

}
