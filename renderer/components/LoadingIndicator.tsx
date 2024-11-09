import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function LoadingIndicator({ show = false }) {
    return (
        <div className={ `fixed inset-0 z-50 bg-black/50 flex justify-center items-center w-full h-full ${ show ? 'block' : 'hidden' }` }>
            <div className="flex flex-col w-24 h-24 items-center-justify-center">
                <FontAwesomeIcon icon={faCircleNotch} className="text-white text-7xl" spin />
            </div>
        </div>
    )
}