import { useEffect, useState } from "react";
import { API_KEYS } from "../assets/apiKeys";

const TWELVE_DATA = API_KEYS.TWELVE_DATA;

export default function useGraphApi(ticker) {
  const [series, setSeries] = useState([]);
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphError, setGraphError] = useState(null);

  const mainTicker = ticker?.split(".")[0];

  useEffect(() => {
    if (!ticker) {
      setSeries([]);
      setGraphLoading(false);
      setGraphError(null);
      return;
    }

    let cancelled = false;

    const fetchGraphData = async () => {
      setGraphLoading(true);
      setGraphError(null);

      try {
        const graphRes = await fetch(
          `https://api.twelvedata.com/time_series?symbol=${mainTicker}&interval=1day&outputsize=500&apikey=${TWELVE_DATA}`
        );

        if (graphRes.status.ok) {
          throw new Error(`Graph API error: ${graphRes.statusText}`);
        }

        const graphData = await graphRes.json();
        if (cancelled) return;

        if (graphData.status === "error") {
          setSeries([]);
          setGraphError(graphData.message || "Invalid Symbol");
          return;
        }

        if (
          !graphData.values ||
          !Array.isArray(graphData.values) ||
          graphData.values.length === 0
        ) {
          setSeries([]);
          setGraphError("No data available for the given symbol");
          return;
        }

        const ohlc = graphData.values
          .map((item) => ({
            x: new Date(item.datetime),
            y: [
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close),
            ],
          }))
          .reverse();

        setSeries([{ data: ohlc }]);

        setGraphLoading(false);
      } catch (err) {
        if (!cancelled) return;
        setSeries([]);
        setGraphError(
          err?.message === "Failed to fetch"
            ? "Network error. Please check your internet connection."
            : err?.message || "Something went wrong while fetching the chart."
        );
      } finally {
        if (!cancelled) {
          setGraphLoading(false);
        }
      }
    };
    fetchGraphData();

    return () => {
      cancelled = true;
    };
  }, [mainTicker, ticker]);

  return { series, graphLoading, graphError };
}
