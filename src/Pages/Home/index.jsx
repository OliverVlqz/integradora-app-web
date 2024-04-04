import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Components/Layout";
import Welcome from "../../Components/Welcome";
import HabitacionesCard from "../../Components/HabitacionesCard";

export default function Index() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    const todayString = `${year}-${month}-${day}`;
    return todayString;
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

  console.log(habitaciones);

  return (
    <Layout>
      <div className="min-w-max">
        <img className="h-96 bg-local rounded-md" src="../../../public/inicioalberca.webp" alt="" />
        <div className="bg-[#e8eee5] h-14 flex justify-center content-center rounded-lg w-[40rem] m-auto">
          <form action="" className="">
            <input type="date" value={selectedDate} className="bg-transparent m-3 " />
            <input type="date" value={selectedDate} className="bg-transparent m-3" />
            <button className="rounded-lg bg-lime-700 h-8 w-44 m-3 text-slate-100">Ver disponibilidad</button>
          </form>
        </div>
      </div>
      <Welcome />
      {habitaciones.map((habitacion) => (
        <HabitacionesCard key={habitacion.id_habitacion} props={habitacion} />
      ))}
    </Layout>
  );
}
