import React, { Component } from "react";

//Import library
import {
  Navbar,
  NavbarLink,
  NavbarBrand,
  NavbarItem,
  Icon,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  NavbarDivider,
  NavbarDropdown,
  Field,
  Control,
  Button,
  NavbarBurger
} from "bloomer";
import FaHhome from "react-icons/lib/fa/home";
import FaEye from "react-icons/lib/fa/eye";
import FaStar from "react-icons/lib/fa/star";
import FaCertificate from "react-icons/lib/fa/certificate";

//import css
import "../css/Navigation.css";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
			isActive: false
    };
  }

  render() {
		const {hand1leTopRating, hand1leTopLatest, hand1leTopPopular} = this.props
    return (
      <div className="">
        <Navbar className="Navigation-Bar">
          <NavbarBrand>
            <NavbarItem>
              <FaHhome size={20} /> Home
            </NavbarItem>
            <NavbarBurger
              isActive={this.state.isActive}
              onClick={this.onClickNav}
            />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarStart>
              <NavbarItem className="Navigation-Item" onClick = {() => hand1leTopLatest()}>
                <FaCertificate size={20} /> New Movies
              </NavbarItem>
              <NavbarItem className="Navigation-Item" onClick = {() => hand1leTopRating()}>
                <FaStar size={20} /> Best Rates
              </NavbarItem>
              <NavbarItem className="Navigation-Item" onClick = {() => hand1leTopPopular()}>
                <FaEye size={20} /> Popular
              </NavbarItem>
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink href="#/documentation">Gerne</NavbarLink>
                <NavbarDropdown>
                  <NavbarItem> Action </NavbarItem>
                  <NavbarItem> Emotion </NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            </NavbarStart>
          </NavbarMenu>
        </Navbar>
      </div>
    );
  }
}
