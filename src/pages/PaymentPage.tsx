import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar';
import { VoucherData } from '../data';
import { voucherCode } from '../data-API/voucher-code';
import { Link } from 'react-router-dom';
import { addTicket } from '../redux/Slices/MyTicketSlice';
import { resetMovieBooking } from '../redux/Slices/MovieBookingSlice';
// import { resetMovieBooking } from '../redux/Slices/MovieBookingSlice';
// import { addTicket } from '../redux/Slices/MyTicketSlice';

const PaymentPage = () => {

    const dispatch = useDispatch();

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [discount, setDiscount] = useState(0)
    const [finalAmount, setFinalAmount] = useState(0)

    const {selectedMovie, selectedTheater, selectedDateTime, selectedTime, selectedSeats} = useSelector((state: any) => state.movieBooking)
    
    const totalSeat = selectedSeats.length;
    const price = Number(selectedTheater.price)

    const selectedSeatsString = selectedSeats.join(', ');

    const [coupanCode, setCoupanCode] = useState("");
    const [invalid, setInvalid] = useState<boolean>(false)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoupanCode(event.target.value);
    }

    const discountHandler = () => {
        console.log("Im in discount handler");
        if (discount === 0) {
            console.log("0 che");
            let dis = 0;
            try {
                const coupanCodeData: VoucherData = voucherCode;
                if (coupanCodeData[coupanCode]) {
                    dis = coupanCodeData[coupanCode];
                    console.log(dis);
                    setInvalid(false);
                }
                else{
                    setInvalid(true);
                }
            }
            catch (e) {
                console.log("Error avi gy Coupan code leva ma.");
            }
            setDiscount(dis);
        }
        else {
            setDiscount(0);
        }
    }

    useEffect(() => {
        let sum = totalSeat * price;
        setTotalPrice(sum);
        if (sum - discount < 0) {
            setFinalAmount(0);
        }
        else {
            setFinalAmount(sum - discount);
        }
        
    }, [ , discount]);

    const clickHandler = () => {
        

        if (selectedMovie && selectedTheater && selectedDateTime && selectedTime && selectedSeats) {
            dispatch(addTicket({ 
                movie: selectedMovie, 
                theater: selectedTheater,
                date: selectedDateTime,
                time: selectedTime,
                seat: selectedSeats,
                totalPrice: totalPrice,
                discount: discount,
                finalAmount: finalAmount,
                token: Math.floor(Math.random() * (999999 - 111111)) + 111111,
            }));
            dispatch(resetMovieBooking());
        }
    }

    
    

    
    




    return (
        <div className='w-11/12'>

            <Navbar/>
            
            <div className='w-11/12 mx-auto p-4 flex justify-between'>
                {/* LEFT CONTAINER  */}
                <div className='border w-11/12'>
                    <h1>{selectedMovie.name}</h1>
                    <h1>{selectedDateTime}</h1>
                    <h1>{selectedTheater.dimensionCategory}</h1>
                    <h1>{selectedTime}</h1>
                    <h1>{selectedSeatsString}</h1>

                </div>

                {/* RIGHT CONTAINER  */}
                <div className='border w-11/12'>
                    <h1>{selectedTheater.dimensionCategory}</h1>
                    <h1>{selectedTheater.price}</h1>
                    <h1>{selectedSeats.length}</h1>
                    <h1>{totalPrice}</h1>
                    
                    {
                        invalid &&
                        <p>Invalid Voucher Code!</p>
                    }

                    <div className="">
                        {
                            discount ? 
                                <input 
                                    type="text" 
                                    className=""
                                    placeholder="Apply coupan code" 
                                    onChange={changeHandler} 
                                    readOnly 
                                />
                                : 
                                <input 
                                    type="text" 
                                    className=""
                                    placeholder="Apply coupan code" 
                                    onChange={changeHandler} 
                                />
                        }
                        {
                            discount ?
                                <button 
                                    className="" 
                                    onClick={discountHandler}
                                >Remove</button>
                                : 
                                <button 
                                    className="" 
                                    onClick={discountHandler}
                                >Apply</button>
                        }
                    </div>

                    <h1>{finalAmount}</h1>


                    <div>
                        <Link 
                            to={'/payment-success'}
                            onClick={clickHandler}>
                            Buy Tickets
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PaymentPage