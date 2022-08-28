import errorImg from './error.gif';
import './error.scss';

const Error = () => {
    return (
        <img className='errorMessage' src={errorImg} alt="error img"/>
    )
}

export default Error;