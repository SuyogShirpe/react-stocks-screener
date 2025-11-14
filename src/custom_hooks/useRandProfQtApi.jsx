import { useEffect, useState } from "react";
import { API_KEYS } from "../assets/apiKeys";

export default function useRandProfQtApi(tickers = []) {
  const FINNHUB = API_KEYS.FINNHUB;

  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(tickers.length));

  useEffect(() => {
    if (!tickers || tickers.length == 0) {
      setStocks([]);
      setIsLoading(false);
      return;
    }

    const fetchStocks = async () => {
      setIsLoading(true);

      const result = await Promise.all(
        tickers.map(async (ticker) => {
          const [profileRes, quoteRes] = await Promise.all([
            fetch(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB}`
            ),
            fetch(
              `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB}`
            ),
          ]);
          const profileData = await profileRes.json();
          const quoteData = await quoteRes.json();

          return { profile: profileData, quote: quoteData };
        })
      );
      setStocks(result);
      setIsLoading(false);
    };
    fetchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers]);

  return { stocks, isLoading };
}
