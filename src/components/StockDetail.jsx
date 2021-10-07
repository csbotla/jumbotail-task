import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const StockContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StockDetails = styled.div`
  min-width: 400px;
  min-height: 200px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-weight: 500;
  letter-spacing: 5px;
  box-shadow: 0 0 10px #ddd;
`;

const TradeInfo = styled.div`
  min-width: fit-content;
  flex: 2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
`;
const StockLabel = styled.label`
  font-size: 12px;
  padding: 0 5px;
  color: #525252;
  font-weight: 500;
  letter-spacing: 0;
`;
const StockData = styled.div`
  display: inline-block;
  padding: 0 5px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
`;
const StockName = styled.div`
  flex: 1;
  text-align: center;
  color: ${(props) => props.color};
  padding: 10px 20px;
  letter-spacing: 0;
`;

//   01. symbol: "HLKHF"
// 02. open: "77.2800"
// 03. high: "77.2800"
// 04. low: "77.2800"
// 05. price: "77.2800"
// 06. volume: "0"
// 07. latest trading day: "2021-10-04"
// 08. previous close: "77.2800"
// 09. change: "0.0000"
// 10. change percent: "0.0000%"
export default function StockDetail(props) {
  const { stock } = useParams();
  const [stockInfo, setStockInfo] = useState({ data: [], isFetching: false });
  const stockData = stockInfo.data["Global Quote"];
  const { currency } = props.location.state;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const STOCK_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`;

  console.log("###", process.env, currency);
  async function fetchStockData() {
    setStockInfo({ data: stockInfo.data, isFetching: true });
    const response = await fetch(STOCK_URL);
    const data = await response.json();
    setStockInfo({ data: data, isFetching: false });
    console.log("hello", stockInfo.data);
  }
  useEffect(() => {
    fetchStockData();
  }, []);

  {
    /* {"Global Quote":{"01. symbol":"GOOGL","02. open":"2680.8200","03. high":"2744.4900","04. low":"2680.8200","05. price":"2720.4600","06. volume":"1620163","07. latest trading day":"2021-10-05","08. previous close":"2673.1900","09. change":"47.2700","10. change percent":"1.7683%"}} */
  }

  return (
    <StockContainer>
      {stockData ? (
        <StockDetails>
          <StockName
            color={
              stockData["02. open"] > stockData["05. price"] ? "red" : "green"
            }
          >
            <div>
              <h1>
                {stockData["01. symbol"]}{" "}
                {stockData["02. open"] > stockData["05. price"] ? "↓" : "↑"}
              </h1>
            </div>
          </StockName>

          <TradeInfo>
            <div>
              <StockLabel>Price:</StockLabel>
              <StockData>
                {stockData ? `${stockData["05. price"]} ${currency}` : ""}
              </StockData>
            </div>
            <div>
              <StockLabel>Open:</StockLabel>
              <StockData>
                {stockData ? `${stockData["02. open"]} ${currency}` : ""}
              </StockData>
            </div>
            <div>
              <StockLabel>High:</StockLabel>
              <StockData>
                {stockData ? `${stockData["03. high"]} ${currency}` : ""}
              </StockData>
            </div>
            <div>
              <StockLabel>Low:</StockLabel>
              <StockData>
                {stockData ? `${stockData["04. low"]} ${currency}` : ""}
              </StockData>
            </div>
            <div>
              <StockLabel>Volume:</StockLabel>
              <StockData>{stockData ? stockData["06. volume"] : ""}</StockData>
            </div>
            <div>
              <StockLabel>Last Trading Date:</StockLabel>
              <StockData>
                {stockData ? stockData["07. latest trading day"] : ""}
              </StockData>
            </div>
          </TradeInfo>
        </StockDetails>
      ) : (
        <StockDetails>Fetching...</StockDetails>
      )}
    </StockContainer>
  );
}
