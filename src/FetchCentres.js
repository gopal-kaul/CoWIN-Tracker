import axios from "axios";
import React, { useState, useEffect } from "react";
import Centre from "./components/centre";
import {Spinner} from "reactstrap";
export default function Centres({ pincode, date }) {
  const apiUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`;
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((resp) => resp.data.centers)
      .then((resp) => {
        setData(resp);
        setLoading(false);
        if (resp.length === 0) setEmpty(true);
      })
      .catch((e) => console.log(`Error : ${e}`));
  }, []);
  return (
    <>
      {empty && <p>No Slots Available!</p>}
      {data && loading ? <Spinner color="primary" /> : (
        <div>
          {data
            .filter((x) => parseInt(x.sessions[0].available_capacity) > 0)
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
      )}
    </>
  );
}
