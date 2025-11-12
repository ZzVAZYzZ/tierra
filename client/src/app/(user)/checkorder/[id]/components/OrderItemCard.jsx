"use client"
// OrderItemCard.jsx
import React from 'react';

const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const OrderItemCard = ({ item }) => (
    <div className="flex items-center py-2">
        <img 
            src="https://via.placeholder.com/80x80/f0e0c0/000000?text=SP" 
            alt={item.product_name} 
            className="w-20 h-20 object-cover mr-4" // Bỏ border-radius để giống mẫu hơn
        />
        <div className="flex-grow">
            <p className="font-bold text-lg text-neutral-800">{item.product_name}</p>
            <p className="text-gray-500 text-sm">SL:{item.quantity}</p>
        </div>
        <div className="font-bold text-xl ml-4 text-neutral-900 min-w-[120px] text-right">
            {formatCurrency(item.unit_price)}
        </div>
    </div>
);

export default OrderItemCard;