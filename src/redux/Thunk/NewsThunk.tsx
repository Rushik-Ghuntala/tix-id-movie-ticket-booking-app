import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsData } from "../../data-API/news-data";



export const showNewsData = createAsyncThunk(
    'showNewsData',
    async (args, {rejectWithValue}) => {

        try{
            const newsResult = newsData;
            return newsResult;
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)