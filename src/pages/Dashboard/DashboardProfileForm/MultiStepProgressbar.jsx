import React, { useRef, useEffect } from "react"
import './multiStep.scss';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

export default function MultiStepProgressbar (props) {
    const progressBarRef = useRef(null);

    useEffect(() => {
        progressBarRef.current = props.progressRef;
    }, [props.progressRef]);

  return (
    <div className='profile-progress'>
        <ProgressBar
            percent={((props.step ) * 100) / 2}
            filledBackground="#0084B3"
            nodeRef={progressBarRef}
        >
            <Step transition="scale">
            {({ accomplished, index }) => (
                <div className={`step ${accomplished ? "complete" : ""}`}>
                    1
                </div>
            )}
            </Step>
            <Step transition="scale">
            {({ accomplished, index }) => (
                <div className={`step ${accomplished ? "complete" : ""}`}>
                    2
                </div>
            )}
            </Step>
            <Step transition="scale">
            {({ accomplished, index }) => (
                <div className={`step ${accomplished ? "complete" : ""}`}>
                    3
                </div>
            )}
            </Step>
      </ProgressBar>
    </div>
  )
};
