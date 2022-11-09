import React, { Component } from 'react'; // standard import
import Directory from './DirectoryComponent'; // child component
import ProductInfo from './ProductInfoComponent';
import StrainDirectory from './StrainDirectoryComponent';
import StrainInfo from './StrainInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchProducts, fetchStrains, fetchStrainComments, postStrainComment, fetchComments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    products: state.products,
    strains: state.strains,
    strainComments: state.strainComments,
    comments: state.comments,
    promotions: state.promotions,
    partners: state.partners
  };
};

const mapDispatchToProps = {
  postComment: (productId, rating, author, text) => (postComment(productId, rating, author, text)),
  fetchProducts: () => (fetchProducts()),
  fetchStrains: () => (fetchStrains()),
  fetchStrainComments: () => (fetchStrainComments()),
  postStrainComment: () => (strainId, rating, author, text) => (postStrainComment(strainId, rating, author, text)),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners()),
  postFeedback: (firstName, lastName, phoneNum, email, agree, contactType, feedback) => (postFeedback(firstName, lastName, phoneNum, email, agree, contactType, feedback))
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchStrains();
    this.props.fetchStrainComments();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
   // arrow functions inherit the 'this' of their parent scope
    const HomePage = () => {
      return (
        <Home
          product={this.props.products.products.filter(product => product.featured)[0]}
          productsLoading={this.props.products.isLoading}
          productsErrMess={this.props.products.errMess}
          promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
          partnerLoading={this.props.partners.isLoading}
          partnerErrMess={this.props.partners.errMess}
        />
      );
    };

    const ProductWithId = ({match}) => {
      return (
        <ProductInfo
          product={this.props.products.products.filter(product => product.id === +match.params.productId)[0]}
          isLoading={this.props.products.isLoading}
          errMess={this.props.products.errMess}
          comments={this.props.comments.comments.filter(comment => comment.productId === +match.params.productId)}
          commentErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }

    const StrainWithId = ({match}) => {
      return (
        <StrainInfo
          strain={this.props.strains.strains.filter(strain => strain.id === +match.params.strainId)[0]}
          isLoading={this.props.strains.isLoading}
          errMess={this.props.strains.errMess}
          strainComments={this.props.strainComments.strainComments.filter(strainComment => strainComment.strainId === +match.params.strainId)}
          commentErrMess={this.props.comments.errMess}
          postStrainComment={this.props.postStrainComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} /> {/* no props data is being passed, so we use the 'component' attribute with the component name as the value */ }
              <Route exact path='/products' render={() => <Directory products={this.props.products}/> } /> { /* passing props data with arrow function */ }
              <Route path='/products/:productId' component={ProductWithId} />
              <Route exact path='/strains' render={() => <StrainDirectory strains={this.props.strains}/> } /> { /* passing props data with arrow function */ }
              <Route path='/strains/:strainId' component={StrainWithId} />
              <Route path='/aboutus' render={() => <About partners={this.props.partners}/> } />
              <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
