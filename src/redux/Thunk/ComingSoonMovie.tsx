import { createAsyncThunk } from "@reduxjs/toolkit";
import { comingSoonMovies } from "../../data-API/coming-soon-movies";




export const showComingSoonMovie = createAsyncThunk(
    'showComingSoonMovie',
    async (args, {rejectWithValue}) => {

        try{
            const cominSoonMovieResult = comingSoonMovies;
            return cominSoonMovieResult;
        }   
        catch(error){
            return rejectWithValue(error)
        }

    }
)


