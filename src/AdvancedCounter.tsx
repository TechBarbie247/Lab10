import React, { useState, useEffect } from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<number[]>([]);

  const updateCount = (delta: number) => {
    setHistory(prev => [...prev, count]); 
    setCount(prev => prev + delta);       
  };

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const savedHistory = localStorage.getItem("history");

    if (savedCount !== null) setCount(Number(savedCount));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);


  useEffect(() => {
    localStorage.setItem("count", count.toString());
    localStorage.setItem("history", JSON.stringify(history));
  }, [count, history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") updateCount(step);
      else if (e.key === "ArrowDown") updateCount(-step);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); 
  }, [step, count]); 

  const reset = () => {
    setHistory(prev => [...prev, count]);
    setCount(0);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto text-center bg-gray-100 rounded-xl">
      <h1 className="text-2xl font-bold">Advanced Counter</h1>

      <div className="text-3xl">{count}</div>

      <div className="space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => updateCount(step)}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => updateCount(-step)}
        >
          Decrement
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div>
        <label className="block mb-1">Step Value:</label>
       <input
  type="number"
  value={step === 0 ? "" : step}
  onChange={(e) => {
    const value = e.target.value;
    setStep(value === "" ? 0 : Number(value));
  }}
  className="border px-2 py-1 rounded"
/>

      </div>

      <div className="text-left">
        <h2 className="font-semibold">History:</h2>
        <ul className="list-disc list-inside">
          {history.map((val, index) => (
            <li key={index}>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
