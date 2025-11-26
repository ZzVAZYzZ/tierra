"use client";

import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import NavStatistical from "../../../components/navStatistical";
import { useFetchUnitSold } from "../../../../../hook/useFetchUnitSold";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const [mode, setMode] = useState("month"); // UI: 'month' | 'year'
  const [view, setView] = useState("month"); // 'month' | 'year' | 'day'

  const [calendarMonth, setCalendarMonth] = useState(10); // 0-based: 10 = November
  const [calendarYear, setCalendarYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null); // {year, month, day}

  const [legendOpen, setLegendOpen] = useState(false);

  // ====== ĐỔI THÁNG ======
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

  // ====== ĐỔI MODE (Theo tháng / Theo năm) ======
  const handleChangeMode = (newMode) => {
    // newMode: 'month' | 'year' (từ NavStatistical)
    setMode(newMode);
    setView(newMode);
    if (newMode === "year") {
      setSelectedDate(null);
    }
  };

  // ====== CHỌN NGÀY TRÊN LỊCH ======
  const handleSelectDay = (day) => {
    const date = {
      year: calendarYear,
      month: calendarMonth,
      day,
    };
    setSelectedDate(date);
    setMode("month");
    setView("day");
  };

  // ====== MAP UI -> apiMode & dateString ======
  // apiMode: 'daily' | 'monthly' | 'yearly' (backend yêu cầu)
  let apiMode = "monthly";
  let dateString = `${calendarYear}-${String(calendarMonth + 1).padStart(
    2,
    "0"
  )}`;

  if (view === "year") {
    apiMode = "yearly";
    dateString = String(calendarYear); // "2025"
  } else if (view === "day" && selectedDate) {
    apiMode = "daily";
    dateString = `${selectedDate.year}-${String(
      selectedDate.month + 1
    ).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`; // "2025-11-27"
  }

  // ====== GỌI API THỰC ======
  const { data: unitSoldData, loading } = useFetchUnitSold(apiMode, dateString);

  // unitSoldData: [
  //   { year, month, day, hour?, productId, productName, quantity }
  // ]

  // ====== CHUYỂN DỮ LIỆU API -> CHARTJS ======
  const { labels, datasets } = useMemo(() => {
    if (!unitSoldData || unitSoldData.length === 0) {
      return { labels: [], datasets: [] };
    }

    const labelSet = new Set();
    const productMap = {}; // productName -> { label -> quantity }

    unitSoldData.forEach((item) => {
      let label;
      if (apiMode === "yearly") {
        label = `T${(item.month ?? 0) + 1}`; // month 0-based trên response
      } else if (apiMode === "monthly") {
        label = String(item.day); // "1", "2", ...
      } else {
        // daily
        label = `${item.hour}h`;
      }

      labelSet.add(label);

      const key = item.productName || item.productId;
      if (!productMap[key]) {
        productMap[key] = {};
      }
      productMap[key][label] = (productMap[key][label] || 0) + item.quantity;
    });

    // sort label theo số
    const sortedLabels = Array.from(labelSet).sort((a, b) => {
      const na = parseInt(a);
      const nb = parseInt(b);
      return na - nb;
    });

    const colors = ["#2F6FED", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

    const datasets = Object.entries(productMap).map(
      ([productName, dataByLabel], idx) => ({
        label: `${productName} (số lượng bán)`,
        data: sortedLabels.map((lb) => dataByLabel[lb] || 0),
        borderColor: colors[idx % colors.length],
        tension: 0.3,
        fill: false,
      })
    );

    return { labels: sortedLabels, datasets };
  }, [unitSoldData, apiMode]);

  const chartData = { labels, datasets };

  // ====== TỔNG SỐ LƯỢNG ĐÃ BÁN ======
  const totalOrders = useMemo(() => {
    return datasets.reduce(
      (sum, ds) =>
        sum + ds.data.reduce((s, v) => s + (typeof v === "number" ? v : 0), 0),
      0
    );
  }, [datasets]);

  // ====== PLUGIN HIỂN THỊ TỔNG TRÊN GÓC PHẢI ======
  const totalAmountPlugin = {
    id: "totalAmountPlugin",
    afterDraw(chart, args, pluginOptions) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const { left, top } = chartArea; // 👉 dùng left thay vì right
      const total = pluginOptions?.total;
      if (total == null) return;

      const text = `Tổng đã bán: ${total.toLocaleString("vi-VN")} sp`;

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

      // 👉 vẽ box ở góc trên bên trái của chart
      let boxX = left + margin;
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
              ? `Số lượng sản phẩm bán theo tháng năm ${calendarYear}`
              : view === "day" && selectedDate
              ? `Số lượng sản phẩm bán theo giờ ngày ${selectedDate.day}/${
                  selectedDate.month + 1
                }/${selectedDate.year}`
              : `Số lượng sản phẩm bán theo ngày tháng ${
                  calendarMonth + 1
                } / ${calendarYear}`,
          font: { size: 20, weight: "bold" },
        },
        totalAmountPlugin: {
          total: totalOrders,
        },
      },
      scales: {
        x: {
          ticks: { font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback(value) {
              return `${value} sp`;
            },
          },
        },
      },
    }),
    [view, selectedDate, calendarMonth, calendarYear, totalOrders]
  );

  return (
    <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-row gap-6 overflow-auto">
      <div className="w-full h-[95%] flex flex-col gap-4">
        <NavStatistical
          mode={mode}
          onChangeMode={handleChangeMode}
          selectedDate={selectedDate}
          onSelectDay={handleSelectDay}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          onChangeMonth={handleChangeMonth}
        />

        <div className="mt-4 w-full h-full border-[3px] border-[#CBB58A] rounded-[15px] px-6 py-4 relative">
          {/* Nút mở legend */}
          <button
            onClick={() => setLegendOpen((prev) => !prev)}
            className="absolute top-3 right-4 z-20 text-xs px-3 py-1 rounded-full border border-[#CBB58A] bg-white shadow-sm hover:bg-[#f8f3e7] transition"
          >
            {legendOpen ? "Ẩn chú thích" : "Hiện chú thích"}
          </button>

          {/* Popup legend */}
          {legendOpen && (
            <div className="absolute top-10 right-4 z-0 bg-white border border-gray-300 rounded-md shadow-lg p-3 max-w-xs max-h-64 overflow-auto text-xs">
              <div className="font-semibold mb-2">Chú thích sản phẩm</div>
              {datasets.map((ds, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: ds.borderColor }}
                  />
                  <span>{ds.label}</span>
                </div>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-sm text-gray-500 mt-8">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              {/* chart start here */}
              <Line
                data={chartData}
                options={options}
                plugins={[totalAmountPlugin]}
              />
              {/* chart end here */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
