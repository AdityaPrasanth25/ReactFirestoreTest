import React from "react";
const Tabs = () => {
  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li>1st Year</li>
        <li>2nd Year</li>
        <li>3rd Year</li>
        <li>4th Year</li>
      </ul>
      <div className="outlet">
        {/* content will be shown here */}
      </div>
    </div>
  );
};
export default Tabs;