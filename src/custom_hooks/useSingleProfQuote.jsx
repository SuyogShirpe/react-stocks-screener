import { useEffect, useState } from "react";
import { API_KEYS } from "../config/apiKeys";

export default function useSingleProfQtApi(ticker) {
  const FINNHUB = API_KEYS.FINNHUB;

  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(ticker));

  useEffect(() => {
    if (!ticker) {
      setStock(null);
      setIsLoading(false);
      return;
    }

    const fetchStock = async () => {
      setIsLoading(true);

      const [profileRes, quoteRes] = await Promise.all([
        fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB}`
        ),
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB}`
        ),
      ]);
      const profile = await profileRes.json();
      const quote = await quoteRes.json();

      setStock({ profile, quote });
      setIsLoading(false);
    };
    fetchStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  return { stock, isLoading };
}
