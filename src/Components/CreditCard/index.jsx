export default function CreditCard({ nombre, numero, mes, año, cvv }) {

  return (
    <div className="bg-white  flex">
        <div className="space-y-16">
            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl text-white shadow-2xl transition-transform transform hover:scale-110">
            
                <img className="relative object-cover w-full h-full rounded-xl" src="https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635ad2beab62109bdc7466e3_horizontal%20-%202022-10-27T214932.488.svg"/>
                
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light">
                                Nombre
                            </p>
                            <p className="font-medium tracking-widest">
                                {nombre}
                            </p>
                        </div>
                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Numero de tarjeta
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {numero}
                        </p>
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Mes
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {mes}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs ">
                                    Año
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {año}
                                </p>
                            </div>
    
                            <div className="">
                                <p className="font-light text-xs">
                                    CVV
                                </p>
                                {// Haz que este campo se muestre como si fuera contraseña
                                }
                                <p className="font-bold tracking-more-wider text-sm "  >
                                    {cvv}
                                </p>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
    
            
        </div>
    </div>
  )
}
