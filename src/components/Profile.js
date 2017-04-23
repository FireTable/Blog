import React from 'react';
import styles from './Profile.css';
import * as globalCss from './global.css'

function Profile(blogger) {

  return (
    <div className={styles.normal}>
      <img src='http://www.005.tv/uploads/allimg/161130/1524313256-6.jpg'/>
      <h1>{blogger.userName}</h1>
      <span>{blogger.motto}</span>
      <hr className={styles.panel_divider}/>
      <p>{blogger.selfDes}</p>
      <hr className={styles.panel_divider}/>
      <p>
      	<a href={blogger.newEventSrc}>{blogger.newEventTxt}</a>
      </p>
    </div>
  );
}

export default Profile;
