/* eslint-disable array-callback-return */
import React from "react";
import Stock from "./Stock";
import styled from "styled-components";

const SearchBox = styled.div`
  min-height: 0;
  width: 400px;
  border-radius: 10px;
  border: 1px solid #cecece;
  box-shadow: 0 0 5px #ddd;
`;

const SearchResultContainer = styled.div`
  flex: 1;
`;

// 1. symbol: "TATAMOTORS.BSE"
// 2. name: "Tata Motors Limited"
// 3. type: "Equity"
// 4. region: "India/Bombay"
// 5. marketOpen: "09:15"
// 6. marketClose: "15:30"
// 7. timezone: "UTC+5.5"
// 8. currency: "INR"
// 9. matchScore: "0.8696"

export default function SearchResult({ stocks }) {
  return (
    <SearchResultContainer>
      {stocks.length > 0 ? (
        <SearchBox>
          {stocks.length > 0 &&
            stocks.map((stock, i) => {
              console.log(stock["1. symbol"], i);
              return (
                <Stock
                  key={i}
                  name={stock["1. symbol"]}
                  currency={stock["8. currency"]}
                />
              );
            })}
        </SearchBox>
      ) : (
        <></>
      )}
    </SearchResultContainer>
  );
}
