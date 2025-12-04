import React from "react";
import { API_KEYS } from "../assets/apiKeys";
import { useState, useEffect } from "react";

export default function useTickerApi(searchChange) {
  const [searchOutput, setSearchOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const FINNHUB = API_KEYS.FINNHUB;

  useEffect(() => {
    if (!searchChange || searchChange.trim() === "") {
      setSearchOutput([]);
      return;
    }

    const fetchSearchOutput = async () => {
      setIsLoading(true);

      const searchRes = await fetch(
        `https://finnhub.io/api/v1/search?q=${searchChange}&token=${FINNHUB}`
      );
      const searchData = await searchRes.json();

      setSearchOutput(searchData.result || []);
      setIsLoading(false);
    };
    fetchSearchOutput();
  }, [FINNHUB, searchChange]);

  return { searchOutput, isLoading };
}
