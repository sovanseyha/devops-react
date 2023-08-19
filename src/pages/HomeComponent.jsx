import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../Images/mobile.png'
import { BsTwitter } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";


export default function HomeComponent() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            navigate("/home/board")
        }
    }, [])

    return (
        <div>
            <div>
                <div className="navbar bg-base-100 fixed flex justify-between px-20 z-10">
                    <div>
                        <a className=" font-bold normal-case text-4xl">Task <span className='text-bg_primary'>Zone</span></a>
                    </div>
                    <div>
                        <button className="border-none hover:bg-green-300 btn btn-sm bg-bg_primary m-2" onClick={() => navigate("/login")}>LOGIN</button>
                        <button className="border-none hover:bg-green-300 btn btn-sm bg-bg_primary m-2" onClick={() => navigate("/register")}>SIGN UP</button>
                    </div>
                </div>
                <div className="hero min-h-screen bg-base-100 z-0">

                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className='flex items-center justify-evenly flex-col lg:flex-row-reverse'>
                            <div className='w'>
                                <img src={bg} alt="background image" />
                            </div>
                            <div className='w-1/2'>
                                <h1 className="text-5xl font-bold leading-tight">The fastest way to complete you tasks web</h1>
                                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-bg_primary">
                <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-white hover:text-gray-900">
                        Home
                        </a>
                    </div>

                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-white hover:text-gray-900">
                        About Us
                        </a>
                    </div>

                    <div className="px-5 py-2">
                        <a href="#" className="text-base text-white hover:text-gray-900">
                        Docs
                        </a>
                    </div>

                    
                    </nav>
                    <div className="mt-8 flex justify-center space-x-6">
                    <a href="#" className="text-white hover:text-gray-200">
                        <BsTwitter className="w-6 h-6" />
                    </a>

                    <a href="#" className="text-white hover:text-gray-200">
                        <AiFillYoutube className="w-6 h-6" />
                    </a>

                    <a href="#" className="text-white hover:text-gray-200">
                        <FaFacebookF className="w-6 h-6" />
                    </a>
                    </div>
                    <p className="mt-8 text-center text-base text-white">
                        Copyright &copy; 2023 - All right researcher By Korean HRD Center Generation 11 : SR Group 2.
                    </p>
                </div>
                </footer>
        </div>
    )
}
