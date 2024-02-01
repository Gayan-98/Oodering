import { Link } from "react-router-dom";

import "./Home.css";
import { Button } from "@chakra-ui/react";
import MainMenu from "../componants/MainMenu";
import Cart from "../componants/Cart";
import Logo from "../componants/Logo";
import { useState } from "react";

function Home() {

  const [cartItem,setCartItem]=useState([]);

  return (
    <div className="home-container">
      <div className="home-nav">
        <Logo />
        <div>
          <Link to={"/login"}>
            <Button colorScheme="blue" variant={'outline'}>Login</Button>
          </Link>
          <Link to={"/register"}>
            <Button colorScheme="yellow" variant={'outline'}>Register</Button>
          </Link>
        </div>
      </div>

      <div className="home-inner-container">

         <MainMenu cartItem={cartItem} setCartItem={setCartItem}/>
         <Cart  cartItem={cartItem} setCartItem={setCartItem}/>
         

      </div>


    </div>
  );
}

export default Home;
