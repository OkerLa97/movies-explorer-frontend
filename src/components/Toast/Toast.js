import React from "react";

class Toast extends React.Component {

  render(){
    return (
      <div className={this.props.opened ? "toast toast-opened" : "toast"}>
        <p className="toast__text">{this.props.text}</p>
      </div>
    )
  }
}

export default Toast;
