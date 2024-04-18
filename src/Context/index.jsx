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
    //Room to Buy
    const [roomToBuy, setRoomToBuy] = useState({})
    console.log(productToShow)
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
         fetch('http://api5a-back-env.eba-kknjdvq2.us-east-1.elasticbeanstalk.com/api/elemento/', config).
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
      // Fetch a la API para obtener el historial del usuario
      useEffect(() => {
        const fetchData = async () => {
            try {
                const actualUser = JSON.parse(localStorage.getItem('actualUser'));
                const idUsuario = actualUser.usuario.id;
                const token = actualUser.token;
                const config = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                

                const response = await fetch(`http://api5a-back-env.eba-kknjdvq2.us-east-1.elasticbeanstalk.com/api/reserva/usuario/${idUsuario}`, config);
                if (!response.ok) throw new Error('Respuesta de red no fue ok');

                const data = await response.json();
                // Aquí transformas los datos obtenidos al formato que necesitas, si es necesario
                const orderData = transformOrderData(data);
                setOrder(orderData);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            }
        };

        fetchData();
    }, []);
    const transformOrderData = (apiResponse) => {
      // Asumiendo que apiResponse.data contiene el array de reservas
      return apiResponse.data.map(reserva => {
        // Fusionamos elementos y habitaciones en una sola lista de 'productos'
        // Primero, verificamos si hay elementos disponibles
        const productos = reserva.elementos.length > 0 ? reserva.elementos.map(elemento => ({
          id_producto: elemento.id_producto,
          nombre_producto: elemento.nombre_producto,
          precio: elemento.precio,
          descripcion: elemento.descripcion || '', // Asegurar que siempre haya un string
          imagen_elemento: elemento.imagen_elemento || '', // Asegurar que siempre haya un string
          paquetes: elemento.paquetes || [], // Asegurar que siempre haya un array
          categoria: {
            id_categoria: elemento.categoria.id_categoria,
            nombrecategoria: elemento.categoria.nombrecategoria
          }
        })) : reserva.habitaciones.map(habitacion => ({
          id_producto: habitacion.id_habitacion, // Usamos id_habitacion como id_producto
          nombre_producto: `Habitación ${habitacion.tipoHabitacion.nombrehabitacion} - Número ${habitacion.num_habitacion}`,
          precio: habitacion.precio,
          descripcion: habitacion.descripcion,
          imagen_elemento: habitacion.imagen_hab || '', // Asegurar que siempre haya un string
          paquetes: [], // Las habitaciones no tienen paquetes, por lo que es un array vacío
          categoria: {
            id_categoria: habitacion.tipoHabitacion.id_tipohab,
            nombrecategoria: habitacion.tipoHabitacion.nombrehabitacion
          }
        }));
    
        // Ahora, retornamos la estructura de la reserva ajustada
        return {
          date: reserva.fecha_compra,
          products: productos,
          totalProducts: reserva.total_productos,
          totalPrice: reserva.total // Asumiendo que este es el total a pagar de la reserva
        };
      });
    };
    
  
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
    const [isPagoHabitacionModalOpen, setIsPagoHabitacionModalOpen] = useState(false)
    const openPagoHabitacionModal = (roomDetails) => {
      setRoomToBuy(roomDetails)
        setIsPagoHabitacionModalOpen(true)
    }
    const closePagoHabitacionModal = () => {
      setRoomToBuy({})
      setIsPagoHabitacionModalOpen(false)

    }
   

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
            isPagoModalOpen: isPagoHabitacionModalOpen,
            openPagoHabitacionModal,
            closePagoHabitacionModal,
            roomToBuy,
            setRoomToBuy
            }}>
            {children}
        </ShoppingCartContext.Provider>
        
    )

}
