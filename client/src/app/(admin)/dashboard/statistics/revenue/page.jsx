"use client";

import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import NavStatistical from "../../../components/navStatistical";
import { useFetchStatistics } from "../../../../../hook/useFetchStatistics";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ===== PLUGIN HIỂN THỊ TỔNG DOANH THU =====
const totalRevenuePlugin = {
  id: "totalRevenuePlugin",
  afterDraw(chart, args, pluginOptions) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const { right, top } = chartArea;
    const total = pluginOptions?.total;
    if (total == null) return;

    const text =
      "Tổng doanh thu: " + total.toLocaleString("vi-VN") + " VNĐ";

    ctx.save();

    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = 16;

    const paddingX = 8;
    const paddingY = 4;
    const margin = 8;

    let boxX = right - (textWidth + paddingX * 2) - margin;
    let boxY = top - (textHeight + paddingY * 2) - margin;
    if (boxY < margin) boxY = margin;

    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.strokeStyle = "#CBB58A";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(boxX, boxY, textWidth + paddingX * 2, textHeight + paddingY * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#111827";
    ctx.fillText(
      text,
      boxX + paddingX,
      boxY + (textHeight + paddingY * 2) / 2
    );

    ctx.restore();
  },
};

const Page = () => {
  const [mode, setMode] = useState("month"); // 'month' | 'year'
  const [view, setView] = useState("month"); // 'month' | 'year' | 'day'
  const [calendarMonth, setCalendarMonth] = useState(10); // 0-based
  const [calendarYear, setCalendarYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null); // {day, month, year}

  // xác định mode cho API
  const apiMode =
    view === "year" ? "yearly" : view === "day" ? "daily" : "monthly";

  // build dateString cho API (theo format backend)
  const dateString =
    apiMode === "yearly"
      ? String(calendarYear) // "2025"
      : apiMode === "monthly"
      ? `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}` // "2025-11"
      : selectedDate
      ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(
          2,
          "0"
        )}-${String(selectedDate.day).padStart(2, "0")}` // "2025-11-26"
      : null;

  // gọi API
  const { data: apiRes, loading, error } = useFetchStatistics(
    apiMode,
    dateString
  );
  const apiData = apiRes?.data || [];

  // xử lý đổi tháng
  const handleChangeMonth = (offset) => {
    setCalendarMonth((prevMonth) => {
      let newMonth = prevMonth + offset;
      let newYear = calendarYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear = calendarYear - 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear = calendarYear + 1;
      }

      setCalendarYear(newYear);
      return newMonth;
    });
  };

  const handleChangeMode = (newMode) => {
    setMode(newMode);
    setView(newMode);
    if (newMode === "year") setSelectedDate(null);
  };

  const handleSelectDay = (day) => {
    const date = { day, month: calendarMonth, year: calendarYear };
    setSelectedDate(date);
    setMode("month");
    setView("day");
  };

  // ====== BUILD CHART DATA TỪ API ======

  // YEAR VIEW: từng tháng trong năm
  const labelsYear = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];

  const dataYearValues = useMemo(() => {
    const arr = Array(12).fill(0);
    apiData.forEach((item) => {
      if (item.month != null) {
        const idx = item.month - 1;
        if (idx >= 0 && idx < 12) {
          arr[idx] = item.totalAmount ?? 0;
        }
      }
    });
    return arr;
  }, [apiData]);

  const dataYear = {
    labels: labelsYear,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: dataYearValues,
        backgroundColor: "#2F6FED",
        borderRadius: 4,
      },
    ],
  };

  // MONTH VIEW: từng ngày trong tháng
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const labelsMonth = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

  const dataMonthValues = useMemo(() => {
    const arr = Array(daysInMonth).fill(0);
    apiData.forEach((item) => {
      if (item.day != null) {
        const idx = item.day - 1;
        if (idx >= 0 && idx < daysInMonth) {
          arr[idx] = item.totalAmount ?? 0;
        }
      }
    });
    return arr;
  }, [apiData, daysInMonth]);

  const dataMonth = {
    labels: labelsMonth,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: dataMonthValues,
        backgroundColor: "#2F6FED",
        borderRadius: 2,
      },
    ],
  };

  // DAY VIEW: từng giờ trong ngày
  const labelsDay = Array.from({ length: 24 }, (_, i) => `${i}h`);

  const dataDay =
    selectedDate == null
      ? null
      : (() => {
          const arr = Array(24).fill(0);
          apiData.forEach((item) => {
            if (item.hour != null) {
              const idx = item.hour;
              if (idx >= 0 && idx < 24) {
                arr[idx] = item.totalAmount ?? 0;
              }
            }
          });
          return {
            labels: labelsDay,
            datasets: [
              {
                label: `Doanh thu ngày ${selectedDate.day}/${
                  selectedDate.month + 1
                } (VNĐ)`,
                data: arr,
                backgroundColor: "#2F6FED",
                borderRadius: 3,
              },
            ],
          };
        })();

  const chartData =
    view === "year" ? dataYear : view === "day" && dataDay ? dataDay : dataMonth;

  // tổng doanh thu
  const totalRevenue = useMemo(() => {
    if (!chartData || !chartData.datasets?.length) return 0;
    return chartData.datasets[0].data.reduce(
      (sum, v) => sum + (typeof v === "number" ? v : 0),
      0
    );
  }, [chartData]);

  const options = useMemo(
  () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text:
          view === "year"
            ? `Doanh thu năm ${calendarYear}`
            : view === "day" && selectedDate
            ? `Doanh thu ngày ${selectedDate.day}/${
                selectedDate.month + 1
              }/${selectedDate.year}`
            : `Doanh thu tháng ${calendarMonth + 1} / ${calendarYear}`,
        font: { size: 20, weight: "bold" },
      },
      totalRevenuePlugin: {
        total: totalRevenue,
      },
    },
    scales: {
      x: {
        // bắt buộc vẽ đúng theo labels mảng chartData.labels
        type: "category",
        offset: true,
        ticks: {
          autoSkip: false,     // 👈 KHÔNG được tự ẩn tick
          source: "labels",    // 👈 dùng đúng danh sách labels
          maxRotation: 0,
          minRotation: 0,
          font: { size: 11 },
          callback(value, index) {
            // với category scale, value là index, ta lấy lại label để hiển thị
            // @ts-ignore (nếu TypeScript kêu)
            const label = this.getLabelForValue(value);
            return label;
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          callback(value) {
            try {
              return value.toLocaleString("vi-VN") + " VNĐ";
            } catch {
              return value;
            }
          },
        },
      },
    },
  }),
  [view, selectedDate, calendarMonth, calendarYear, totalRevenue]
);



  return (
    <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-row gap-6">
      <div className="w-full h-[90%] flex flex-col gap-4">
        <NavStatistical
          mode={mode}
          onChangeMode={handleChangeMode}
          selectedDate={selectedDate}
          onSelectDay={handleSelectDay}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          onChangeMonth={handleChangeMonth}
        />

        <div className="mt-4 w-full h-full border-[3px] border-[#CBB58A] rounded-[15px] px-6 py-4">
          {error && (
            <div className="text-red-500 text-sm mb-2">
              Lỗi tải dữ liệu doanh thu.
            </div>
          )}
          {loading && (
            <div className="text-gray-500 text-sm mb-2">
              Đang tải dữ liệu...
            </div>
          )}
          {/* chart start here */}
          <Bar
            data={chartData}
            options={options}
            plugins={[totalRevenuePlugin]}
          />
          {/* chart end here */}
        </div>
      </div>
    </div>
  );
};

export default Page;
