// import React from 'react'

import { useEffect, useState } from "react";
// import { TheaterData, theaterData } from "../data-API/theater-data";
import { useSearchParams } from "react-router-dom";
import { MoviesData, movies } from "../data-API/movies-data";
import { DimensionData, TheaterData, theaterData } from "../data-API/theater-data";
import Navbar from "../components/Navbar";
import { HiOutlineLocationMarker } from "react-icons/hi";


const MovieSchedulePage = () => {

    

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
        setSelectedCity(event.target.value);
        setSelectedBadge(event.target.value);
        setSelectedDimension(event.target.value);
        console.log(selectedCity)
        console.log(selectedBadge)
        console.log(selectedDimension)
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const filteredTheaters = cinemaData.filter(theater =>
        theater.name.toLowerCase().includes(searchText.toLowerCase())
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
        const theatersInCity = theaterData.filter(theater => theater.city.toLowerCase() === city);
        setCinemaData(theatersInCity); // Set to all theaters in the city
        console.log(theatersInCity);
    };

    useEffect(() => {
        getId();
        getTheaterData();
        
    }, [selectedCity])

    const renderDimensionCategories = (dimensionData: DimensionData[] | undefined) => {
        if (!dimensionData) return null;
        
        return dimensionData.map(dimension => (
            <div key={dimension.dimensionCategory}>
                <h3>{dimension.dimensionCategory}</h3>
                <h3>{dimension.price}</h3>
                <ul>
                    {dimension.time.map((time, index) => (
                        <li key={index}>
                            {time}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };


    

    

    

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
                    DATE
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
                                <option value="CGV">CGV</option>
                                <option value="CINEPOLIS">CINEPOLIS</option>
                                <option value="XXI">XXI</option>
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
                        <div key={theater.id}>
                            <h2>{theater.name}</h2>
                            <p>{theater.address}</p>
                            {renderDimensionCategories(theater.dimension)}
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

            </div>


            </div>
            
            
        </div>
    )
}

export default MovieSchedulePage