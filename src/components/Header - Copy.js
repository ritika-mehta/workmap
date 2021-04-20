import React, { Component } from "react";
import { connect } from "react-redux";
import ls from "local-storage";
import { fetchUserData } from "../actions/userPersonalInfo";
import { fetchAssessmentByIdData } from "../actions/getVacancyDetailsByAssessmentId";
import { sendQuestionData } from "../actions/sendPersonalityTestAction";
import { fetchAssessmentData } from "../actions/getSimpleAssesstments";
import { LogoutUser } from "../actions/LogOut";
import { Link, withRouter } from "react-router-dom";
import Modal from "../components/ModalDeleteVacancy";
import setToken from "../setToken";

class Header extends Component {
  state = {
    opendeMenu: false,
    modal: false,
    pageFound: true,
    consentMenu : true,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const {
      fetchUserData,
      fetchAssessmentByIdData,
      userInfo,
      match,
      vacancy,
      test,
      assessment,
      fetchAssessmentData,
      testType,
    } = this.props;

    if (token && !userInfo) {
      setToken(token);
      fetchUserData();
    }
    if (test && token && !!vacancy) {
      fetchAssessmentByIdData(match.params.id);
    }
    if (token && !assessment && testType) {
      fetchAssessmentData(vacancy.id);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node && !this.node.contains(e.targer)) {
      this.setState({ opendeMenu: false });
    }
  };

  onOpenMenu = () => {
    const { opendeMenu } = this.state;
    this.setState({ opendeMenu: !opendeMenu });
    document.addEventListener("mouseup", this.handleClick, false);
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  onCancel = () => {
    this.setState({ modal: false });
  };

  onDelete = () => {
    if (this.props.saveAndClose) {
      this.props.saveAndClose();
    }
  };

  saveAndClose = () => {
    this.setState({ modal: true });
  };
  render() {
    const refCompanyData = ls.get("refCompanyData");
    const { props } = this;
    const { opendeMenu, modal } = this.state;
    const token = localStorage.getItem("token");
    let headerLogo = "";
    if (this.props.logoURL) {
      headerLogo = (
        <img
          className="header-logo"
          src={this.props.logoURL}
          alt={this.props.logoAlt}
        />
      );
    } else if (refCompanyData && refCompanyData.logo) {
      headerLogo = (
        <img
          className="header-logo"
          src={refCompanyData.logo}
          alt={refCompanyData.name}
        />
      );
    } else {
      headerLogo = (
        <img
          className="header-logo"
          src="/assets/img/logo.png"
          alt="WhiteboxHR"
        />
      );
    }

    let logoHREF = '';
    let consentHeaderMenu = true;
    if(props.userInfo && token) {
      if(!props.userInfo.consent_provided){
        logoHREF = "#";
        consentHeaderMenu = false;
      }else{
        logoHREF = "/dashboard";
      }
    }  else{
         logoHREF = "/";
    }
    return (
      <header
        className={
          props.isDashboardHeader ? "header dashboard-header" : "header"
        }
      >
        {props.companylogo ? (
          <Link to={logoHREF}>
            <img
              className="header-logo"
              src={props.companylogo}
              alt="WhiteboxHR"
            />
          </Link>
        ) : (
          <Link to={logoHREF}>{headerLogo}</Link>
        )}
        {!props.game && props.logo && (
          <div
            style={{
              position: "absolute",
              right: "225px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            className="content"
          >
            <Link to={props.link || "/profile"} style={{ fontSize: "12px" }}>
              {props.position}
            </Link>
            <img src={props.logo} alt="company" className="companyLogo" />
          </div>
        )}
        {props.test && (
          <div className="endAssessmentButton content">
            {modal && (
              <Modal
                onCancel={this.onCancel}
                onDelete={this.onDelete}
                text={
                  "Would you like to save your answers and continue the rest later? Yes, save and continue later or Cancel"
                }
                bntCancel={"Cancel"}
                btnSuccess={"Yes"}
              />
            )}
            <div className="saveAndClose" onClick={this.saveAndClose}>
              Save and close
            </div>
          </div>
        )}
        {props.userInfo &&
          token &&
          (this.props.hideDorpDown === true ? null : (
            <div className="d-flex align-items-center">
              <div>
                <p className="profile-user-name">
                  {props.userInfo.first_name} {props.userInfo.last_name[0]}.
                </p>
              </div>
              
              <div className="dropDonwMenus" ref={(node) => (this.node = node)}>
                <span onClick={this.onOpenMenu} style={{ cursor: "pointer" }}>
                  {opendeMenu ? (
                    <i
                      className="fas fa-chevron-up"
                      style={{ fontSize: " 10px" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-chevron-down"
                      style={{ fontSize: " 10px" }}
                    ></i>
                  )}
                </span>

                <div className={opendeMenu ? "block" : "none"}>
                  <ul
                    style={{
                      padding: "0",
                      listStyle: "none",
                      margin: "0",
                      width: "100%",
                    }}
                  >
                    
                    <li className="listItem">
                      <Link to="/profile" className="headerLinks">
                        <span className="spanItem">
                          <i className="fas fa-cog dropDonwIcon"></i>My Profile
                        </span>
                      </Link>
                    </li>
                    
                    {consentHeaderMenu?
                    <li className="listItem">
                      <Link to="/jobs" className="headerLinks">
                        <span className="spanItem">
                          <i className="fas fa-briefcase dropDonwIcon"></i>All
                          Jobs
                        </span>
                      </Link>
                    </li>
                    : null }
                     {consentHeaderMenu?
                    <li className="listItem">
                      <Link to="/change-password" className="headerLinks">
                        <span className="spanItem">
                          <i className="fas fa-lock dropDonwIcon"></i>Change
                          Password
                        </span>
                      </Link>
                    </li>
                    : null }
                    
                    <li
                      className="listItem"
                      onClick={() => props.LogoutUser(props.history)}
                    >
                      <span to="/profile" className="headerLinks">
                        <span className="spanItem">
                          <i className="fas fa-sign-out-alt dropDonwIcon"></i>
                          Logout
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
          ))}
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // refCompData: state.refCompanyReducer.refCompData,
    userInfo: state.authUser.userInfo,
    isLoading: state.authUser.isLoading,
    vacancy: state.getAssessmentByVacancyId.vacancy,
    isLoadingVacancy: state.getAssessmentByVacancyId.isLoading,
    error: state.getAssessmentByVacancyId.error,
    assessment: state.assessmentsReduces.assessment,
    assessmentLoading: state.assessmentsReduces.isLoading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    LogoutUser,
    fetchUserData,
    fetchAssessmentByIdData,
    sendQuestionData,
    fetchAssessmentData,
  })(Header)
);
