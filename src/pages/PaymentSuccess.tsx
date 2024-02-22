import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import movie1 from '../assets/logo/Clapperboard.svg'
import movie2 from '../assets/logo/Movie Roll.svg'
import { Link } from 'react-router-dom'


const PaymentSuccess = () => {

    




    return (
        <div>
            <Navbar/>

            <div>
                <h1>Payment successful!</h1>
                
                <div>
                    <img src={movie1}/>
                    <img src={movie2}/>
                </div>

                <p>Transaction details have been sent to your email, you can also check other ticket details in My Tickets both on the website and your smartphone.</p>

                <div>
                    <Link to={'/my-ticket'}>
                        My Ticket
                    </Link>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default PaymentSuccess