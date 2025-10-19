import { useState } from "react"

const Hero = () => {

    const [formData, setFormData] = useState({
        checking: "",
        checkout: "",
        category: ""
    })

    


    return (
        <div className="relative w-full h-[650px] flex flex-col items-center justify-center">
            {/* Background Image */}
            <img
                src="hero_gpt.png"
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay for darkening the background */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text and Inputs */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                <h2 className="text-white text-5xl font-bold text-center drop-shadow-lg  mt-50  sm:mt-0">
                    Welcome to LuxeSphere
                </h2>

                <div className='bg-white/30 p-4 rounded-2xl flex-col justify-center items-center flex '>
                    {/* Input Fields */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className='flex flex-col bg-white/60 p-2 rounded-md'>
                            <label className='pb-2 pl-2 '>Checkin date</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, checking: e.target.value })}
                                type="date"
                                placeholder="First Field"
                                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div className='flex flex-col bg-white/60 p-2 rounded-md'>
                            <label className='pb-2 pl-2 '>Checkout date</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                                type="date"
                                placeholder="First Field"
                                className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div className='flex flex-col bg-white/60 p-2 rounded-md'>
                            <label className='pb-2 pl-2 '>Category</label>
                            <select
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                value={formData.category || ""}
                                name="" id="" className="px-4 py-3 rounded-lg w-64 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-400" >
                                <option value="" disabled>Select</option>
                                <option value="Standard">Standard</option>
                                <option value="Luxery">Luxery</option>
                                <option value="Deluxe">Deluxe</option>
                            </select>
                        </div>


                    </div>
                    <button
                        onClick={() => console.log(formData)}
                        className='bg-orange-900 text-white px-10 py-3 rounded-lg my-4' >
                        Book Now
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Hero
