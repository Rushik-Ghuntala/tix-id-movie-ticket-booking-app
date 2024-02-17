import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userLogin } from "../redux/Slices/LoginSlice";
import { userSignupData } from "../type/SignupPageType";
import SignupBackground from '../assets/Signup-Background.png';
import SignupBackground2 from '../assets/Signup-Background2.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignupPage = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<userSignupData>({
        name: '',
        phoneNumber: '',
        countryCode: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handlePhoneChange = (value: string, country: any) => {
        setUserData(prevData => ({
            ...prevData,
            phoneNumber: value,
            countryCode: country.dialCode
        }));
    };

    // const clickHandler = (): void => {
    //     if (!userData.name || !userData.phoneNumber) {
    //         toast.error('Please enter all fields');
    //         return;
    //     }
    //     setStep(2);
    // }

    const submitHandler1 = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      if (!userData.name || !userData.phoneNumber) {
          toast.error('Please enter all fields');
          return;
      }

      setStep(2)

      // console.log("Full Signup Data: ", userData);
      // dispatch(userLogin(userData));
      // window.localStorage.setItem('userData', JSON.stringify(userData));
      
      // navigate('/')
  }

    const submitHandler2 = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!userData.email || !userData.password) {
            toast.error('Please enter all fields');
            return;
        }

        console.log("Full Signup Data: ", userData);
        dispatch(userLogin(userData));
        window.localStorage.setItem('userData', JSON.stringify(userData));
        
        navigate('/')
    }

    return (
        <div>
            <div className={step === 1 ? "visible" : "hidden"}>
                {/* First Step */}
                <div>
                    <img src={SignupBackground} className="w-screen h-screen"/>
                    <button onClick={() => navigate(-1)} className="absolute bg-transparent text-white text-2xl font-bold top-[45px] left-[35px] flex gap-x-6 items-center">
                        <IoIosArrowRoundBack size={45}/>
                        Return
                    </button>
                    <div className="absolute bg-white w-[720px] h-[672px] top-[64px] left-[632px]">
                        <form onSubmit={submitHandler1}>
                            <div>Sign up for TIX ID</div>
                            <label htmlFor="name">FULL NAME</label>
                            <input type="name" id="name" name="name" placeholder="Enter Your Full Name" onChange={changeHandler} value={userData.name} />
                            <label htmlFor="phoneNumber">PHONE NUMBER</label>
                            <PhoneInput country={'id'} value={userData.phoneNumber} onChange={handlePhoneChange} />
                            <button >Continue</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={step === 2 ? "visible slide-in-right" : "hidden"}>
                {/* Second Step */}
                <div>
                    <img src={SignupBackground2} className="w-screen h-screen"/>
                    <button onClick={() => setStep(1)} className="absolute bg-transparent text-white text-2xl font-bold top-[45px] left-[35px] flex gap-x-6 items-center">
                        <IoIosArrowRoundBack size={45}/>
                        Return
                    </button>
                    <div className="absolute bg-white w-[720px] h-[672px] top-[64px] left-[632px]">
                        <form onSubmit={submitHandler2}>
                            <div>Sign up for TIX ID</div>
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email" onChange={changeHandler} value={userData.email} />
                            <label htmlFor="password">PASSWORD</label>
                            <input type="password" id="password" name="password" placeholder="Enter Your Password" onChange={changeHandler} value={userData.password} />
                            <button type="submit">Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
