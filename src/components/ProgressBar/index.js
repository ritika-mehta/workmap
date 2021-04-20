import React from 'react';
import style from './style.module.css';
const ProgressBar = ({ lineHeight, current,max, colorBar, colorProgress }) => (
    <div className={style.progressWrapper}>
        <div
            className={style.progress}
            style={{ height: `${lineHeight}px`, background: colorBar }}>
            <div
                className={style.complele}
                style={{ width: `${100*current/max}%`, background: colorProgress }} />
        </div>
    </div>
);

export default ProgressBar;