// src/hook/useFetchStatistics.jsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchStatistics = (mode, dateString) => {
  const [data, setData] = useState(null);   // dữ liệu từ API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mode || !dateString) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          "http://localhost:8000/api/statistics/revenue",
          {
            params: { mode, dateString },
            signal: controller.signal,
          }
        );

        // res.data = { message, data: [...] }
        setData(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("fetch statistics error:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [mode, dateString]);

  return { data, loading, error };
};
