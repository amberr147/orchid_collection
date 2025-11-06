import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orchidsData from "../../service/orchidsService";

export const fetchOrchids = createAsyncThunk("orchids/fetchAll", async () => {
  return await orchidsData.fetchAll();
});
export const createOrchid = createAsyncThunk(
  "orchids/create",
  async (payload) => {
    return await orchidsData.create(payload);
  }
);
export const updateOrchid = createAsyncThunk(
  "orchids/update",
  async ({ id, payload }) => {
    return await orchidsData.update(id, payload);
  }
);
export const deleteOrchid = createAsyncThunk("orchids/delete", async (id) => {
  await orchidsData.remove(id);
  return id;
});

const orchidsSlice = createSlice({
  name: "orchids",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrchids.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.status = "successful";
        state.items = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createOrchid.fulfilled, (state, action) => {
        state.status = "successful";
        state.items.push(action.payload);
      })
      .addCase(createOrchid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrchid.fulfilled, (state, action) => {
        state.status = "successful";
        const idx = state.items.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateOrchid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrchid.fulfilled, (state, action) => {
        state.status = "successful";
        state.items = state.items.filter((o) => o.id !== action.payload);
      })
      .addCase(deleteOrchid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orchidsSlice.reducer;
