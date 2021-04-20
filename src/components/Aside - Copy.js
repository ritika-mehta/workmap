import React from 'react';
import AsideCompany from './Aside/AsideCompany';
import AsideVacancy from './Aside/AsideVacancy';
import AsideSteps from './Aside/AsideSteps';

function Aside(props) {
  return (
    <div className="aside-wrapper">

      <AsideVacancy vacancyName="Web Developer (Front End)" vacancyLink="#"/>

      <AsideCompany companyName="FedEx Company" companyLogo="/assets/img/fedex-logo.png"/>

      <AsideSteps/>

    </div>
  );
}

export default Aside;
