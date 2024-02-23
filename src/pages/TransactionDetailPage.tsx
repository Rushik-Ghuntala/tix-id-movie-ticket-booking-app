import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { TicketEntry } from "../redux/Slices/MyTicketSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BsDownload } from "react-icons/bs";

const TransactionDetailPage = () => {
  const { tickets } = useSelector((state: any) => state.myTicket);

  const [data, setData] = useState<TicketEntry>();

  const location = useLocation();
  const token = location.pathname.split("/").at(-1);

  console.log(token);

  useEffect(() => {
    console.log(tickets);
    const filteredTicket = tickets.filter(
      (ticket: TicketEntry) => ticket.token === parseInt(token)
    );
    console.log(filteredTicket);
    // setData(filteredTicket[0]);

    if (filteredTicket) {
      setData(filteredTicket[0]);
    }
  }, [tickets, token]);

  const formatDate = (dateString?: Date) => {
    if (dateString) {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    }
    return "-";
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center font-bold text-4xl m-8 mt-[7rem]">
        Transaction Details
      </div>

      {/* MAIN CONTENT  */}
      <div className="w-6/12 mx-auto">
        <div className="flex flex-col h-70 p-10 bg-[--Royal-Blue] rounded-t-2xl">
          <p className="font-medium text-2xl text-[--Pastel-Yellow] py-4">
            {data?.movie.name}
          </p>

          <div className="flex items-center w-full justify-between">
            <div className="w-full">
              <div className="flex flex-col my-4">
                <p className="text-[--Shade-400] text-sm font-medium">
                  Location
                </p>
                <p className="text-[--Shade-100] text-lg font-medium">
                  {data?.theater.theaterName}
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-[--Shade-400] text-sm font-medium">Date</p>
                  <p className="text-[--Shade-100] text-lg font-medium">
                    {formatDate(data?.date)}
                  </p>
                </div>
                <div>
                  <p className="text-[--Shade-400] text-sm font-medium">Time</p>
                  <p className="text-[--Shade-100] text-lg font-medium">
                    {data?.time}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <hr className="w-[130px] h-[1px] bg-[--Shade-300] rounded-xl rotate-90" />
            </div>

            <div className="w-full">
              <div className="my-4">
                <p className="text-[--Shade-400]">Class</p>
                <p className="text-[--Shade-100]">
                  {data?.theater.dimensionCategory}
                </p>
              </div>
              <div>
                <p className="text-[--Shade-400]">Badge</p>
                <p className="text-[--Shade-100]">{data?.theater.badge}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[--Pastel-Yellow] h-70 p-10 flex rounded-b-2xl">
          <div className="w-full flex items-center gap-x-8 ">
            <div className="flex flex-col gap-y-3">
              <p className="font-medium text-lg">Token:</p>
              <p className="font-medium text-lg">Seats:</p>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="font-medium text-lg">{data?.token}</p>
              <p className="flex gap-2">
                {data?.seat.map((chair, index) => (
                  <p key={index} className="font-medium text-lg">
                    {chair}
                  </p>
                ))}
              </p>
            </div>
          </div>
          <div className=" w-full flex justify-center items-center">
            <div className="border-2 rounded-lg border-black  p-4">
              <BsDownload size={35} />
            </div>
          </div>
        </div>
      </div>

      {/* BILL SECTION  */}
      <div className="w-6/12 mx-auto my-8">
        <p className="font-medium text-2xl">Purchase Details</p>

        <div className="font-normal text-lg my-4">
          <div className="flex justify-between my-4">
            <div>
              <p className="my-2">Total Amount</p>
              <p>Discount</p>
            </div>

            <div>
              <p className="my-2">{`\b\b ${data?.totalPrice}`}</p>
              <div className="flex items-cemter justify-end">
                <p>-</p>
                <p>{data?.discount}</p>
              </div>
            </div>
          </div>

          <hr className="w-full my-4" />

          <div className="flex justify-between">
            <div>Final Amount</div>
            <div>{data?.finalAmount}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransactionDetailPage;
