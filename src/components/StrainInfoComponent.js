import { React, Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Jumbotron,
	Container,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	Table
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderStrain({ strain }) {
	const thcWidth = {
		width: strain.cannabinoids.thc
	};
	const cbdWidth = {
		width: strain.cannabinoids.cbd
	};

	return (
		<div>
			<div className="strains-description-outer">
				<Container>
					<div className="row">
						<div className="col-md-6">
							<FadeTransform
								in
								transformProps={{
									exitTransform: "scale(0.5) translateY(-50%)"
								}}
							>
								<Card>
									<CardImg top src={baseUrl + strain.image} />
									<CardBody>
										<CardText>
											{strain.description}
										</CardText>
									</CardBody>
								</Card>
							</FadeTransform>
						</div>
						<div className="col">
							<Table borderless>
								<tbody>
									<tr>
										<th scope="row">Species</th>
										<td>{strain.species}</td>
									</tr>
									<tr>
										<th scope="row">Cannabinoids</th>
										<td>THC: {strain.cannabinoids.thc}</td>
										<td>CBD: {strain.cannabinoids.cbd}</td>
									</tr>
									<tr>
										<th scope="row">Flavor Profile</th>
										<td>{strain.flavorProfile}</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				</Container>
			</div>
			<div className={"species-outer " + strain.species.toLowerCase()}>
				<Container>
					<div className="row pt-5 pb-5">
						<div className="col">
							<h3>Species</h3>
							<p>{strain.species}</p>
						</div>
					</div>
				</Container>
			</div>
			<div className="flavor-outer">
				<Container>
					<div className="row pt-5 pb-5">
						<div className="col">
							<h3>Flavor Profile</h3>
							<p>{strain.flavorProfile}</p>
						</div>
					</div>
				</Container>
			</div>
			<div className="cannabinoids-outer">
				<Container>
					<div className="row pt-5 pb-5">
						<div className="col-12">
							<h3>Cannabinoids</h3>
						</div>
						<div className="col-md-3 align-self-center">
							<h4>THC</h4>
						</div>
						<div className="col-md-9">
							<div className="cannibanoid thc">
								<div className="meter animate">
									<span style={thcWidth}>
										<span>{strain.cannabinoids.thc}</span>
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-3 align-self-center">
							<h4>CBD</h4>
						</div>
						<div className="col-md-9">
							<div className="cannibanoid thc">
								<div className="meter animate">
									<span style={cbdWidth}>
										<span>{strain.cannabinoids.cbd}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

function RenderStrainComments({ strainComments, postStrainComment, strainId }) {
	if (strainComments) {
		return (
			<div className="comments-outer strain-comments-outer">
				<div className="container">
					<div className="row">
						<div className="col">
							<h4>Comments</h4>
							<Stagger in>
								{strainComments.map((strainComment) => {
									return (
										<Fade in key={strainComment.id}>
											<div>
												<p>
													{strainComment.text}
													<br />
													-- {strainComment.author},{" "}
													{new Intl.DateTimeFormat("en-US", {
															year: "numeric",
															month: "short",
															day: "2-digit"
														}).format(
														new Date(Date.parse(strainComment.date))
													)}{" "}
													({strainComment.rating}{" "}
													{strainComment.rating ===	"1"
														? "star"
														: "stars"}
													)
												</p>
											</div>
										</Fade>
									);
								})}
							</Stagger>
							{/* <StrainCommentForm strainId={strainId} postStrainComment={postStrainComment} /> */}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <div />;
}

/* class StrainCommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
			touched: {
				author: false
			}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleStrainSubmit = this.handleStrainSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleStrainSubmit(strainValues) {
		console.log('before modal closes');
		this.toggleModal();
		console.log('modal is closed');
		this.props.postStrainComment(
			this.props.strainId,
			strainValues.rating,
			strainValues.author,
			strainValues.text
		);
		console.log('after postStrainComment');
	}

	render() {
		return (
			<div>
				<Button
					className="btn btn-primary"
					outline
					color="white"
					onClick={this.toggleModal}
				>
					<i className="fa fa-pencil fa-lg" /> Submit Comment
				</Button>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						New StrainComment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(strainValues) => this.handleStrainSubmit(strainValues)}
						>
							<div className="form-group">
								<Label htmlFor="rating">Rating</Label>
								<Control.select
									className="form-control"
									model=".rating"
									id="rating"
									name="rating"
									defaultValue="1"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Control.select>
							</div>
							<div className="form-group">
								<Label htmlFor="author">Your Name</Label>
								<Control.text
									className="form-control"
									model=".author"
									id="author"
									name="author"
									placeholder="Your Name"
									validators={{
										required,
										minLength: minLength(2),
										maxLength: maxLength(15)
									}}
								/>
								<Errors
									className="text-danger"
									model=".author"
									show="touched"
									component="div"
									messages={{
										required: "Required",
										minLength:
											"Must be at least 2 characters",
										maxLength:
											"Must be fewer than 15 characters"
									}}
								/>
							</div>
							<div className="form-group">
								<Label htmlFor="text">StrainComment</Label>
								<Control.textarea
									className="form-control"
									model=".text"
									id="text"
									name="text"
									placeholder="Everything was outside, which surprised..."
								/>
							</div>
							<div className="form-group">
								<Button type="submit" color="primary">
									Submit StrainComment
								</Button>
							</div>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
} */

function StrainInfo(props) {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>{props.errMess}</h4>
					</div>
				</div>
			</div>
		);
	}
	if (props.strain) {
		return (
			<div>
				<div className="breadcrumb-outer">
					<div className="container">
						<div className="row">
							<div className="col">
								<Breadcrumb>
									<BreadcrumbItem>
										<Link to="/home">Home</Link>
									</BreadcrumbItem>
									<BreadcrumbItem>
										<Link to="/strains">Strains</Link>
									</BreadcrumbItem>
									<BreadcrumbItem active>
										{props.strain.name}
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
								<h2>{props.strain.name}</h2>
								<hr />
							</div>
						</div>
					</Container>
				</Jumbotron>
				<div className="content-outer">
					<RenderStrain strain={props.strain} />
					<RenderStrainComments
						strainComments={props.strainComments}
						//postStrainComment={props.postStrainComment}
						strainId={props.strain.id}
					/>
				</div>
			</div>
		);
	}
	return <div></div>;
}

export default StrainInfo;
