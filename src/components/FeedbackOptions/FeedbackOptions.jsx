import PropTypes from 'prop-types';
import { Button } from './FeedbackOptions.styled';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
    const butNames = Object.keys(options); 
    return (
        <div>{butNames.map((el) => {
            const butName = el.charAt(0).toUpperCase() + el.slice(1); 
            return <Button key={el} type="button" onClick={() => onLeaveFeedback(el)}>{butName}</Button>;
        })}</div>
        
    )
};

FeedbackOptions.propTypes = {
    options: PropTypes.shape({
        good: PropTypes.number.isRequired,
        neutral: PropTypes.number.isRequired,
        bad: PropTypes.number.isRequired,
    }),
    onLeaveFeedback: PropTypes.func.isRequired,
}

export default FeedbackOptions;