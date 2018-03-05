import React from "react";
import {
  Navbar,
  NavbarBrand,
  Button
} from "reactstrap";
import "../styles/styles.css"
//Se recomienda documentar el componente principal, para saber que se espera que sea renderizado.
export default class App extends React.Component {
  render() {
	  //Me gusta que utilicen el localstorage de react para almacenar los tokens.
	if(!localStorage.getItem("token")) {
		    return (
      <div>
        <Navbar color="dark" className="fixed-top navbar-dark bg-dark">
          <NavbarBrand href="/">Why Go Alone</NavbarBrand>
		  <Button outline color="danger" onClick={()=>{window.location = "/signIn"}} className="ml-auto nav_btn">Sign In</Button>
		  <Button outline color="danger" onClick={()=>{window.location = "/signUp"}} className="nav_btn">Sign Up</Button>
        </Navbar>
		<div class="content">
			{this.props.children}
		</div>
		<footer className="bg-dark">
			<div class="footer_brand">Why Go Alone</div>
			<div class="footer_makers">William Ravelo M & Nicolas Aguilas</div>
			<div class="footer_license">MIT License</div>
		</footer>
  </div>
    );
	} else {
		return (
      <div>
        <Navbar color="dark" className="fixed-top navbar-dark bg-dark">
          <NavbarBrand href="/">Why Go Alone</NavbarBrand>
		  <Button outline color="danger" onClick={()=>{
			  localStorage.clear();
			  window.location = "/"}} className="ml-auto nav_btn">Sign Out</Button>
        </Navbar>
		<div class="content">
			{this.props.children}
		</div>
		<footer className="bg-dark">
			<div class="footer_brand">Why Go Alone</div>
			<div class="footer_makers">William Ravelo M & Nicolas Aguilar</div>
			<div class="footer_license">MIT License</div>
		</footer>
  </div>
		);
	}
 }
}
