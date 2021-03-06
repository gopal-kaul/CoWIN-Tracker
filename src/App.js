import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Centre from "./components/centre";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import DatePicker from "react-date-picker";

function App() {
  const [date, setDate] = useState(new Date());
  const [pincode, setPincode] = useState("");
  const [centres, setCentres] = useState();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [vaccine, setVaccine] = useState("any");
  const fetchCentres = () => {
    const apiUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    axios
      .get(apiUrl)
      .then((resp) => resp.data.centers)
      .then((resp) => {
        setCentres(resp);
        setLoading(false);
        console.log(resp);
        resp.length === 0 ? setEmpty(true) : setEmpty(false);
      })
      .catch((e) => console.log(`Error : ${e}`));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
        height: '100vh', 
        backgroundRepeat: "no-repeat",
      }}
      className="App"
    >
      <Container>
        <div className='con1'>
        <center>
          <h2>CoWIN - Tracker</h2>
        </center>
        <Form>
          <FormGroup>
            <Label>Pincode </Label>
            <Input
              type="number"
              min="100000"
              max="999999"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date </Label>
            <br />
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </FormGroup>
          <FormGroup>
            <Label for="vaccine">Vaccine</Label>
            <Input
              onChange={(e) => {
                console.log(e.target.value);
                setVaccine(e.target.value);
              }}
              type="select"
              name="select"
              id="vaccine"
            >
              <option>any</option>
              <option>COVAXIN</option>
              <option>COVISHIELD</option>
            </Input>
          </FormGroup>
          <Button 
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              fetchCentres();
            }}
          >
            Submit
          </Button>
        </Form>
        </div>
        <div className='con2'>
        {empty && <h3>No Slots Available!</h3>}
        {centres &&
          (loading ? (
            <Spinner color="primary" />
          ) : (
            <div>
              {centres
                .filter((x) => parseInt(x.sessions[0].available_capacity) > 0)
                .filter((x) => {
                  if (vaccine !== "any")
                    return x.sessions[0].vaccine === vaccine;
                  else return true;
                })
                .map((x, i) => {
                  return (
                    <div className="centres" key={i}>
                      {" "}
                      <Centre
                        name={x.name}
                        address={x.address}
                        fee={x.fee_type}
                        capacity={x.sessions[0].available_capacity}
                        age={x.sessions[0].min_age_limit}
                        vaccine={x.sessions[0].vaccine}
                      />{" "}
                    </div>
                  );
                })}
            </div>
          ))}
          </div>
      </Container>
    </div>
  );
}

export default App;
