import PropTypes from "prop-types";
import { Component, useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

// export default function Modal({ onClose, children }) {
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   });

//   const handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       onClose();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div className="Overlay" onClick={handleBackdropClick}>
//       <div className="Modal">
//         <img alt="modal-img" />
//         <button type="button">Close Modal</button>
//       </div>
//     </div>,
//     modalRoot
//   );
// }

// Modal.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func,
// };

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
