import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const blank = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  payment: "cod",
  cartTotal: 0,
  cart: { items: [] },
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
        // 👇 Dọn giá trị birthday không hợp lệ
        if (
          parsed.birthday === "00/00" ||
          parsed.birthday === "00/00/0000" ||
          parsed.birthday === "00/00/" ||
          parsed.birthday === "0" ||
          parsed.birthday === "00"
        ) {
          parsed.birthday = "";
        }
        // Đảm bảo có cấu trúc giỏ hàng
        if (!parsed.cart || typeof parsed.cart !== "object") {
          parsed.cart = { items: [] };
        } else if (!Array.isArray(parsed.cart.items)) {
          parsed.cart.items = [];
        }
        // Đồng bộ giỏ hàng với key cart_items (nếu có)
        try {
          const rawCart = localStorage.getItem("cart_items");
          const cartList = rawCart ? JSON.parse(rawCart) : [];
          if (Array.isArray(cartList)) {
            parsed.cart.items = cartList;
          }
        } catch {}
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
      const payload = data && typeof data === "object" ? { ...blank, ...data } : { ...blank };
      // Đảm bảo cart tồn tại và có items; nếu thiếu thì lấy từ cart_items
      if (!payload.cart || typeof payload.cart !== "object") payload.cart = { items: [] };
      if (!Array.isArray(payload.cart.items) || payload.cart.items.length === 0) {
        try {
          const rawCart = localStorage.getItem("cart_items");
          const cartList = rawCart ? JSON.parse(rawCart) : [];
          if (Array.isArray(cartList)) payload.cart.items = cartList;
        } catch {}
      }
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
    // --- Cart reducers ---
    addItem: (state, action) => {
      const it = action.payload || {};
      const product_id = String(it.product_id || "").trim();
      if (!product_id) return;
      const existing = state.cart.items.find((x) => x.product_id === product_id);
      const qty = Number(it.quantity || 1);
      const unit = Number(it.unit_price || 0);
      const discount = Number(it.discount || 0);
      if (existing) {
        existing.quantity = Math.max(1, (Number(existing.quantity) || 1) + qty);
      } else {
        state.cart.items.push({
          product_id,
          product_name: it.product_name || "",
          quantity: Math.max(1, qty),
          unit_price: unit,
          discount: Math.max(0, discount),
          selected: it.selected ?? true,
        });
      }
    },
    removeItem: (state, action) => {
      const id = String(action.payload || "").trim();
      if (!id) return;
      state.cart.items = state.cart.items.filter((x) => x.product_id !== id);
    },
    updateQuantity: (state, action) => {
      const { product_id, quantity } = action.payload || {};
      const id = String(product_id || "").trim();
      if (!id) return;
      const found = state.cart.items.find((x) => x.product_id === id);
      if (found) {
        const q = Math.max(1, Number(quantity || 1));
        found.quantity = q;
      }
    },
    toggleSelect: (state, action) => {
      const { product_id, selected } = action.payload || {};
      const id = String(product_id || "").trim();
      if (!id) return;
      const found = state.cart.items.find((x) => x.product_id === id);
      if (found) {
        found.selected = selected ?? !found.selected;
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initFromLocal.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setField, setAll, clear, addItem, removeItem, updateQuantity, toggleSelect, clearCart } = orderInfoSlice.actions;
export const selectOrderInfo = (state) => state.orderInfo;
export const selectCart = (state) => state.orderInfo.cart;
export const selectCartItems = (state) => state.orderInfo.cart.items;
export const selectCartTotal = (state) => {
  const items = state.orderInfo.cart.items || [];
  return items.reduce((sum, it) => {
    const unit = Number(it.unit_price || 0);
    const discount = Math.max(0, Number(it.discount || 0));
    const price = Math.max(0, unit - discount);
    const qty = Math.max(1, Number(it.quantity || 1));
    return sum + price * qty;
  }, 0);
};
export default orderInfoSlice.reducer;

