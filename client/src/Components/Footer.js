import React from "react";
import "./Footer.css";
const FooterWrapper = ({ children = null }) => (
  <div className="Site">
    <div className="Site-content">{children}</div>
    <div className="footer-info">
      <p className=" py-2 m-0 ">Copyright © 2021. All rights reserved.</p>
    </div>
  </div>
);
export default FooterWrapper;
