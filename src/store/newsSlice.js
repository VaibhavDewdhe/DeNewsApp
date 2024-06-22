import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = `${import.meta.env.VITE_APP_API_KEY}`;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const fetchArticles = createAsyncThunk(
  "news/fetchArticles",
  async ({ category, page, searchQuery }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}?country=us&pageSize=12&page=${page}&apiKey=${NEWS_API_KEY}`;
      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=12&page=${page}&apiKey=${NEWS_API_KEY}`;
      } else {
        url += `&category=${category}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error("Error response:", error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Request made but no response received
        console.error("Error request:", error.request);
        return rejectWithValue("No response received");
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    currentPage: 1,
    totalResults: 0,
    loading: true,
    category: "general",
    searchQuery: "",
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch articles";
      });
  },
});

export const { setCurrentPage, setCategory, setSearchQuery } =
  newsSlice.actions;
export default newsSlice.reducer;
