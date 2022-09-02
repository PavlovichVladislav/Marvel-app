import Error from "../common/error/Error";
import { Link } from "react-router-dom";

import './404.scss';

const Page404 = () => {
    return (
        <div>   
            <Error/>
            <p className="descrFor404">Page does not exist</p>
            <Link className='linkToMainPage' to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;