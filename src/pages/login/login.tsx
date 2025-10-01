import { useState } from "react";
import axios from "axios"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/v1/login', { email: email, password: password })
            .then((response) => {
                console.log(response);
                //save token in browser
                localStorage.setItem('token', response.data.token);
                //get token from browser
                const token = localStorage.getItem('token');
                localStorage.setItem("user", JSON.stringify(response.data.user));

                console.log(token);

                if (response.data.user.type === "admin") {
                    window.location.href = "/admin";
                }else if(response.data.user.type === "user") {
                    window.location.href = "/";
                }
            }).catch(() => {
                console.log("Login failed");
            })

    };

    return (
        <div className="relative h-screen w-full bg-[url('/login.png')] bg-cover bg-center flex justify-center items-center">

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content (above overlay) */}
            <div className="relative bg-white/20 p-6 rounded-2xl w-[400px] h-[400px] backdrop-blur-md
      flex-col flex items-center ">
                {/* Login content */}
                <h2 className="text-white text-2xl font-semibold">Login</h2>

                <input type="email" placeholder="Email Address"
                    className="w-full placeholder:text-gray-500 bg-white/30 p-3 rounded-md mt-6  focus:outline focus:outline-white"
                    value={email}
                    onChange={
                        (event) => setEmail(event.target.value)
                    }
                />

                <input type="password" placeholder="Password "
                    className="w-full placeholder:text-gray-500 bg-white/30 p-3 rounded-md mt-6  focus:outline focus:outline-white"
                    value={password}
                    onChange={
                        (event) => setPassword(event.target.value)
                    }
                />


                <button className="w-full bg-white p-3 rounded-md mt-10"
                    onClick={() => handleLogin()}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;
