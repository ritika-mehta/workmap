import React from "react";

class Verification extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="verification-popup">
          <h2>Your content is under verification</h2>
          <p>
            You can read the rules of the post publication at the link below
          </p>
          <a href="/" className="link">
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.06375 14.5508H4.0625V16.044H5.06375C5.46575 16.044 5.78375 15.69 5.78375 15.318C5.783 14.8988 5.46575 14.5508 5.06375 14.5508Z"
                fill="#4657A7"
              />
              <path
                d="M9.09193 14.5815H8.09668V17.268H9.09193C10.7112 17.268 10.7824 14.5815 9.09193 14.5815Z"
                fill="#4657A7"
              />
              <path
                d="M17.25 11.25H0.75C0.3375 11.25 0 11.5875 0 12V19.5C0 19.9125 0.3375 20.25 0.75 20.25H17.25C17.6632 20.25 18 19.9125 18 19.5V12C18 11.5875 17.6632 11.25 17.25 11.25ZM5.0625 16.7947H4.06125V17.5867C4.06125 17.8507 3.89325 18 3.67725 18C3.47925 18 3.27 17.8507 3.27 17.586V14.2103C3.27 14.0123 3.426 13.7955 3.67725 13.7955H5.0625C5.8425 13.7955 6.5445 14.3175 6.5445 15.3187C6.54375 16.2667 5.8425 16.7947 5.0625 16.7947ZM9.14625 18H7.719C7.521 18 7.305 17.8912 7.305 17.628V14.2222C7.305 14.0062 7.521 13.8502 7.719 13.8502H9.09225C11.8328 13.8502 11.7727 18 9.14625 18ZM14.49 14.6295H12.744V15.5828H14.2733C14.49 15.5828 14.7052 15.7987 14.7052 16.0087C14.7052 16.2067 14.49 16.368 14.2733 16.368H12.744V17.6273C12.744 17.8373 12.5948 17.9993 12.3848 17.9993C12.1208 17.9993 11.9587 17.8373 11.9587 17.6273V14.2215C11.9587 14.0055 12.1215 13.8495 12.3848 13.8495H14.49C14.754 13.8495 14.9093 14.0055 14.9093 14.2215C14.9093 14.4142 14.754 14.6295 14.49 14.6295Z"
                fill="#4657A7"
              />
              <path
                d="M20.25 5.6895L15.3105 0.75C14.877 0.315 14.115 0 13.5 0H5.25C4.0095 0 3 1.0095 3 2.25V9.75C3 10.1648 3.33525 10.5 3.75 10.5C4.16475 10.5 4.5 10.1648 4.5 9.75V2.25C4.5 1.83675 4.836 1.5 5.25 1.5H12C12.8287 1.5 13.5 2.172 13.5 3V5.8125C13.5 6.741 14.2605 7.5 15.1875 7.5H18C18.8287 7.5 19.5 8.172 19.5 9V21.75C19.5 22.1632 19.1647 22.5 18.75 22.5H5.25C4.836 22.5 4.5 22.1632 4.5 21.75C4.5 21.3353 4.16475 21 3.75 21C3.33525 21 3 21.3353 3 21.75C3 22.9905 4.0095 24 5.25 24H18.75C19.9905 24 21 22.9905 21 21.75V7.5C21 6.88575 20.685 6.12375 20.25 5.6895Z"
                fill="#4657A7"
              />
            </svg>
            Community guidline
          </a>
        </div>
      </div>
    );
  }
}

export default Verification;