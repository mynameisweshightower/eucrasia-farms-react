import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardImg,
	CardImgOverlay,
	CardTitle,
	Container,
	Jumbotron
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";

function RenderDirectoryItem({ product, errMess, isLoading }) {
	if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>;
  }

  return (
    <Card className="product-card overlay-card">
      <Link to={`/products/${product.id}`}>
        <CardImg width="100%" src={baseUrl + product.image} alt={product.name} />
        <CardImgOverlay>
          <CardTitle>{product.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Directory(props) {
	const directory = props.products.products.map((product) => {
		return (
			<div key={product.id} className="col-md-4 mb-4">
				<RenderDirectoryItem product={product} />
			</div>
		);
	});

	return (
		<React.Fragment>
			<div className="breadcrumb-outer">
				<div className="container">
					<div className="row">
						<div className="col">
							<Breadcrumb>
								<BreadcrumbItem>
									<Link to="/home">Home</Link>
								</BreadcrumbItem>
								<BreadcrumbItem active>
									Products
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
							<h2>Products</h2>
							<hr />
						</div>
					</div>
				</Container>
			</Jumbotron>
			<div className="container">
				<div className="row">{directory}</div>
			</div>
		</React.Fragment>
	);
}

export default Directory;
