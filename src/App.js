import "./App.css";
import React, { useState } from "react";
import Centres from "./FetchCentres";
import { Container, Button ,Form,Label,Input } from "reactstrap";
import DatePicker from "react-date-picker";

function App() {
  const [date, setDate] = useState(new Date());
  const [pincode, setPincode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App ">
      <Container>
        <Form>
          <Label>Pincode : </Label>
          <Input
            type="number"
            min="100000"
            max="999999"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <br></br>
          <Label>Date : </Label>
          <DatePicker value={date} onChange={(d) => setDate(d)} />
          <br />
          <Button color='success'
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            Submit
          </Button>
          <Button color='danger'
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(false);
            }}
          >
            Reset
          </Button>
        </Form>
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
