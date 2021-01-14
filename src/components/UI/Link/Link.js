import React from 'react';
import { Link } from "react-router-dom";

const BLink = props => {
  return (
    <Link
      className={props.classes}
      style={{ cursor: 'pointer' }}
      activeClass='active'
      to={props.target}
    >
      {props.children}
    </Link>
  );
}; 
 /* 
  const StyledLink = styled(BLink)`
      text-transform: uppercase;
      font-weight: 700;
      color: #4e4e4e;
      font-size: 0.85rem;
      margin: 10px 5px !important;
      height: 15px !important;
  
      &:hover {
        color: darken(#0063cc, 6%) !important;
        height: 35px;
      }
      &.active {
        color: lighten(#0063cc, 5%) !important;
        height: 35px;
      }
      @media (min-width: 768px) {
        padding: 1rem 1rem;
      }
  `;*/
  export default BLink;