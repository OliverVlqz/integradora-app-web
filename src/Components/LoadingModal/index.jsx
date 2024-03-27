import { useState } from "react";

export default function LoadingModal() {
    const [showModal, setShowModal] = useState  (false);

  return (
    <>
    <div className="p-2.5 text-[#0f0]">
    
  </div>
        <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
        >
        Abre el modal de loading
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <div>
                        <span className="mr-2">Cargando</span>
                        <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
                        <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
                        <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
                    </div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                <div className=" flex justify-center items-center">
                    <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-amber-400 via-lime-400 to-emerald-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full "> 
                        <div className="rounded-full h-full w-full bg-slate-100 background-blur-md "> 
                        </ div>
                    </div>
                </div>
                
                  <p className="my-10 text-blueGray-500 text-lg leading-relaxed text-center">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ut accusamus illo doloribus! Sunt nam maxime necessitatibus, a cum dolor sequi accusamus error inventore accusantium illum magnam ipsam ducimus deleniti.
                  </p>
                </div>
                {/*footer*/}
              
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
