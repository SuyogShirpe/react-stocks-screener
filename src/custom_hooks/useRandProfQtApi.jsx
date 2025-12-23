import { useEffect, useState } from "react";
import { API_KEYS } from "../assets/apiKeys";

export default function useRandProfQtApi(tickers = []) {
  const FINNHUB = API_KEYS.FINNHUB;

  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(tickers.length));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tickers || tickers.length == 0) {
      setStocks([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchStocks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await Promise.all(
          tickers.map(async (ticker) => {
            try {
            const [profileRes, quoteRes] = await Promise.all([
              fetch(
                `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB}`
              ),
              fetch(
                `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB}`
              ),
            ]);

            if (!profileRes.ok || !quoteRes.ok) {
              return null;
            }
            const profileData = await profileRes.json();
            const quoteData = await quoteRes.json();

            return { profile: profileData, quote: quoteData };
          } catch {
            return null;
          }
          })
        );
      
        setStocks(result.filter(stock => stock !== null));
      } catch (error) {
        setError(error.message ||"Something went wrong. Please try again later.");
        setStocks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers]);

  return { stocks, isLoading, error };
}
