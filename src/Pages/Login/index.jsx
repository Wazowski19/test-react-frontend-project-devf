import React, { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

import { FlagJona } from "../../Components/Molecules/Bandera";

/** Import utils */
import makeToken from "../../utils/useRandomString";

/** Import CSS */
import "./_login.scss";

export default function Login(props) {
  const [userAccount, setUserAccount] = useState("");
  const [userPass, setUserPass] = useState("");
  const [background, setBackground] = useState(false);
  const [logPageColor, setLogPageColor] = useState("logPage--light")

  const styles = () =>{
    setBackground(!background)
  }

  useEffect(() =>{
    if (background === true){
      setLogPageColor("logPage--dark")
    }else if(background === false){
      setLogPageColor("logPage--light")
    }
  }, [background])

  const generateToken = async () => {
    if (
      !userAccount ||
      !userAccount?.length ||
      !userPass ||
      !userPass?.length
    ) {
      alert("Campos incompletos");
    }
    const tokenUserToSave = await makeToken(8);
    if (tokenUserToSave) localStorage.setItem("tokenUser", tokenUserToSave);
    window.location.reload();
  };

  return (
    <Container className={`logPage ${logPageColor} border`} fluid>
      <Button color="primary" onClick={() => styles()}>Cambiar fondo</Button>
      
      <Form inline>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <div className="logPage__image">
            <img
              alt="logo page"
              src="images/reactjs-hooks.png"
              className="logPage__logo"
            />
          </div>
       </FormGroup>

        <FlagJona />
        
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label className="me-sm-2" for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            value={userAccount}
            onChange={(e) => setUserAccount(e.target.value)}
            placeholder="account"
            type="email"
          />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label className="me-sm-2" for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            placeholder="password"
            type="password"
          />
        </FormGroup>

        <div className="logPage__button">
          <Button color="primary" onClick={() => generateToken()}>
            Ingresar
          </Button>
        </div>
      </Form>
    </Container>
  );
}
