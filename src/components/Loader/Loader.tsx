import './Loader.modal.css';
import { Oval } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className="loader-mine">
            <Oval
                height={100}
                width={100}
                color="#4fa94d"
                visible={true}
                ariaLabel="loading"
            />
        </div>
    );
};

export default Loader;
