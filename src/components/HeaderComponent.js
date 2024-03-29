import React, { Component } from "react";
import {
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	NavItem,
	Jumbotron,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isNavOpen: false,
			isModalOpen: false
		};

		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleLogin(event) {
		alert(
			`Username: ${this.username.value}\nPassword: ${this.password.value}\nRemember: ${this.remember.checked}\n\nThank you! We will forward this information to our identity theft unit. Your banking institution will contact you soon!`
		);
		this.toggleModal();
		event.preventDefault();
	}

	render() {
		return (
			<React.Fragment>
				<Jumbotron fluid>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<Link to="/home">
									<img
										src="/assets/images/logo.png"
										className="img-fluid logo"
										alt="Eucrasia Farms logo"
									/>
								</Link>
							</div>
							<div className="col text-center">
								<h1 className="sr-only">Eucrasia Farms</h1>
							</div>
						</div>
					</div>
				</Jumbotron>
				<Navbar dark sticky="top" expand="md">
					<div className="container">
						<NavbarBrand className="mr-auto" href="/">
							<img
								src="/assets/images/logo.png"
								height="30"
								width="30"
								alt="Eucrasia Farms logo"
							/>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggleNav} />
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<i className="fa fa-home fa-lg" /> Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/aboutus">
										<i className="fa fa-info fa-lg" /> About
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className="nav-link"
										to="/products"
									>
										<i className="fa fa-list fa-lg" />{" "}
										Products
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/strains">
										<i className="fa fa-list fa-lg" />{" "}
										Strains
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className="nav-link"
										to="/contactus"
									>
										<i className="fa fa-address-card fa-lg" />{" "}
										Contact
									</NavLink>
								</NavItem>
							</Nav>
							<span className="navbar-text ml-auto">
								<Button outline onClick={this.toggleModal}>
									<i className="fa fa-sign-in fa-lg" /> Login
								</Button>
							</span>
						</Collapse>
					</div>
				</Navbar>

				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label htmlFor="username">Username</Label>
								<Input
									type="text"
									id="username"
									name="username"
									innerRef={(input) =>
										(this.username = input)
									}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									id="password"
									name="password"
									innerRef={(input) =>
										(this.password = input)
									}
								/>
							</FormGroup>
							<FormGroup check>
								<Input
									type="checkbox"
									id="remember"
									name="remember"
									innerRef={(input) =>
										(this.remember = input)
									}
								/>
								<Label htmlFor="remember" check>
									Remember Me
								</Label>
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								color="primary"
							>
								Login
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export default Header;
