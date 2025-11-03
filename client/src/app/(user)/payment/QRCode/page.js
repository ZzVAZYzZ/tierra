import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Page() {
    
    // 💡 CHỈNH SỬA DỮ LIỆU TEST
    const testData = {
        orderId: "ORD-987654321", // Ví dụ dùng order ID
        amount: 150000,
        user: "Vazy J",
    };

    // Chuẩn bị dữ liệu để mã hóa
    const jsonString = JSON.stringify(testData);

    // Lưu ý: Đảm bảo đây là ĐỊA CHỈ IP NỘI BỘ chính xác của bạn
    const backendIp = "192.168.1.10"; 
    const backendUrl = `http://${backendIp}:8000/api/test-qr-scan`;
    
    // Thêm encodeURIComponent để đảm bảo chuỗi JSON được truyền an toàn qua URL
    const encodedJson = encodeURIComponent(jsonString);

    // URL cuối cùng được mã hóa trong QR code
    const dataToEncode = `${backendUrl}?data=${encodedJson}&timestamp=${Date.now()}`;

    // --- STYLE OBJECTS ---
    const containerStyle = {
        maxWidth: '450px',
        margin: '50px auto',
        padding: '30px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)', // Đổ bóng nhẹ
        fontFamily: 'Arial, sans-serif',
    };
    
    const dataSectionStyle = {
        textAlign: 'left',
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f7fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    };
    
    const qrWrapperStyle = {
        marginBottom: '25px',
        padding: '15px',
        border: '3px solid #4c51bf', // Border nổi bật
        borderRadius: '10px',
        display: 'inline-block',
        backgroundColor: '#ffffff',
    };

    return (
        <div style={containerStyle}>
            
            <h2 style={{ color: '#4c51bf', marginBottom: '10px' }}>
                💰 Thanh toán bằng Mã QR
            </h2>
            <p style={{ color: '#718096', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                Quét mã dưới đây bằng điện thoại để hoàn tất.
            </p>

            {/* KHU VỰC MÃ QR */}
            <div style={qrWrapperStyle}>
                <QRCodeSVG
                    value={dataToEncode}
                    size={250}
                    level="H"
                    fgColor="#1a202c"
                    // Thêm nền trắng rõ ràng
                    bgColor="#ffffff" 
                />
            </div>
            
            {/* HIỂN THỊ DỮ LIỆU MÃ HÓA DỄ ĐỌC HƠN */}
            <div style={dataSectionStyle}>
                <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Chi tiết giao dịch (Mã hóa)</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
                    <li style={{ marginBottom: '5px' }}>
                        **Mã Đơn hàng:** <span style={{ float: 'right', fontWeight: 'bold', color: '#38a169' }}>{testData.orderId}</span>
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        **Số tiền:** <span style={{ float: 'right' }}>{testData.amount.toLocaleString()} VND</span>
                    </li>
                    <li style={{ marginBottom: '5px' }}>
                        **Người dùng:** <span style={{ float: 'right' }}>{testData.user}</span>
                    </li>
                    {/* <li style={{ borderTop: '1px dotted #a0aec0', marginTop: '10px', paddingTop: '5px' }}>
                        **Endpoint:** <code style={{ float: 'right', fontSize: '11px', wordBreak: 'break-all' }}>{backendIp}:8000/api/test-qr-scan</code>
                    </li> */}
                </ul>
            </div>

            <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '20px' }}>
                *Dữ liệu mã hóa: {dataToEncode.substring(0, 70)}...*
            </p>
        </div>
    );
}