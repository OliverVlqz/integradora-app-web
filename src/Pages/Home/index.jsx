import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Components/Layout";
import Welcome from "../../Components/Welcome";
import HabitacionesCard from "../../Components/HabitacionesCard";

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
    setSelectedDate(newStartDate);

    const startDate = new Date(newStartDate);
    startDate.setDate(startDate.getDate() + 7); // Incrementar 7 días para la fecha máxima de salida
    const maxEndDate = startDate.toISOString().split('T')[0]; // Convertir a formato yyyy-mm-dd
    setMinEndDate(maxEndDate); // Establecer la fecha mínima para el input de fecha de salida
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const actualUser = JSON.parse(localStorage.getItem('actualUser'));
        const token = actualUser.token;

        const response = await axios.get('http://localhost:8080/api/habitacion/', {
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
              className="bg-transparent m-3"
              min={getTodayDate()}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              value={endDate}
              className="bg-transparent m-3"
              min={minEndDate}
              onChange={handleEndDateChange}
            />
            <button className="rounded-lg bg-lime-700 h-8 w-44 m-3 text-slate-100">Ver disponibilidad</button>
          </form>
        </div>
      </div>
      <Welcome />
      {habitaciones.map((habitacion) => (
        <HabitacionesCard 
          key={habitacion.id_habitacion} 
          props={habitacion} 
          selectedDate={formatDateWithTime(selectedDate)} 
          endDate={formatDateWithTime(endDate)} 
        />
      ))}

     
    </Layout>
  );
}
