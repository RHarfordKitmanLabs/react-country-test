import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type AnswerDictionary = { [key: string]: { answer: string } };

type Countries = { [key: string]: { capital: string } };

function App() {
  const [countries, setCountries] = useState<Countries>({
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
  const answerDictionary: AnswerDictionary = useMemo(() => {
    const dictionary: AnswerDictionary = {};
    Object.entries(countries).forEach(([country, { capital }]) => {
      dictionary[country] = {
        answer: capital,
      };
      dictionary[capital] = {
        answer: country,
      };
    });
    return dictionary;
  }, [countries]);

  const [selection, setSelection] = useState<string[]>([]);

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

  const calcColor = (value: string): string => {
    const isSelected = selection.includes(value);
    if (!isSelected) return "default";
    return selection.length === 1 ? "blueButton" : "redButton";
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
