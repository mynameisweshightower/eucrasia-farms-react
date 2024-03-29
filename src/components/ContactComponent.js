import React, { Component } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Label,
	Col,
	Container,
	Jumbotron,
	Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(+val);
const validEmail = (val) =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			phoneNum: "",
			email: "",
			agree: false,
			contactType: "by Phone",
			feedback: "",
			touched: {
				firstName: false,
				lastName: false,
				phoneNum: false,
				email: false
			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		// console.log("Current state is: " + JSON.stringify(values));
		alert("Thank you for contacting us!\n\n" + JSON.stringify(values, "", 1) + "\n\nWe will contact you soon!");
	}

	render() {
		return (
			<>
			<div className="breadcrumb-outer">
				<div className="container">
					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem>
									<Link to="/home">Home</Link>
								</BreadcrumbItem>
								<BreadcrumbItem active>
									Contact
								</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</div>
				</div>
			</div>
			<Jumbotron fluid className="site-header">
				<Container>
					<div className="row">
						<div className="col">
							<h2>Contact</h2>
							<hr />
						</div>
					</div>
				</Container>
			</Jumbotron>
			<div className="container">
				<div className="row row-content align-items-center">
					<div className="col-sm-4">
						<h5>Our Address</h5>
						<address>
							XX Road 20
							<br />
							Nowata, OK 74048
							<br />
							U.S.A.
						</address>
					</div>
					<div className="col">
						<a role="button" className="btn btn-link" href="tel:+19185555446">
							<i className="fa fa-phone" /> 1-918-555-5446
						</a>
						<br />
						<a
							role="button"
							className="btn btn-link"
							href="mailto:wesley.l.hightower@gmail.com"
						>
							<i className="fa fa-envelope-o" /> info@eucrasiafarms.com
						</a>
					</div>
				</div>

				<div className="row row-content">
					<div className="col-12">
						<h2>Send us your Feedback</h2>
						<hr />
					</div>
					<div className="col-md-10">
						<LocalForm onSubmit={(values) => this.handleSubmit(values)} className="contact-form">
							<Row className="form-group">
								<Label htmlFor="firstName" md={2}>
									First Name
								</Label>
								<Col md={10}>
									<Control.text
										model=".firstName"
										className="form-control"
										id="firstName"
										name="firstName"
										placeholder="First Name"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".firstName"
										show="touched"
										component="div"
										messages={{
											required: "Required",
											minLength: "Must enter at least 2 characters",
											maxLength: "Must be fewer than 15 characters"
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="lastName" md={2}>
									Last Name
								</Label>
								<Col md={10}>
									<Control.text
										model=".lastName"
										className="form-control"
										id="lastName"
										name="lastName"
										placeholder="Last Name"
										validators={{
											required,
											minLength: minLength(2),
											maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".lastName"
										show="touched"
										component="div"
										messages={{
											required: "Required",
											minLength: "Must enter at least 2 characters",
											maxLength: "Must be fewer than 15 characters"
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="phoneNum" md={2}>
									Phone
								</Label>
								<Col md={10}>
									<Control.text
										model=".phoneNum"
										className="form-control"
										id="phoneNum"
										name="phoneNum"
										placeholder="Phone number"
										validators={{
											required,
											minLength: minLength(10),
											maxLength: maxLength(15),
											isNumber
										}}
									/>
									<Errors
										className="text-danger"
										model=".phoneNum"
										show="touched"
										component="div"
										messages={{
											required: "Required",
											minLength: "Must enter at least 10 numbers",
											maxLength: "Must be fewer than 15 numbers",
											isNumber: "Must be a number"
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="email" md={2}>
									Email
								</Label>
								<Col md={10}>
									<Control.text
										model=".email"
										className="form-control"
										id="email"
										name="email"
										placeholder="Email"
										validators={{
											required,
											validEmail
										}}
									/>
									<Errors
										className="text-danger"
										model=".email"
										show="touched"
										component="div"
										messages={{
											required: "Required",
											validEmail: "Invalid email address"
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 4, offset: 2 }}>
									<div className="form-check">
										<Label check>
											<Control.checkbox
												model=".agree"
												className="form-check-input"
												name="agree"
												defaultValue="false"
											/>{" "}
											<strong>May we contact you?</strong>
										</Label>
									</div>
								</Col>
								<Col md={4}>
									<Control.select
										model=".contactType"
										className="form-control"
										name="contactType"
										defaultValue="by Phone"
									>
										<option value="by Phone">By Phone</option>
										<option value="by Email">By Email</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="feedback" md={2}>
									Your Feedback
								</Label>
								<Col md={10}>
									<Control.textarea
										model=".feedback"
										className="form-control"
										id="feedback"
										name="feedback"
										rows="12"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10, offset: 2 }}>
									<Button type="submit" color="primary">
										Send Feedback
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default Contact;
