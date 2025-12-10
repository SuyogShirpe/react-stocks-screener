import React from "react";
import {Link} from "react-router-dom";
function About() {
  return (
    <div className="container py-5">
      <h2 className="mb-3 text-center fw-bold">About This Project</h2>
      <p className="text-muted text-center mb-5">
        A Dexscreener-style stock market dashboard built using React, ApexCharts, and Finnhub APIs.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4" style={{border:"1px solid black" , borderRadius:"12px"}}>
            <h4 className="fw-semibold">What This App Does</h4>
            <p>
              This Stock Screener allows users to search for companies, view real-time market data,
              and analyze interactive charts using candlestick and line views. It mimics popular market
              dashboards like Dexscreener but focuses on stock markets.
            </p>

            <h4 className="fw-semibold mt-4">Technologies Used</h4>
            <ul>
              <li>React + JavaScript</li>
              <li>Bootstrap UI</li>
              <li>Finnhub API (Company Search + Live Quote)</li>
              <li>TwelveData API (Historical Chart Data)</li>
              <li>ApexCharts for visualizing stock trends</li>
            </ul>

            <h4 className="fw-semibold mt-4">Purpose</h4>
            <p>
              The goal is to provide a fast, clean, and interactive way to explore stock data for
              developers, students, and market enthusiasts.
            </p>

            <h4 className="fw-semibold mt-4">Developer</h4>
            <p>
              Created by <strong>Suyog Shirpe</strong> — a frontend developer passionate about React,
              UI/UX, and building modern web apps.
            </p>

            <div className="text-center mt-4">
              <Link
                to="https://github.com/suyogshirpe/react-stocks-screener"
                target="_blank"
                className="btn btn-dark px-4"
              >
                View Source Code
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default About;
