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
import NavRevenue from "../../components/navRevenue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// hàm tạo dữ liệu ảo theo tháng
const createFakeMonthValues = (year, monthIndex, days) =>
  Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    const base = 10 + ((day * 3 + monthIndex * 5 + year) % 40); // 10 -> ~49
    return base * 1_000_000;
  });

// dữ liệu ảo cho 12 tháng trong năm
const createFakeYearValues = (year) =>
  Array.from({ length: 12 }, (_, monthIndex) => {
    const base = 20 + ((monthIndex * 7 + year) % 60);
    return base * 1_000_000;
  });

// dữ liệu ảo theo 24h của 1 ngày
const getFakeDayValues = (year, monthIndex, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const base =
      5 + ((year + monthIndex * 7 + day * 3 + hour * 2) % 20); // 5 -> 24
    return base * 1_000_000;
  });

const Page = () => {
  const [mode, setMode] = useState("month"); // 'month' | 'year'
  const [view, setView] = useState("month"); // 'month' | 'year' | 'day'

  // tháng/năm hiện tại của lịch & chart tháng
  const [calendarMonth, setCalendarMonth] = useState(10); // 10 = November (0-based)
  const [calendarYear, setCalendarYear] = useState(2025);

  // ngày đã chọn trong lịch
  const [selectedDate, setSelectedDate] = useState(null); // {day, month, year} | null

  // đổi tháng khi bấm nút ‹ ›
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

  // đổi view khi bấm "Theo tháng" / "Theo năm"
  const handleChangeMode = (newMode) => {
    setMode(newMode);
    setView(newMode);
    if (newMode === "year") {
      // khi qua năm thì bỏ view ngày
      setSelectedDate(null);
    }
  };

  // chọn ngày từ lịch
  const handleSelectDay = (day) => {
    const date = {
      day,
      month: calendarMonth,
      year: calendarYear,
    };
    setSelectedDate(date);
    setMode("month"); // nút "Theo tháng" active
    setView("day");   // chart chuyển sang view ngày
  };

  // ====== DỮ LIỆU THÁNG / NĂM / NGÀY ======
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const labelsMonth = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  const fakeMonthValues = createFakeMonthValues(
    calendarYear,
    calendarMonth,
    daysInMonth
  );

  const dataMonth = {
    labels: labelsMonth,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: fakeMonthValues,
        backgroundColor: "#2F6FED",
        borderRadius: 2,
      },
    ],
  };

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
  const fakeYearValues = createFakeYearValues(calendarYear);

  const dataYear = {
    labels: labelsYear,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: fakeYearValues,
        backgroundColor: "#2F6FED",
        borderRadius: 4,
      },
    ],
  };

  const labelsDay = Array.from({ length: 24 }, (_, i) => `${i}h`);
  const dataDay =
    selectedDate == null
      ? null
      : {
          labels: labelsDay,
          datasets: [
            {
              label: `Doanh thu ngày ${selectedDate.day}/${selectedDate.month + 1} (VNĐ)`,
              data: getFakeDayValues(
                selectedDate.year,
                selectedDate.month,
                selectedDate.day
              ),
              backgroundColor: "#2F6FED",
              borderRadius: 3,
            },
          ],
        };

  const chartData =
    view === "year" ? dataYear : view === "day" && dataDay ? dataDay : dataMonth;

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
              ? `Dữ liệu năm ${calendarYear}`
              : view === "day" && selectedDate
              ? `Dữ liệu ngày ${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year}`
              : `Dữ liệu tháng ${calendarMonth + 1} / ${calendarYear}`,
          font: { size: 20, weight: "bold" },
        },
      },
      scales: {
        x: {
          ticks: { font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              try {
                return value.toLocaleString("vi-VN") + "vnđ";
              } catch {
                return value;
              }
            },
          },
        },
      },
    }),
    [view, selectedDate, calendarMonth, calendarYear]
  );

  return (
    <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-row gap-6 overflow-auto">
      <div className="w-full h-full flex flex-col gap-4">
        <NavRevenue
          mode={mode}
          onChangeMode={handleChangeMode}
          selectedDate={selectedDate}
          onSelectDay={handleSelectDay}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          onChangeMonth={handleChangeMonth}
        />

        <div className="mt-4 w-full h-full border-[3px] border-[#CBB58A] rounded-[15px] px-6 py-4">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Page;
