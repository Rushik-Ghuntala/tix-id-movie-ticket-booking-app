// import React from 'react'

import { useState } from "react"
import { IoIosArrowRoundBack } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";

import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { userLogin } from "../redux/Slices/LoginSlice"

import { userLoginData } from "../type/LoginPageType"
import LoginBackground from '../assets/Login-Background.png'

// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css'; // Import the styles

const LoginPage = () => {

    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const [userData, setUserData] = useState<userLoginData>({
        // email: "",
        name:"",
        password: "",
        telNumber: "", // Add phoneNumber to userData
        // countryCode: "" // Add countryCode to userData
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setUserData( (prevData) => ({
            ...prevData,
            [name]: value
        }))
        // console.log("Login User Data: ", userData)
    }

    // const handlePhoneChange = (value: string, country: any) => {
    //     setUserData(prevData => ({
    //         ...prevData,
    //         phoneNumber: value,
    //         countryCode: country.dialCode // Update countryCode based on selected country
    //     }));
    // };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!userData.telNumber || !userData.password){
            toast.error('Please enter all fields')
            return
        }

        console.log("Full Login Data: ", userData)

        dispatch(userLogin(userData));

        window.localStorage.setItem('userData', JSON.stringify(userData))

        navigate(-1)
    }



    return (
        <div>
            <div className="relative">
                <img src={LoginBackground} className="w-screen h-screen"/> 
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute bg-transparent text-white text-2xl font-bold top-[45px] left-[35px] flex gap-x-6 items-center">
                    <div><IoIosArrowRoundBack size={45}/></div>
                    <div>Kembali</div>
                </button>
                
                <div className="absolute flex flex-col bg-white w-[720px] h-[672px] top-[64px] right-[63px]">
                    <div className="relative">
                    <form onSubmit={submitHandler}>
                        <div className=" absolute text-4xl font-bold top-[98px] left-[80px]">Masuk ke TIX ID</div>
                        {/* <div>NOMOR HANDPHONE</div> */}

                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={changeHandler}
                            value={userData.name}
                        />

                        {/* <label htmlFor="phoneNumber">NOMOR HANDPHONE</label>
                        <PhoneInput
                            country={'id'}
                            value={userData.phoneNumber}
                            onChange={handlePhoneChange}
                            // inputStyle={{ width: '100%' }} // Example styling
                            searchPlaceholder="Search country..."
                            enableSearch
                            
                            inputStyle={{
                                // width: '100%',
                                // padding: '10px',
                                fontSize: '16px',
                                border: 'none',
                                // borderRadius: '5px',
                                // Add any other styles you want to customize
                            }}
                        /> */}
                        
                        <div className="flex flex-col">
                            <label htmlFor="telNumber" className="absolute top-[204px] left-[80px] text-lg leading-3 w-52 h-5">PHONE NUMBER</label>
                            <div className="absolute top-[240px] left-[80px] flex gap-x-2 items-center border-b border-[--Shade-400] text-lg">
                                <p>+91</p>
                                <div><RxDividerVertical size={23}/></div>
                                <input
                                    id="telNumber"
                                    name="telNumber"
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    // size={20}
                                    // minlength="9"
                                    maxLength={10} 
                                    onChange={changeHandler}
                                    value={userData.telNumber}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="absolute top-[323px] left-[80px] text-lg leading-3 w-52 h-5">PASSWORD </label>
                            <input
                                className="absolute top-[361px] left-[80px] border-b border-[--Shade-400]"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Your Password"
                                onChange={changeHandler}
                                value={userData.password}
                            />
                        </div>

                        
                        <button type="submit"
                            className="w-[423px] h-[48px] absolute top-[468px] left-[80px] rounded-md bg-[--Royal-Blue] text-xl text-white font-medium"
                        >Login Now</button>
                        

                        <p>Don't have an account yet?</p>

                        <button type="submit"
                            className="w-[423px] h-[48px] absolute top-[562px] left-[80px] rounded-md bg-[--Royal-Blue] text-xl text-white font-medium"
                        >Regis Now</button>
                    </form>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default LoginPage