import { createSlice } from "@reduxjs/toolkit";
import Feed from "../Components/feed";

const FeedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addUserFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((e) => e._id != action.payload);
      return newFeed;
    },
  },
});

export const { addUserFeed, removeFeed } = FeedSlice.actions;
export const feedReducer = FeedSlice.reducer;
