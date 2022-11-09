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

function RenderStrainDirectoryItem({ strain, errMess, isLoading }) {
	if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>;
  }

  return (
    <Card className="strain-card overlay-card">
      <Link to={`/strains/${strain.id}`}>
        <CardImg width="100%" src={baseUrl + strain.image} alt={strain.name} />
        <CardImgOverlay>
          <CardTitle>{strain.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function StrainDirectory(props) {
	const directory = props.strains.strains.map((strain) => {
		return (
			<div key={strain.id} className="col-md-4 mb-4">
				<RenderStrainDirectoryItem strain={strain} />
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
									Strains
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
							<h2>Strains</h2>
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

export default StrainDirectory;
