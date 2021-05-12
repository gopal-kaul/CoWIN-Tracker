import "./App.css";
import React, { useState } from "react";
import Centres from "./FetchCentres";
import { Container } from "reactstrap";
import DatePicker from "react-date-picker";

function App() {
  const [date, setDate] = useState(new Date());
  const [pincode, setPincode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App ">
      <Container>
        <form>
          <label>Pincode : </label>
          <input
            type="number"
            min="100000"
            max="999999"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <br></br>
          <label>Date : </label>
          <DatePicker value={date} onChange={(d) => setDate(d)} />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(false);
            }}
          >
            Reset
          </button>
        </form>
        {submitted && (
          <Centres
            pincode={pincode.toString()}
            date={`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
