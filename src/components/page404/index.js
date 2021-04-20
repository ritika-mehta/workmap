import React, {Component} from 'react';
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

class ForgotPasswordSuccess extends Component {

  // goBack = () => {
  //   this.props.history.goBack()
  // }

    render() {
      return (
        <div className="auth-layout">
          <div className="header-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* <Header history={this.props.history}/> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                  <div className="auth-form-container text-center">
                      <p className="auth-form-title">Page not found</p>
                      <p className="auth-form-text" style={{margin: "36px 0"}}>
                          Unfortunately the page you’re looking for isn’t here.
                      </p>
                      <button className="tr8s-button green" onClick={this.goBack}>Go back</button>
                  </div>
              </div>
            </div>
          </div>
          <div className="footer-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* <Footer/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default ForgotPasswordSuccess;
