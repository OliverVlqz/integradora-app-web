export default function CreditCard() {
  return (
    <div className="bg-white  flex">
        <div className="space-y-16">
            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl  text-white shadow-2xl transition-transform transform hover:scale-110">
            
                <img className="relative object-cover w-full h-full rounded-xl" src="https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635ad2beab62109bdc7466e3_horizontal%20-%202022-10-27T214932.488.svg"/>
                
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light">
                                Name
                            </p>
                            <p className="font-medium tracking-widest">
                                Oliver Martinez
                            </p>
                        </div>
                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Card Number
                        </p>
                        <p className="font-medium tracking-more-wider">
                            4642  3489  9867  7632
                        </p>
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Month
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    11
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs ">
                                    Year
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    25
                                </p>
                            </div>
    
                            <div className="">
                                <p className="font-light text-xs">
                                    CVV
                                </p>
                                <p className="font-bold tracking-more-wider text-sm">
                                    ···
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
