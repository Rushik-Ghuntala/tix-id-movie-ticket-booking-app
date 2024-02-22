// import React from 'react'

import { useEffect, useState } from "react";
// import { TheaterData, theaterData } from "../data-API/theater-data";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MoviesData, movies } from "../data-API/movies-data";
// import { DimensionData, TheaterData, theaterData } from "../data-API/theater-data";
import Navbar from "../components/Navbar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import DateSelector from "../components/DateSelector";
import { showTheaterData } from "../redux/Thunk/TheaterThunk";
import { useDispatch, useSelector } from "react-redux";
import { DimensionData, TheaterData } from "../data";
import { selectTime, selectTimeSlote, setTheaterData } from "../redux/Slices/MovieBookingSlice";


const MovieSchedulePage = () => {

    const dispatch = useDispatch()

    const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
        theaterName: string;
        dimensionCategory: string;
        time: string;
        price: string;
    } | null>(null);

    useEffect(() => {
        dispatch(showTheaterData() as any)
    },[])

    const {theaterData, loading} = useSelector((state: {theater: {theaterData: TheaterData[], loading: boolean}}) => state.theater);

    console.log("Theater Data from Thunk: ", theaterData)


    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(null); 

    const handleMovieSelect = (theater: any) => {
        setSelectedTheater(theater);
        if (selectedDate) {

            //Minute me convert ho gya
            const timezoneOffset = selectedDate.getTimezoneOffset() * 60000; 
            const selectedDateAdjusted = new Date(selectedDate.getTime() - timezoneOffset);
            const selectedDateOnly = selectedDateAdjusted.toISOString().split('T')[0];

            setSelectedDateTime(selectedDateOnly as any); 
            dispatch(setTheaterData({ theater, dateTime: selectedDateOnly }));
        } else {
            console.error("No date selected.");
        }
    };



    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [tid, setTid] = useState("");

    

    // const [selectedTheaterId, setSelectedTheaterId] = useState("")

    const handleDateSelection = (date: Date) => {
        setSelectedDate(date);
        console.log("Selected date: " , selectedDate)
    };

    const handleTimeSlotSelection = (theaterName: string, dimensionCategory: string, time: string, price: string) => {
        setSelectedTimeSlot({ theaterName, dimensionCategory, time, price });
        console.log("Selected Time Slot Data: ", selectedTimeSlot)
    };

    

    const [searchParams, setSearchParams] = useSearchParams();
    const [movieData, setMovieData] = useState<MoviesData>();
    // const [cinemaData, setCinemaData] = useState<TheaterData>();
    const [cinemaData, setCinemaData] = useState<TheaterData[]>([]);


    // const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedBadge, setSelectedBadge] = useState<string>('all');
    const [selectedDimension, setSelectedDimension] = useState<string>('all');
    const [selectedCity, setSelectedCity] = useState<string>('surat');
    const [searchText, setSearchText] = useState<string>('');
    

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // setSelectedCity(event.target.value);
        // setSelectedBadge(event.target.value);
        // setSelectedDimension(event.target.value);
        // console.log(selectedCity)
        // console.log(selectedBadge)
        // console.log(selectedDimension)

        const { name, value } = event.target;
        if (name === "city") {
            setSelectedCity(value);
        } else if (name === "badge") {
            setSelectedBadge(value);
        } else if (name === "dimension") {
            setSelectedDimension(value);
        }
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    // const filteredTheaters = theaterData.filter(theater =>
    //     theater.city.toLowerCase() === selectedCity.toLowerCase() &&
    //     theater.name.toLowerCase().includes(searchText.toLowerCase())
    // );

    const filteredTheaters = theaterData.filter(theater =>
        theater.city.toLowerCase() === selectedCity.toLowerCase() &&
        theater.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedBadge === 'all' || theater.badge === selectedBadge) &&
        theater.dimension.some(dimension =>
            selectedDimension === 'all' || dimension.dimensionCategory === selectedDimension
        )
    );

      
    

    const getId = () => {
        const id = searchParams.get("id");
        if (id) {
            const movie = movies.find(movieData => movieData.id === +id);
            if (movie) {
                setMovieData(movie);
                console.log(movie.name);
            }
        }
    };
    

    const getTheaterData = () => {
        const city = selectedCity.toLowerCase();
        console.log("selectedCity:", city)
        const theatersInCity = theaterData.filter(theater => theater.city.toLowerCase() === city);
        console.log("theaterData", theatersInCity);
        setCinemaData(theatersInCity); 
        console.log(theatersInCity);
    };

    useEffect(() => {
        getId();
        getTheaterData();
        
    }, [selectedCity])

    // const renderDimensionCategories = (dimensionData: DimensionData[] | undefined) => {
    //     if (!dimensionData) return null;
        
    //     return cinemaData.map((filter) => (filter.dimension.map((dimension) => (
    //         <div key={dimension.dimensionCategory}>
    //             <h3>{dimension.dimensionCategory}</h3>
    //             <h3>{dimension.price}</h3>
    //             <ul>
    //                 {dimension.time.map((time, index) => (
    //                     <li key={index}>
    //                         {time}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     ))))
    // };


    

    

    // {console.log("Theater Data:", theaterData)}


    return (
        
        <div>
            {/* TESTING  */}
            {/* <div>MovieSchedulePage</div>
            <div>{movieData?.name}</div>
            <div>{cinemaData?.name}</div> */}

            <Navbar/>
            <div className="w-11/12 flex mx-auto">

            {/* LEFT CONTAINER  */}
            <div className="w-2/4 border">
                <div>Schedule</div>
                <div>Choose the cinema schedule you want to watch</div>

                <div className="w-11/12 h-20 border mx-auto">
                    <DateSelector onDateSelect={handleDateSelection}/>
                    <hr/>
                </div>

                <form>
                    <div className="flex items-center gap-x-2">
                        <div><HiOutlineLocationMarker/></div>
                        <div>
                            <select id="city" name="city" value={selectedCity} onChange={handleDropdownChange}>
                                <option value="all">CITY</option>
                                <option value="surat">Surat</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="ahmedabad">Ahmedabad</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <div>
                            <input type="text" id="search" name="search" placeholder="Search Theater" value={searchText} onChange={handleSearchInputChange} className="outline rounded-sm"/>
                        </div>
                        <div>
                            <select id="badge" name="badge" value={selectedBadge} onChange={handleDropdownChange}>
                                <option value="all">BADGE</option>
                                <option value="CGV">CGV</option>
                                <option value="CINEPOLIS">CINEPOLIS</option>
                                <option value="XXI">XXI</option>
                            </select>
                        </div>
                        <div>
                            <select id="dimension" name="dimension" value={selectedDimension} onChange={handleDropdownChange}>
                                <option value="all">DIMENSION</option>
                                <option value="Regular 2D">Regular 2D</option>
                                <option value="Gold Class 2D">Gold Class 2D</option>
                                <option value="Velvet 2D">Velvet 2D</option>
                                <option value="2D">2D</option>
                            </select>
                        </div>
                    </div>
                </form>


                {/* THEATER SECTION  */}
                <div>
                    {/* {cinemaData.map((theater) => (
                        <div key={theater.id}>
                            <h2>{theater.name}</h2>
                            <p>{theater.address}</p>
                            {renderDimensionCategories(theater.dimension)}
                        </div>
                    ))} */}
                    {/* Render filtered theaters */}
                    {filteredTheaters.map(theater => (
                        <div key={theater.id} onClick={() => setTid(theater.id)}>
                            <h2>{theater.name}</h2>
                            <p>{theater.address}</p>
                            {/* {renderDimensionCategories(theater.dimension)} */}
                            <p>{theater.city}</p>
                            <p>{theater.badge}</p>
                            
                            {/* <h1>hello</h1> */}
                            <ul>
                                {theater.dimension.map((dimension: DimensionData) => (
                                    <li key={dimension.dimensionCategory} onClick={() => dispatch(selectTimeSlote(dimension.time))}>
                                        <div>{dimension.dimensionCategory}</div>
                                        <ul>
                                            {dimension.time.map((time, index) => (
                                                <li key={index} onClick={() => (handleTimeSlotSelection(theater.name, dimension.dimensionCategory, time, dimension.price), dispatch(selectTime(time)))}>
                                                    {time}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>


            {/* RIGHT CONTAINER  */}
            <div className="w-2/4 border">
                <div className="w-[25rem] flex flex-col gap-y-8">
                    <div>
                        <img src={movieData?.image} alt="image" className="w-[25rem] h-[30rem] rounded-lg shadow-lg "/> 
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-medium">{movieData?.name}</div>
                        <div className="flex gap-x-12">
                            <div className="flex flex-col gap-y-3">
                                <div>Genre</div>
                                <div>Duration</div>
                                <div>Director</div>
                                <div>Rated</div>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <div>{movieData?.genre}</div>
                                <div>{movieData?.duration}</div>
                                <div>{movieData?.director}</div>
                                <div>{movieData?.rated}</div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>

                {/* SHOW DATE  */}
                <div>
                    <div className="mt-4 text-center">Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : "No date selected"}</div>

                    <div className="mt-4 text-center">
                        Selected Time Slot: 
                        {selectedTimeSlot ? `${selectedTimeSlot.time} - ${selectedTimeSlot.theaterName} - ${selectedTimeSlot.dimensionCategory} ` : "No time slot selected"}
                        
                    </div>

                    {selectedDate && selectedTimeSlot && (
                        <Link to={`/movie-schedule/seat-selection?id=${tid}`}>
                            <button onClick={() => handleMovieSelect(selectedTimeSlot)}>Continue</button>
                        </Link>
                    )}  
                </div>
            </div>


            </div>
            
            
        </div>
    )
}

export default MovieSchedulePage