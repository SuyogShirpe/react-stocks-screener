import { useEffect, useState } from "react";
import { API_KEYS } from "../assets/apiKeys";

export default function useSingleProfQtApi(ticker) {
  const FINNHUB = API_KEYS.FINNHUB;

  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(ticker));

  const mainTicker = ticker?.split(".")[0];

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
          `https://finnhub.io/api/v1/stock/profile2?symbol=${mainTicker}&token=${FINNHUB}`
        ),
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${mainTicker}&token=${FINNHUB}`
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
