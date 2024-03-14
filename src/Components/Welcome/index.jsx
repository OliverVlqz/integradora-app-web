
import Layout from '../Layout'

export default function Welcome() {
  return (
    <div>
        <h2 className="text-3xl text-center font-semibold p-3">Bienvenido al hotel familiar</h2>
          <p className="text-lg text-center">Somos un hotel familiar, ofrecemos los servicios de restaurante y spa,
 ven y conocénos, haz tu reservación.</p>
          <div className=" flex justify-center items-center gap-9 p-4">
          
              <figure>
                <img className="m-auto w-24" src="../../../public/restaurantelogo.png" alt="restaurante" />
                <p>
                  <h2 className="text-center font-semibold">Restaurante</h2>
                  <p className="text-center font-light">Conoce nuestros mejores platillos</p>
                </p>
              </figure>
              <figure>
                <img className="m-auto w-24" src="../../../public/spalogo.png" alt="spa" />
                <p>
                  <h2 className="text-center font-semibold">Spa</h2>
                  <p className="text-center font-light">Elige uno de nuestros paquetes</p>
                </p>
              </figure>
              <figure>
                <img className="m-auto w-24" src="../../../public/miscelaneoslogo.png" alt="restaurante" />
                <p>
                  <h2 className="text-center font-semibold ">Miscelaneos</h2>
                  <p className="text-center font-light">Descubre nuestros productos</p>
                </p>
              </figure>
              </div>
        
    </div>
  )
}
