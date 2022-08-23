import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import AddonItem from "./AddonItem";
import addonContext from "../../context/addonContext";

export default function AddonCard({ title }) {
  const [show, setShow] = useState("none");
  // use follow context to get all addons
  const context = useContext(addonContext);
  const { getAllAddons, addons } = context;
  const [text, setText] = useState({
    text: "View More (3)",
    icon: <KeyboardArrowDown />,
  });
  // handle click on view more and less more
  const handleClick = () => {
    show === "none" ? setShow("flex") : setShow("none");
    text.text === "View More (3)"
      ? setText({
          text: "View Less",
          icon: <KeyboardArrowUp />,
        })
      : setText({
          text: "View More (3)",
          icon: <KeyboardArrowDown />,
        });
  };

  useEffect(() => {
    getAllAddons();
    //eslint-disable-next-line
  }, []);

  return (
    <Grid className="addons-container">
      <div className="add-ons">
        <h3>{title}</h3>
        <span className="optional">Optional</span>
      </div>
      <div className="addon-item">
        {addons.slice(0, 2).map((addon, index) => {
          return (
            <div className="addon-info" key={index}>
              <AddonItem addon={addon} index={index} />
            </div>
          );
        })}
        {addons.slice(2, 5).map((addon, index) => {
          return (
            <div className="addon-info" key={index} style={{ display: show }}>
              <AddonItem addon={addon} index={index} />
            </div>
          );
        })}
        <div
          className="addon-info"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <div className="addon-view-more" onClick={handleClick}>
            <span className="view-more">
              {text.text}
              {text.icon}
            </span>
          </div>
        </div>
      </div>
    </Grid>
  );
}