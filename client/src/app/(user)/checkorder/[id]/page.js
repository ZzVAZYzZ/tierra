"use client"
// OrderTracking.jsx
import React from 'react';
import { Package, DollarSign, Truck, CheckCircle, XCircle } from 'lucide-react';
import OrderItemCard from './components/OrderItemCard'; // Import component mới

// Ánh xạ trạng thái API sang giao diện và icon
const STATUS_STEPS = [
    { apiStatus: "created", label: "Chờ xác nhận", icon: Package },
    { apiStatus: "paid", label: "Thanh Toán", icon: DollarSign },
    { apiStatus: "shipping", label: "Chờ giao hàng", icon: Truck },
    { apiStatus: "completed", label: "Đã nhận hàng", icon: CheckCircle },
];

// Dữ liệu mock (có nhiều hơn 3 sản phẩm để kiểm tra scroll)
const mockOrder = {
    status: "completed", // Trạng thái mẫu: Đang đóng gói
    orderDetails: [
        { product_name: "18K Bông tai S111", unit_price: 20990000, quantity: 1 },
        { product_name: "Nhẫn Kim Cương N002", unit_price: 55000000, quantity: 1 },
        { product_name: "Dây Chuyền Vàng 999", unit_price: 15500000, quantity: 2 },
        { product_name: "Lắc Tay Bạc X004", unit_price: 1590000, quantity: 3 }, // Sản phẩm thứ 4
    ]
};

const OrderTracking = ({ order = mockOrder }) => {
    const currentStatus = order.status;
    const isCancelled = currentStatus === 'cancelled';
    const activeIndex = STATUS_STEPS.findIndex(step => step.apiStatus === currentStatus);
    
    // Tính toán độ rộng của đường tiến trình hoàn thành
    const progressWidth = activeIndex >= 0 ? (activeIndex / (STATUS_STEPS.length - 1)) * 100 : 0;

    // Xác định nhãn hiển thị trong tag trạng thái hiện tại
    let currentTagLabel = "Đang xử lý";
    if (isCancelled) {
        currentTagLabel = "ĐÃ HỦY";
    } else {
        // Ánh xạ cụ thể để khớp với mẫu: created/paid đều là "Đang đóng gói"
        if (currentStatus === 'created' || currentStatus === 'paid') {
            currentTagLabel = "Đang đóng gói";
        } else if (currentStatus === 'shipping') {
            currentTagLabel = "Đang giao hàng";
        } else if (currentStatus === 'completed') {
            currentTagLabel = "Đã nhận hàng";
        }
    }

    const maxItems = 3;
    const isScrollable = order.orderDetails.length > maxItems;

    // --- RENDER COMPONENT ---
    return (
        <div className="max-w-4xl mx-auto p-4 font-sans">
            
            {/* 1. PROGRESS BAR / THANH TIẾN TRÌNH */}
            <div className="bg-stone-100 p-6 rounded-lg mb-6 shadow-sm"> {/* Nền màu nhạt, giống mẫu */}
                {isCancelled ? (
                    <div className="flex items-center justify-center space-x-2 p-4 bg-red-100 text-red-700 font-bold rounded-md">
                        <XCircle className="w-6 h-6" />
                        <span>ĐƠN HÀNG ĐÃ BỊ HỦY</span>
                    </div>
                ) : (
                    <div className="relative flex justify-between items-center px-2">
                        {/* Đường gạch nền (Chưa hoàn thành) */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0 mx-2"></div>
                        
                        {/* Đường gạch tiến trình (Hoàn thành) */}
                        <div 
                            className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 transition-all duration-500 transform -translate-y-1/2 z-10 mx-2"
                            style={{ width: `${progressWidth}%` }}
                        ></div>

                        {STATUS_STEPS.map((step, index) => {
                            const isCompleted = index < activeIndex; // Đã hoàn thành (các bước trước)
                            const isActive = index === activeIndex; // Đang diễn ra (bước hiện tại)
                            const IconComponent = step.icon;

                            return (
                                <div 
                                    key={step.apiStatus} 
                                    className={`relative z-20 flex-1 text-center ${index > 0 ? '-ml-2' : ''}`}
                                >
                                    {/* Icon Wrapper/Circle */}
                                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 transition-colors duration-300 shadow-lg
                                        ${isCompleted || isActive
                                            ? 'bg-neutral-900' // Màu đen cho trạng thái hoàn thành/đang diễn ra
                                            : 'bg-stone-100 border-2 border-gray-400' // Màu nền nhạt cho trạng thái chưa tới
                                        }`}
                                    >
                                        <IconComponent 
                                            className={`w-5 h-5 transition-colors duration-300 
                                                ${isCompleted || isActive ? 'text-white' : 'text-gray-500'}`} 
                                        />
                                    </div>
                                    
                                    {/* Label */}
                                    <p className={`text-sm mt-1 transition-colors duration-300 
                                        ${isCompleted || isActive ? 'text-neutral-900 font-bold' : 'text-gray-700'}`}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 2. ORDER ITEMS LIST / DANH SÁCH SẢN PHẨM */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
                
                {/* Scrollable container for items */}
                <div 
                    className={`pb-4 ${isScrollable ? 'max-h-[300px] overflow-y-auto pr-4 custom-scrollbar' : ''}`}
                >
                    {order.orderDetails.map((item, index) => (
                        <OrderItemCard key={index} item={item} />
                    ))}
                </div>

                {/* Trạng thái hiện tại và nút Liên hệ */}
                <div className="pt-4 border-t border-gray-100 flex justify-end items-center mt-4">
                    {/* Tag trạng thái hiện tại (Đang đóng gói) */}
                    <div className={`px-5 py-3 rounded-md font-bold text-base mr-auto transition-colors duration-300
                         ${isCancelled 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-amber-200/80 text-neutral-800'
                        }`}
                    >
                        {currentTagLabel}
                    </div>

                    {/* Nút Liên hệ Shop */}
                    <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Liên hệ Shop
                    </button>
                </div>
            </div>

            {/* Thêm CSS cho scrollbar nếu cần tùy chỉnh sâu hơn */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db; /* gray-300 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: #f3f4f6; /* gray-100 */
                }
            `}</style>
        </div>
    );
};

export default OrderTracking;