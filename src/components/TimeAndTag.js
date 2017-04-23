import React from 'react';
import styles from './TimeAndTag.css';
import * as globalCss from './global.css'
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

function TimeAndTag( Props ) {

  const thisState={
    time:Props.time,
    tags:Props.tags
  }

  return (
    <div className={styles.normal}>
      <div className={styles.article_timeAnd_tag}>
        <strong>Time:</strong>
        <span className={styles.article_time}>{thisState.time}</span>
        <strong>Tag:</strong>
        {thisState.tags.map(tag => (
          <CheckableTag
            key={tag}
            className={styles.article_tag}>
            {tag}
          </CheckableTag>
        ))}
      </div>
    </div>
  );
}

export default TimeAndTag;
