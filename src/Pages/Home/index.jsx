import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Components/Layout";
import Welcome from "../../Components/Welcome";
import HabitacionesCard from "../../Components/HabitacionesCard";
import ProductDetail from "../../Components/ProductDetail";

export default function Index() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());
  const [minEndDate, setMinEndDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  }

  // Función para convertir fecha al formato deseado con hora fija
  function formatDateWithTime(date) {
    return `${date}T14:00:00`;
  }

  function handleStartDateChange(event) {
    const newStartDate = event.target.value;
    setSelectedDate(newStartDate); // Actualiza la fecha de inicio seleccionada

    const startDate = new Date(newStartDate);
    startDate.setDate(startDate.getDate() + 7); // Incrementa 7 días para la fecha de finalización
    const maxEndDate = startDate.toISOString().split('T')[0]; // Convierte a formato yyyy-mm-dd
    
    setEndDate(maxEndDate); // Actualiza endDate al máximo valor permitido (7 días después)
    setMinEndDate(maxEndDate); // Establece la fecha mínima para endDate, asegurando que no sea antes del nuevo endDate
}

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        const token = actualUser.token;

        const response = await axios.get('http://api5a-back-env.eba-kknjdvq2.us-east-1.elasticbeanstalk.com/api/habitacion/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setHabitaciones(response.data.data);
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    fetchHabitaciones();
  }, []);
  const renderHabitaciones = () => {
    // Filtrar las habitaciones que no tienen reservas en las fechas seleccionadas y que tienen estatus true
    const filteredHabitaciones = habitaciones.filter((habitacion) => {
      // Comprueba si alguna reserva se solapa con las fechas seleccionadas y verifica el estatus
      const reservasSolapadas = habitacion.reservas.some((reserva) => {
        const inicioReserva = new Date(reserva.fecha_entrada);
        const finReserva = new Date(reserva.fecha_salida);
        const inicioSeleccionado = new Date(selectedDate);
        const finSeleccionado = new Date(endDate);
        return finReserva > inicioSeleccionado && inicioReserva < finSeleccionado;
      });
  
      // Solo retorna habitaciones donde no hay reservas solapadas y el estatus es true
      return !reservasSolapadas && habitacion.estatus === true;
    });
  
    // Renderiza las habitaciones filtradas
    return filteredHabitaciones.map((habitacion) => (
      <HabitacionesCard
        key={habitacion.id_habitacion}
        props={habitacion}
        selectedDate={formatDateWithTime(selectedDate)}
        endDate={formatDateWithTime(endDate)}
      />
    ));
  };
  console.log(habitaciones);

  return (
    <Layout>
      <div className="min-w-max">
        <img className="h-96 bg-local rounded-md" src="../../../public/inicioalberca.webp" alt="" />
        <div className="bg-[#dff8d2] h-14 flex justify-center content-center rounded-lg w-[40rem] m-auto">
          <form className="">
            <div>
              
            </div>
            <input
              type="date"
              value={selectedDate}
              className=" bg-lime-700 rounded-lg p-2 mt-1   mr-3 text-slate-100"
              min={getTodayDate()}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              value={endDate}
              className=" bg-lime-700 rounded-lg p-2  text-slate-100"
              min={selectedDate}
              max={minEndDate}
              onChange={handleEndDateChange}
            />
           
          </form>
        </div>
      </div>
      <Welcome />
      {renderHabitaciones()}
     <ProductDetail/>

     
    </Layout>
  );
}
