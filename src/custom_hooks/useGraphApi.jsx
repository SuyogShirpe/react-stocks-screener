import { useEffect, useState } from "react";
import { API_KEYS } from "../assets/apiKeys";

const TWELVE_DATA = API_KEYS.TWELVE_DATA;

export default function useGraphApi(ticker) {

  const [series, setSeries] = useState([]);
  const [graphLoading, setGraphLoading] = useState(false);

  useEffect(() => {
    if (!ticker) {
      setSeries([]);
      setGraphLoading(false);
      return;
    }

    let cancelled = false;

    const fetchGraphData = async () => {
      setGraphLoading(true);

      const graphRes = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&outputsize=500&apikey=${TWELVE_DATA}`
      );

      const graphData = await graphRes.json();

      if (!cancelled && graphData && graphData.values) {
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
      } else if(!cancelled){
        setSeries([])
      }
    };
    fetchGraphData();

    return () => {
        cancelled = true;
    };
  }, [ticker]);

  return { series, graphLoading };
}
