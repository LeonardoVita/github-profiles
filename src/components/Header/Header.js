import React from "react";
import { BiPowerOff } from "react-icons/bi";

import style from "./header.module.css";

export default function Header({setLogoutModal, paragraph}) {
  return (
    <header className={style["header-container"]}>
      <div className={`container ${style["header-content"]}`}> 
        <div className={style["header-title"]}>
          <h1>GHProfiles</h1>
          <p>{paragraph}</p>
        </div>
        {
          setLogoutModal && (
          <button className={style["logout-button"]} onClick={()=>setLogoutModal(true)}>
            <BiPowerOff size="24px"/>
          </button>
          )
        }
      </div>
    </header>
  );
};
