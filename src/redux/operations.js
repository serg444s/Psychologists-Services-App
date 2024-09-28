import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://662676df052332d55322f58b.mockapi.io";
const perPage = 4;

export const fetchCampers = createAsyncThunk('campers/fetchCampers', async (page, thunkAPI) => {
  console.log('Opetations fetchCampers page:', page);
  try {
  const response = await axios.get(`/campers?&page=${page}&limit=${perPage}`);
  return response.data;
  } catch (e) { 
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getStartCampers = createAsyncThunk('campers/getStartCampers', async (_, thunkAPI) => {
  console.log('Opetations getStartCampers (page 1)');
  try {
  const response = await axios.get(`/campers?&page=1&limit=${perPage}`);
  return response.data;
  } catch (e) { 
    return thunkAPI.rejectWithValue(e.message);
  }
});