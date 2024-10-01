import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type answerDictionary = { [key: string]: { answer: string } };

type countries = { [key: string]: { capital: string } };

function App() {
  const [countries, setCountries] = useState<countries>({
    Afghanistan: {
      capital: "Kabul",
    },
    Albania: {
      capital: "Tirana",
    },
    Algeria: {
      capital: "Alger",
    },
  });
  const answerDictionary: answerDictionary = {};
  const [selection, setSelection] = useState<string[]>([]);

  Object.entries(countries).forEach(([country, { capital }]) => {
    answerDictionary[country] = {
      answer: capital,
    };
    answerDictionary[capital] = {
      answer: country,
    };
  });

  const removePair = (secondSelectedItem: string) => {
    const firstSelectedItem: string = selection[0];
    setCountries((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([key]) => ![firstSelectedItem, secondSelectedItem].includes(key)
        )
      )
    );
    setSelection([]);
  };

  const addItemAsSelection = (selectedItem: string) => {
    if (selection.length === 1) {
      //check for match
      const winningPair =
        answerDictionary[selectedItem].answer === selection[0];

      winningPair
        ? removePair(selectedItem)
        : setSelection((prev) => [...prev, selectedItem]);
    } else {
      setSelection([selectedItem]);
    }
  };

  const calcColor = (valueToCheck: string): string => {
    const valuePresent = selection.includes(valueToCheck);
    if (!valuePresent) return "default";

    switch (selection.length) {
      case 0:
        return "default";
      case 1:
        return "blueButton";
      case 2:
        return "redButton";
      default:
        return "default";
    }
  };

  return (
    <>
      <h1>Countries Find a pair</h1>
      {Object.keys(countries).length > 0 ? (
        Object.entries(countries).map(([key, value]) => (
          <>
            <button
              className={calcColor(key)}
              onClick={() => {
                addItemAsSelection(key);
              }}
            >
              {key}
            </button>
            <button
              className={calcColor(value.capital)}
              onClick={() => {
                addItemAsSelection(value.capital);
              }}
            >
              {value.capital}
            </button>
          </>
        ))
      ) : (
        <h2>Congradulations</h2>
      )}
    </>
  );
}

export default App;
