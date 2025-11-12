// hooks/useOrderHistory.js
"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ⚠️ Thay đổi đường dẫn import này cho phù hợp
import { fetchOrdersByUser, resetOrderHistoryState } from '../redux/features/orderHistorySlice'; 

export const useOrderHistory = () => {
    const dispatch = useDispatch();
    
    // 1. Lấy user_id từ userSlice
    const { user } = useSelector((state) => state.user); 
    const userId = user?.user_id; // Lấy user_id nếu user tồn tại
    
    // 2. Lấy dữ liệu và trạng thái từ orderHistorySlice
    // Giả định orderHistorySlice được đặt tên là 'orderHistory' trong root reducer
    const { orders, status, error } = useSelector((state) => state.orderHistory); 

    useEffect(() => {
        // Chỉ gọi API nếu có userId VÀ trạng thái đang là 'idle'
        // Tránh gọi lại nhiều lần nếu component re-render
        if (userId && status === 'idle') { 
            console.log(`Đang tải lịch sử đơn hàng cho User ID: ${userId}`);
            // Gọi thunk với userId. Thunk này chứa logic refresh token thủ công.
            dispatch(fetchOrdersByUser(userId));
        }
        
        // Cleanup: Reset trạng thái khi component unmount
        return () => {
             // Tùy chọn: Nếu bạn muốn xóa dữ liệu lịch sử khi người dùng rời khỏi trang
            //  dispatch(resetOrderHistoryState());
        };
    }, [userId, status, dispatch]);

    // Trả về dữ liệu và trạng thái đã được map lại
    return { 
        orders, 
        isLoading: status === 'loading', 
        isSuccess: status === 'succeeded',
        isError: status === 'failed', 
        error 
    };
};