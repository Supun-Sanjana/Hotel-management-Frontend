import { Link } from "react-router-dom";

const ClientNav = () => {
    return (

        <nav className="bg-teal-500 shadow-md fixed w-full z-50 flex justify-between">
            <div className=" px-4 py-3 flex items-center font-bold text-white text-2xl">
                <h3>LuxeSphere</h3>
            </div>
            <div className="flex justify-between items-center gap-5 mr-5">


                <div className="p-3 w-30 justify-center flex  my-2 rounded-2xl text-white">
                    <Link to={'/rooms'}>Rooms</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/facilities'}>Facilities</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/about-us'}>About Us</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/contact'}>Contact</Link>
                </div>

            </div>

            <div className="flex justify-between items-center gap-5 mr-5">
                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/sign-up'}>Sign Up</Link>
                </div>
            </div>


        </nav>

    )
}

export default ClientNav

