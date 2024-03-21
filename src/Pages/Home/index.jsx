import { useState } from "react";
import Layout from "../../Components/Layout";
import Welcome from "../../Components/Welcome";
import HabitacionesCard from "../../Components/HabitacionesCard";


export default function Index() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate())
  function getTodayDate(){
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth()+1
    let day = today.getDate()
    const todayString = `${year}-${month}-${day}`
    return todayString
  }
  console.log(selectedDate)

  return (
    <Layout>
        <div className="min-w-max  ">
        <img className="h-96 bg-local" src="../../../public/inicioalberca.webp" alt="" />
        <div className="bg-[#e8eee5] h-14 flex justify-center content-center rounded-lg w-[40rem] m-auto  ">
          <form action=""  className="">
            <input type="date" value={null} className="bg-transparent m-3 " />
            <input type="date" value={null} className="bg-transparent m-3" />
            <button className="rounded-lg bg-lime-700 h-8 w-44 m-3 text-slate-100">Ver disponibilidad</button>
          </form>
        </div>
        </div>
          <Welcome/>
          <HabitacionesCard/>
          <HabitacionesCard/>

      
    </Layout>
  )
}
