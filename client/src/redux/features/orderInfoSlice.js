import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STORAGE_KEY = "order_info";

const initialState = {
  orderInfo: {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    payment: "cod",
    cartTotal: 0,
    cart: { items: [] },
  },
  status: "idle", // loading | succeeded | failed
  error: "",
  message: "",
};

//
// ============ ASYNC THUNKS ============
//

// ✅ Khởi tạo từ localStorage
export const initFromLocal = createAsyncThunk(
  "order/initFromLocal",
  async (_, { rejectWithValue }) => {
    if (typeof window === "undefined") return initialState.orderInfo;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw || "null");

      if (parsed && typeof parsed === "object") {
        // Chuẩn hóa cấu trúc giỏ hàng
        if (!parsed.cart || typeof parsed.cart !== "object") parsed.cart = { items: [] };
        if (!Array.isArray(parsed.cart.items)) parsed.cart.items = [];

        // Đồng bộ với "cart_items"
        try {
          const rawCart = localStorage.getItem("cart_items");
          const cartList = rawCart ? JSON.parse(rawCart) : [];
          if (Array.isArray(cartList)) parsed.cart.items = cartList;
        } catch {}

        return { ...initialState.orderInfo, ...parsed };
      }
    } catch (err) {
      return rejectWithValue("Không thể đọc dữ liệu đơn hàng từ localStorage.");
    }

    return initialState.orderInfo;
  }
);

// ✅ Lưu thông tin đơn hàng vào localStorage
export const saveToLocal = createAsyncThunk(
  "order/saveToLocal",
  async (data, { rejectWithValue }) => {
    if (typeof window === "undefined") return data;
    try {
      const payload = data && typeof data === "object"
        ? { ...initialState.orderInfo, ...data }
        : { ...initialState.orderInfo };

      // Nếu chưa có giỏ hàng → lấy từ cart_items
      if (!payload.cart || typeof payload.cart !== "object") payload.cart = { items: [] };
      if (!Array.isArray(payload.cart.items) || payload.cart.items.length === 0) {
        try {
          const rawCart = localStorage.getItem("cart_items");
          const cartList = rawCart ? JSON.parse(rawCart) : [];
          if (Array.isArray(cartList)) payload.cart.items = cartList;
        } catch {}
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    } catch (err) {
      return rejectWithValue("Lỗi khi lưu thông tin đơn hàng.");
    }
  }
);

// ✅ Gọi API tạo đơn hàng thật (POST /api/orders/makeOrder)
export const makeOrder = createAsyncThunk(
  "order/makeOrder",
  async (_, { getState, rejectWithValue }) => {
    const root = getState();
    const orderInfo = root.orderInfo?.orderInfo || {};
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    try {
      const rawCart = localStorage.getItem("cart_items");
      const list = rawCart ? JSON.parse(rawCart) : [];
      const selected = Array.isArray(list) ? list.filter((it) => it.selected) : [];

      if (selected.length === 0) {
        return rejectWithValue("Vui lòng chọn ít nhất 1 sản phẩm trong giỏ hàng.");
      }

      const orderDetails = selected.map((it) => ({
        product_id: it.product_id,
        product_name: it.product_name || it.name || "",
        quantity: Math.max(1, Number(it.quantity) || 1),
        unit_price: Number(it.unit_price ?? it.price ?? 0) || 0,
        discount: Math.max(0, Number(it.discount ?? it.discount_price ?? 0) || 0),
      }));

      const total_amount = orderDetails.reduce((sum, d) => {
        const price = Math.max(0, (Number(d.unit_price) || 0) - (Number(d.discount) || 0));
        return sum + price * d.quantity;
      }, 0);

      const resp = await axios.post(
        "http://localhost:8000/api/orders/makeOrder",
        {
          shipping_address: String(orderInfo.address || "").trim(),
          total_amount,
          orderDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (resp.status >= 200 && resp.status < 300) {
        localStorage.setItem("cart_items", JSON.stringify([]));
        return resp.data;
      }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Đặt hàng thất bại.");
    }
  }
);

//
// ============ SLICE ============
//
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.orderInfo) state.orderInfo[key] = value;
    },
    setAll: (state, action) => {
      state.orderInfo = { ...initialState.orderInfo, ...action.payload };
    },
    clearOrder: (state) => {
      state.orderInfo = { ...initialState.orderInfo };
      state.status = "idle";
      state.error = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // --- initFromLocal ---
      .addCase(initFromLocal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initFromLocal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderInfo = action.payload;
      })
      .addCase(initFromLocal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- saveToLocal ---
      .addCase(saveToLocal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderInfo = action.payload;
      })
      .addCase(saveToLocal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- makeOrder ---
      .addCase(makeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload?.message || "Đặt hàng thành công!";
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

//
// ============ SELECTORS ============
//
export const { setField, setAll, clearOrder } = orderSlice.actions;
export const selectOrderInfo = (state) => state.orderInfo.orderInfo;
export const selectCartItems = (state) => state.orderInfo.orderInfo.cart.items;
export const selectCartTotal = (state) => {
  const items = state.orderInfo.orderInfo.cart.items || [];
  return items.reduce((sum, it) => {
    const unit = Number(it.unit_price || 0);
    const discount = Math.max(0, Number(it.discount || 0));
    const price = Math.max(0, unit - discount);
    const qty = Math.max(1, Number(it.quantity || 1));
    return sum + price * qty;
  }, 0);
};

export default orderSlice.reducer;
