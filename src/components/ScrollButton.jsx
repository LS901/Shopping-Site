import PropTypes from "prop-types";
const ScrollButton = ({ children, className, onClick }) => {

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    const handleOnClick = () => {
        !!onClick && onClick();
        scrollToBottom();
    }

    return (
        <button className={className} onClick={handleOnClick}>
            {children}
        </button>
    );
}

ScrollButton.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
}
export default ScrollButton;