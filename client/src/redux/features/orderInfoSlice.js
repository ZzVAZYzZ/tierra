import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const blank = {
  fullName: "",
  phone: "",
  email: "",
  birthday: "",
  province: "",
  district: "",
  ward: "",
  street: "",
  payment: "cod",
  note: "",
};

const STORAGE_KEY = "order_info";

export const initFromLocal = createAsyncThunk(
  "orderInfo/initFromLocal",
  async () => {
    if (typeof window === "undefined") return blank;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw || "null");
      if (parsed && typeof parsed === "object") {
        return { ...blank, ...parsed };
      }
    } catch {}
    return blank;
  }
);

export const saveToLocal = createAsyncThunk(
  "orderInfo/saveToLocal",
  async (data) => {
    if (typeof window === "undefined") return data || blank;
    try {
      const payload = data && typeof data === "object" ? data : blank;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
    return data || blank;
  }
);

const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: blank,
  reducers: {
    setField: (state, action) => {
      const { key, value } = action.payload || {};
      if (key in state) state[key] = value;
    },
    setAll: (state, action) => {
      const src = action.payload || {};
      Object.assign(state, { ...blank, ...src });
    },
    clear: () => ({ ...blank }),
  },
  extraReducers: (builder) => {
    builder.addCase(initFromLocal.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setField, setAll, clear } = orderInfoSlice.actions;
export const selectOrderInfo = (state) => state.orderInfo;
export default orderInfoSlice.reducer;

