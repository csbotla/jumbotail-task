import { debounce } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const Input = styled.input`
  flex: 1;
  width: 400px;
  height: 50px;
  border: 1.5px solid rebeccapurple;
  letter-spacing: 2px;
  font-size: 16px;
  margin: 16px;
  padding: 10px 15px;
  border-radius: 10px;
  outline: none;
`;
const SearchContainer = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
`;

const InputCOntainer = styled.div`
  flex: 0.4;
  max-width: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export default function Search() {
  const [stocklist, setstocklist] = useState([]);

  const handleChange = debounce((keyword) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const SYMBOL_SEARCH_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
    fetch(SYMBOL_SEARCH_URL)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data", data);
        setstocklist(data.bestMatches);
      })
      .catch(() => {
        console.log("failed to fetch");
      });
  }, 300);

  return (
    <SearchContainer>
      <InputCOntainer>
        <Input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter stock name"
        />
      </InputCOntainer>

      <SearchResult
        count={stocklist ? stocklist : 0}
        stocks={stocklist ? stocklist : []}
      />
    </SearchContainer>
  );
}
