/** @format */

import React from "react";
import axios from "axios";
import { useReducer, useEffect } from "react";

const Converter = () => {
  const initialState = {
    GBP: null,
    USD: null,
    EUR: null,
    currentTime: "",
    euroToBTC: 0,
    gbpToBTC: 0,
    usdToBTC: 0,

    setCurrencyType: "",
    currencyType: "",
    setSelectedCurrencyType: "",
    // currencyType: "",
  };
  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((data) => {
        console.log("Data", data);
        const euroRateFloat = data.data.bpi.EUR.rate_float;
        const gbpRateFloat = data.data.bpi.GBP.rate_float;
        const usdRateFloat = data.data.bpi.USD.rate_float;
        const currentTime = data.data.time.updated;

        dispatch({
          type: "currency_update",
          EUR: euroRateFloat,
          GBP: gbpRateFloat,
          USD: usdRateFloat,
          TIME: currentTime,
        });
        return data;
      });
  }, []);

  const reducer = (state, action) => {
    console.log("reducer state", state);
    console.log("action", action);

    switch (action.type) {
      case "currency_update":
        return {
          ...state,
          GBP: action.GBP,
          USD: action.USD,
          EUR: action.EUR,
          TIME: action.TIME,
        };

      case "CONVERT_TO_BTC":
        return {
          ...state,
          currencyType: action.setCurrencyType,

          euroToBTC: action.payload * state.EUR,

          gbpToBTC: action.payload * state.GBP,
          usdToBTC: action.payload * state.USD,
        };

      default:
        console.error("Error in Reducer");
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("currency type", state.currencyType);

  const currencyTotal = (e) => {
    switch (e) {
      case "EUR": {
        return state.euroToBTC;
      }
    }
  };
  // const getCurrencyType = (e) => {
  //   console.log("event name", e.target.name);
  //   console.log("event value", e.target.value);

  //   switch (e) {
  //     case "EUR": {
  //       convertEuroToBTC();
  //       setCurrencyEUR();
  //       return state.euroToBTC;
  //     }
  //     case "GBP": {
  //       convertGBPToBTC();
  //       setCurrencyGBP();
  //       return state.gbpToBTC;
  //     }
  //     case "USD": {
  //       convertUSDToBTC();
  //       setCurrencyUSD();
  //       return state.usdToBTC;
  //     }
  //     default:
  //       console.error(Error in getCurrencyType);
  //   }
  // };

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   switch (e) {
  //     case "EUR": {
  //       dispatch({ type: "CONVERT_TO_BTC", setCurrencyType: e.target.value });
  //       return state.euroToBTC;
  //     }
  //     case "GBP": {
  //       dispatch({ type: "CONVERT_TO_BTC", setCurrencyType: e.target.value payload: gbpRateFloat});
  //       return state.gbpToBTC;
  //     }
  //     case "USD": {
  //       dispatch({ type: "CONVERT_TO_BTC", setCurrencyType: e.target.value });
  //       return state.usdToBTC;
  //     }
  //     default:
  //       console.error(Error);
  //   }
  // };

  // const getItemList = (data) => {
  //   {data.map((item) => (
  //     <item item={item}/>

  //   ))

  // };

  // }

  // const setCurrencyEUR = () =>
  //   dispatch({ type: "SET_CURRENCY_TYPE", setCurrencyType: "EUR" });

  // const setCurrencyGBP = () =>
  //   dispatch({ type: "SET_CURRENCY_TYPE", setCurrencyType: "GBP" });

  // const setCurrencyUSD = () =>
  //   dispatch({ type: "SET_CURRENCY_TYPE", setCurrencyType: "USD" });

  // const convertEuroToBTC = () => dispatch({ type: "CONVERT_TO_BTC" });
  // const convertGBPToBTC = () => dispatch({ type: "CONVERT_TO_BTC" });
  // const convertUSDToBTC = () => dispatch({ type: "CONVERT_TO_BTC" });

  return (
    <div>
      <div>
        Time :{state.TIME} <br></br>
      </div>
      <label htmlFor='Select Currency'>Select Currency To Convert From:</label>
      <input
        className='Convert From'
        type='number'
        placeholder='Enter Amount'
        // value={state.euroToBTC}
        onChange={(e) =>
          dispatch({
            type: "CONVERT_TO_BTC",
            payload: parseInt(e.currentTarget.value, 10),
          })
        }
      />

      <select className='bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3'>
        onChange=
        {(e) =>
          dispatch({
            type: "CONVERT_TO_BTC",
            setCurrencyType: e.currentTarget.value,
          })
        }
        <option value='Select Currency'>Select Currency</option>
        <option>EUR</option>
        <option>GBP</option>
        <option>USD</option>
      </select>

      <div>
        {/* <div className='conversions'>
          {state.map((conversions) => (
            <div className='conversion'>{conversions.action}</div>
          ))}
        </div> */}
        <label>
          GBP to Bitcoin:{state.gbpToBTC} <br></br>
          USD to Bitcoin:{state.usdToBTC} <br></br>
          EUR to BitCoin:{state.euroToBTC} <br></br>
          converted:{currencyTotal()}
          <div>
            <input
              htmlFor='label'
              type='text'
              value={state.currencyType}
              placeholder='Converted Rate Here'
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Converter;
