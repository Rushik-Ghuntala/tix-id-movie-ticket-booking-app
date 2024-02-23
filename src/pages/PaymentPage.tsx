import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { VoucherData } from "../data";
import { voucherCode } from "../data-API/voucher-code";
import { Link } from "react-router-dom";
import { addTicket } from "../redux/Slices/MyTicketSlice";
import { resetMovieBooking } from "../redux/Slices/MovieBookingSlice";
import Footer from "../components/Footer";
import { IoArrowBack } from "react-icons/io5";

// import { resetMovieBooking } from '../redux/Slices/MovieBookingSlice';
// import { addTicket } from '../redux/Slices/MyTicketSlice';

const PaymentPage = () => {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const {
    selectedMovie,
    selectedTheater,
    selectedDateTime,
    selectedTime,
    selectedSeats,
  } = useSelector((state: any) => state.movieBooking);

  const totalSeat = selectedSeats.length;
  const price = Number(selectedTheater.price);

  const selectedSeatsString = selectedSeats.join(", ");

  const [coupanCode, setCoupanCode] = useState("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupanCode(event.target.value);
  };

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
        } else {
          setInvalid(true);
        }
      } catch (e) {
        console.log("Error avi gy Coupan code leva ma.");
      }
      setDiscount(dis);
    } else {
      setDiscount(0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let sum = totalSeat * price;
    setTotalPrice(sum);
    if (sum - discount < 0) {
      setFinalAmount(0);
    } else {
      setFinalAmount(sum - discount);
    }
  }, [, discount]);

  const clickHandler = () => {
    if (
      selectedMovie &&
      selectedTheater &&
      selectedDateTime &&
      selectedTime &&
      selectedSeats
    ) {
      dispatch(
        addTicket({
          movie: selectedMovie,
          theater: selectedTheater,
          date: selectedDateTime,
          time: selectedTime,
          seat: selectedSeats,
          totalPrice: totalPrice,
          discount: discount,
          finalAmount: finalAmount,
          token: Math.floor(Math.random() * (999999 - 111111)) + 111111,
        })
      );
      dispatch(resetMovieBooking());
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="w-10/12 mx-auto p-4 mt-[7rem]">
        <div>
          <div className="text-4xl font-bold text-[--Shade-900]">
            Payment Confirmation
          </div>
          <div>Payment confirmation for the seats you have reserved</div>
        </div>

        <div className=" flex justify-between my-8 ">
          {/* LEFT CONTAINER  */}

          <div className=" flex flex-col w-11/12">
            <div className=" w-11/12 m-10">
              <div className="font-medium text-2xl text-[--Shade-900]">
                Schedule Details
              </div>

              <div className="mt-5">
                <div className="font-normal text-sm text-[--Shade-700]">
                  Movie Title
                </div>
                <div className="font-semibold text-2xl text-[--Shade-900]">
                  <h1>{selectedMovie.name}</h1>
                </div>
              </div>
              <hr className="w-9/12 mt-2 bg-[--Shade-200] h-[1.6px]" />

              <div className="mt-5">
                <div className="font-normal text-sm text-[--Shade-700]">
                  Date
                </div>
                <div className="font-semibold text-2xl text-[--Shade-900]">
                  <h1>{selectedDateTime}</h1>
                </div>
              </div>
              <hr className="w-9/12 mt-2 bg-[--Shade-200] h-[1.6px]" />

              <div className="flex justify-between items-center w-6/12 mt-5">
                <div>
                  <div className="font-normal text-sm text-[--Shade-700]">
                    Category
                  </div>
                  <div className="font-semibold text-2xl text-[--Shade-900]">
                    <h1>{selectedTheater.dimensionCategory}</h1>
                  </div>
                </div>

                <div>
                  <div className="font-normal text-sm text-[--Shade-700]">
                    Time
                  </div>
                  <div className="font-semibold text-2xl text-[--Shade-900]">
                    <h1>{selectedTime}</h1>
                  </div>
                </div>
              </div>
              <hr className="w-9/12 mt-2 bg-[--Shade-200] h-[1.6px]" />

              <div className="my-5">
                <div className="font-normal text-sm text-[--Shade-700]">
                  Tickets ({selectedSeats.length})
                </div>
                <div className="font-semibold text-2xl text-[--Shade-900]">
                  <h1>{selectedSeatsString}</h1>
                </div>
              </div>
              <hr className="w-9/12 mt-2 bg-[--Shade-200] h-[1.6px]" />
            </div>

            <div>
              <div className="w-7/12 m-5 border border-[--Shade-600] rounded-md text-xl font-medium uppercase h-10 p-7 flex items-center justify-center gap-3 cursor-pointer">
                <div>
                  <IoArrowBack size={20} />
                </div>
                <div>Back</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER  */}
          <div className="border-2 rounded-lg shadow-2xl w-8/12 m-10 p-10">
            <div className="font-semibold text-2xl text-[--Shade-900]">
              Order Summary
            </div>

            <div>
              <div className="mt-5">
                <div className="font-bold text-base text-[--Shade-900]">
                  Transaction Details
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-normal text-md text-[--Shade-900]">
                    <h1>Category: {selectedTheater.dimensionCategory}</h1>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="font-normal text-lg text-[--Shade-900]">
                      <h1>{selectedTheater.price}</h1>
                    </div>
                    <div className="font-bold text-lg text-[--Shade-700]">
                      <h1>x{selectedSeats.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-3 bg-[--Shade-200] h-[1.6px]" />

            <div className="mt-5 mb-5">
              <div className="font-bold text-base text-[--Shade-900] my-2">
                Promo & Voucher
              </div>
              <div className="text-xs text-red-500 font-medium">
                {invalid && (
                  <p>
                    <sup>*</sup>Invalid Voucher Code!
                  </p>
                )}
              </div>
              <div>
                <div className="font-normal text-md text-[--Shade-900] flex justify-between items-center">
                  <div className="w-8/12 border border-[--Shade-300] rounded-lg p-1 px-3 outline-none">
                    {discount ? (
                      <input
                        type="text"
                        className="outline-none"
                        placeholder="Apply coupan code"
                        onChange={changeHandler}
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        className="outline-none"
                        placeholder="Apply coupan code"
                        onChange={changeHandler}
                      />
                    )}
                  </div>
                  <div className="border border-[--Shade-300] bg-white text-black rounded-lg p-1 ">
                    {discount ? (
                      <button
                        className="bg-white px-1"
                        onClick={discountHandler}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="bg-white px-1"
                        onClick={discountHandler}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4 bg-[--Shade-200] h-[1.6px]" />

            <div className="mt-8 flex items-center justify-between font-bold text-base text-[--Shade-700]">
              <div>Total Payment</div>
              <div>
                <h1>{finalAmount}</h1>
              </div>
            </div>
            <hr className="mt-3 bg-[--Shade-200] h-[1.6px]" />

            <div className="mt-5 text-xs text-red-500 font-medium">
              <sup>*</sup>The ticket purchase cannot be canceled.
            </div>
            <Link to={"/payment-success"} onClick={clickHandler}>
              <div className="mt-5 cursor-pointer hover:text-[--Sunshine-Yellow]  border h-12 flex justify-center items-center rounded-lg bg-[--Royal-Blue] text-[--Sunshine-Yellow] font-medium text-xl">
                <div className="hover:text-[--Sunshine-Yellow]">
                  Buy Tickets
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
