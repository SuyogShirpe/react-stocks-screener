import React, { useEffect, useState } from "react";

function Home() {
  const [profile, setProfile] = useState([]);
  const [quote, setQuote] = useState([]);

  const API_KEY = "d3ufbmpr01qil4apqa0gd3ufbmpr01qil4apqa10";

  useEffect(() => {
    const fetchData = async () => {
      const [profileRes, quoteRes] = await Promise.all([
        fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=${API_KEY}`
        ),
        fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEY}`),
      ]);

      const [profileData , quoteData] = await Promise.all([
        profileRes.json(),
        quoteRes.json(),
      ])

      setProfile(profileData);
      setQuote(quoteData);
    };

    fetchData();
  } , []);

  return (
    <>
      <div>
        <img
          src={profile.logo}
          style={{ width: "40px", height: "40px" }}
          alt="company logo"
        />
        <p>Name: {profile.name}</p>
        <p>Ticker: {profile.ticker}</p>
        <p>Country: {profile.country}</p>
        <p>Industry: {profile.finnhubIndustry}</p>
        <p>Market Cap: {(profile.marketCapitalization/1000000).toFixed(2)}T USD</p>
        <p>Price: {quote.c}</p>
        <p>Change(%): {quote.dp}</p>
        <p>High: {quote.h}</p>
        <p>low: {quote.l}</p>
      </div>
    </>
  );
}

export default Home;
