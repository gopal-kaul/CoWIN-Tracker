import React from "react";
import { Card,CardTitle,CardText,CardBody } from "reactstrap";
export default function Centre({ name, address, vaccine,fee,age,capacity }) {
  return (
    <Card className='Card'>
      <CardBody>
        <CardTitle tag="h2">{name}</CardTitle>
        <hr />
        <CardText tag="h3">Address : </CardText><CardText>{address}</CardText>
        <CardText tag="h3">Vaccine : </CardText><CardText>{vaccine}</CardText>
        <CardText tag="h3">Fee type: </CardText><CardText>{fee}</CardText>
        <CardText tag="h3">Minimum Age : </CardText><CardText>{age}</CardText>
        <CardText tag="h3">Available Capacity : </CardText><CardText>{capacity}</CardText>
      </CardBody>
    </Card>
  );
}
