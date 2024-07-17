import { useState, useEffect } from 'react';
import './App.css';
import FetchCountries from './fetchCountries';

function App() {

  type CountryData = {
    data: {
      name: string;
      capital: string;
    }[];
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<{ name: string; capital: string; } | null>(null);
  const [isCorrect, setIsCorrect] = useState<{ [key: number]: boolean | null }>({});
  const [title, setTitle] = useState("Pick the correct capital city of");
  const [questionSet, setQuestionSet] = useState<{ countries: any[], answer: any }>({
    countries: [],
    answer: "",
  });

  useEffect(() => {
    FetchCountries()
      .then((data) => {
        setCountryData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (countryData) {
      pickQuestionSet(countryData.data);
    }
  }, [countryData]);

  function pickQuestionSet<T extends { name: string; capital: string }>(countryData: T[] | undefined) {
    if (!countryData || countryData.length < 3) {
      throw new Error('Array must have at least 3 elements');
    }
  
    const pickedElements: T[] = [];
    let pickedAnswer: T | null = null;
    const dataArray = [...countryData];
  
    while (pickedElements.length < 3) {
      const randomIndex = Math.floor(Math.random() * dataArray.length);
      const pickedElement = dataArray[randomIndex];
      pickedElements.push(pickedElement);
      if (!pickedAnswer) {
        pickedAnswer = pickedElement;
      }
      dataArray.splice(randomIndex, 1);
    }
  
    setQuestionSet({
      countries: pickedElements,
      answer: pickedAnswer!,
    });
    setCorrectAnswer(pickedAnswer!);
    setIsLoading(false);
    setIsCorrect({});
    setTitle("Pick the correct capital city of");
  }
  
  function handleCardClick(selectedIndex: number, selectedAnswer: string) {
    if (correctAnswer) {
      const correct = selectedAnswer === correctAnswer.capital;
      setIsCorrect((prev) => ({
        ...prev,
        [selectedIndex]: correct,
      }));
      setTitle(correct ? "Correct! Click reset to play again!" : "Incorrect! Click reset to play again!");
    }
  }
  
  function resetGame() {
    if (countryData) {
      pickQuestionSet(countryData.data);
    }
  }

  return (
    <main id="app-container">
      {isLoading ? (
        <div className="loading-icon">
          Loading...
        </div>
      ) : (
        <>
          <div id="text-container-main">
            <h1 id="title-main">Capital Quest</h1>
            <h3 className="title-heading">{title}</h3>
            <h2 className="title-heading">
              {questionSet.countries.length > 0 ? questionSet.answer.name : ""}
            </h2>
          </div>

          <div id="quiz-card-container">
            {questionSet.countries.map((country, index) => (
              <span
                key={index}
                className={`quiz-card ${
                  isCorrect[index] === true ? 'win' : isCorrect[index] === false ? 'loss' : ''
                }`}
                id={`quiz-card-${index + 1}`}
                onClick={() => handleCardClick(index, country.capital)}
              >
                <h1>{country.capital}</h1>
              </span>
            ))}
          </div>

          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </>
      )}
    </main>
  );
}

export default App;
