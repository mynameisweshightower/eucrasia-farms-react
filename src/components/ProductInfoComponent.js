import { React, Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Container,
	Jumbotron,
	Label,
	Modal,
	ModalHeader,
	ModalBody
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderProduct({ product }) {
	return (
		<div className="col-md-5 m-1">
			<FadeTransform
				in
				transformProps={{
					exitTransform: "scale(0.5) translateY(-50%)"
				}}
			>
				<Card>
					<CardImg top src={baseUrl + product.image} />
					<CardBody>
						<CardText>{product.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		</div>
	);
}

function RenderComments({ comments, postComment, productId }) {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments</h4>
				<Stagger in>
					{comments.map((comment) => {
						return (
							<Fade in key={comment.id}>
								<div>
									<p>
										{comment.text}
										<br />
										-- {comment.author},{" "}
										{new Intl.DateTimeFormat("en-US", {
											year: "numeric",
											month: "short",
											day: "2-digit"
										}).format(
											new Date(Date.parse(comment.date))
										)}{" "}
										({comment.rating}{" "}
										{comment.rating === "1"
											? "star"
											: "stars"}
										)
									</p>
								</div>
							</Fade>
						);
					})}
				</Stagger>
				<CommentForm productId={productId} postComment={postComment} />
			</div>
		);
	}

	return <div />;
}

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
			touched: {
				author: false
			}
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(
			this.props.productId,
			values.rating,
			values.author,
			values.text
		);
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
						New Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
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
								<Label htmlFor="text">Comment</Label>
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
									Submit Comment
								</Button>
							</div>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

function ProductInfo(props) {
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
	if (props.product) {
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
									<BreadcrumbItem>
										<Link to="/products">Products</Link>
									</BreadcrumbItem>
									<BreadcrumbItem active>
										{props.product.name}
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
								<h2>{props.product.name}</h2>
								<hr />
							</div>
						</div>
					</Container>
				</Jumbotron>
				<div className="container">
					<div className="row">
						<RenderProduct product={props.product} />
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							productId={props.product.id}
						/>
					</div>
				</div>
			</>
		);
	}
	return <div></div>;
}

export default ProductInfo;
