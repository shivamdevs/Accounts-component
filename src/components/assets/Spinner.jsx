import PropTypes from 'prop-types';
import css from './spinnerbutton.module.css';

function Spinner(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={css.svg}
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#46dff0"
                strokeWidth="0"
                fill="none"
            ></circle>
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke={props.color ?? "#fff"}
                strokeWidth={props.width ?? "10"}
                strokeLinecap="round"
                fill="none"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1.6s"
                    values="0 50 50;180 50 50;720 50 50"
                    keyTimes="0;0.5;1"
                ></animateTransform>
                <animate
                    attributeName="stroke-dasharray"
                    repeatCount="indefinite"
                    dur="1.6s"
                    values="25.132741228718345 226.1946710584651;201.06192982974676 50.26548245743669;25.132741228718345 226.1946710584651"
                    keyTimes="0;0.5;1"
                ></animate>
            </circle>
        </svg>
    )
}

Spinner.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
};

export default Spinner;
