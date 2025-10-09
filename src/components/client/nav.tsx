import { Link } from "react-router-dom";
import UserTag from "../UserData/userTag";

const ClientNav = () => {
    const token = localStorage.getItem('token');


    return (

        <nav className="bg-orange-100/40 shadow-md fixed w-full z-50 flex justify-between">
            <div className=" px-4 py-3 flex items-center font-bold text-white text-2xl">
                <h3>LuxeSphere</h3>
            </div>
            <div className="flex justify-between items-center gap-5 mr-5">


                <div className="p-3 w-30 justify-center flex  my-2 rounded-2xl text-teal-100">
                    <Link to={'/rooms'}>Rooms</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/facilities'}>Facilities</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/gallery'}>Gallery</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/about-us'}>About Us</Link>
                </div>

                <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                    <Link to={'/contact'}>Contact</Link>
                </div>

            </div>


            <div className="flex justify-between items-center gap-5 mr-5">
                {token ? <UserTag /> :
                    <div className="p-3 w-30 justify-center flex text-white my-2 rounded-2xl">
                        <Link to={'/login'}>Login</Link>
                    </div>
                }
            </div>






        </nav>

    )
}

export default ClientNav

