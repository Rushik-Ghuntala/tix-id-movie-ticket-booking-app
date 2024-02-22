// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTime, setSelectedSeats } from '../redux/Slices/MovieBookingSlice'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const SeatSelectionPage = () => {

    // const [selectedSeat, setSelectedSeat] = useState<string[]>([]);


    

    const {selectedTheater, selectedTime} = useSelector((state: any) => state.movieBooking)

    console.log("Selectded Theater " , selectedTheater)

    // const { theaterName, dimensionCategory, time } = selectedTheater;

    const dispatch = useDispatch();
    const {selectedSeats, selectedTimeSlotsList} = useSelector((state: any) => state.movieBooking);

    const handleSeatClick = (seat: string) => {
        const updatedSeats = [...selectedSeats];
        const seatIndex = updatedSeats.indexOf(seat);
    
        if (seatIndex === -1 && selectedSeats.length < 5) {
            updatedSeats.push(seat);
        } else if (seatIndex !== -1) { 
            updatedSeats.splice(seatIndex, 1);
        } else if (selectedSeats.length >= 5) { 
            updatedSeats.shift();
            updatedSeats.push(seat); 
        }
        
    
        dispatch(setSelectedSeats(updatedSeats));
    };
    
    // console.log("Var of Seat: ", selectedSeat)

    // Function to render seat components
    const renderSeats = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const columns = Array.from({ length: 20 }, (_, index) => index + 1);

        return rows.map((row) => (
        <div key={row} className="flex gap-4 justify-between items-center">
            {columns.map((column) => {
            const seat = `${row}${column}`;
            const isSelected = selectedSeats.includes(seat);

            return (
                <div
                key={`${row}${column}`}
                className={`seat ${isSelected ? 'selected bg-red-300' : 'bg-gray-200'} rounded-md p-3 cursor-pointer`}
                onClick={() => handleSeatClick(seat)}
                >
                {row}
                {column}
                </div>
            );
            })}
        </div>
        ));
    };


    //storing all data in variable
    const [storedData, setStoredData] = useState({
        storedTheater : selectedTheater,
        storedTime : selectTime,
        storedSeat : selectedSeats,
    })

    console.log(storedData)


    

    return (
        <div>

            {/* <h2>Selected Theater: {theaterName}</h2>
            <h2>Dimension Category: {dimensionCategory}</h2> */}
            <h2>Selected Time: {selectedTime}</h2>
            <h2>All Time: {
                selectedTimeSlotsList.map((time: any) => (
                    <p onClick={() => (dispatch(selectTime(time)))}>{time}</p>
                ))
                }</h2>

            

            




        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Seat Selection</h2>
            <div className="grid grid-cols-20 gap-2 justify-center items-center">
            {renderSeats()}
            </div>
            <div>
            <h3 className="font-bold mb-2">Selected Seats:</h3>
            <ul>
                {selectedSeats.map((seat: string) => (
                <li key={seat}>{seat}</li>
                ))}
            </ul>
            </div>
        </div>



        <div>
            { selectedSeats.length != 0 &&

                <Link to={'/movie-schedule/seat-selection/confirm-payment'} >
                    <button>Continue</button>
                </Link>
            }
        </div>

        <div>

        </div>

        </div>
    );
};

export default SeatSelectionPage;
