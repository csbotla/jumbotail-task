import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 1. symbol: "APP"
// 2. name: "Applovin Corp - Class A"
// 3. type: "Equity"
// 4. region: "United States"
// 5. marketOpen: "09:30"
// 6. marketClose: "16:00"
// 7. timezone: "UTC-04"
// 8. currency: "USD"
// 9. matchScore: "1.0000"

const StockItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 40px;
  width: 400px;
  font-weight: 600;
`;

export default function Stock({ name, currency }) {
  return (
    <Link
      to={{ pathname: "/stock/" + name, state: { currency } }}
      style={{ textDecoration: "none" }}
    >
      <StockItem>
        <div>{name}</div>
        <div>↗</div>
      </StockItem>
    </Link>
  );
}
