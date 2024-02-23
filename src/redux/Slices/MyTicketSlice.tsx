import { createSlice } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  name: string;
  image: string;
}

interface Theater {
  id: string;
  name: string;
  dimensionCategory: string;
  time: string;
  price: number;
}

interface Date {
  date: string;
}

interface Time {
  time: string;
}

interface Seat {
  seat: string[];
}

export interface TicketEntry {
  movie: Movie;
  theater: Theater;
  date: Date;
  time: Time;
  seats: Seat[] | null;
  totalPrice: number;
  discount: number;
  finalAmount: number;
  token: number;
}

interface MyTicketState {
  tickets: TicketEntry[];
}

const initialState: MyTicketState = {
  tickets: [],
};

const MyTicketSlice = createSlice({
  name: "myTicket",
  initialState,
  reducers: {
    addTicket(state, action) {
      state.tickets.unshift(action.payload);
    },
    reset(state) {
      state.tickets = [];
    },
  },
});

export const { addTicket, reset } = MyTicketSlice.actions;
export default MyTicketSlice.reducer;
