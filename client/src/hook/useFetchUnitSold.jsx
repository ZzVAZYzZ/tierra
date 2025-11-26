"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchUnitSold = (mode, dateString) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mode || !dateString) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8000/api/statistics/unit-sold",
          {
            params: { mode, dateString },
          }
        );
        setData(res.data.data || []);
      } catch (err) {
        console.error(
          "Fetch unit-sold error:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, dateString]);

  return { data, loading };
};
