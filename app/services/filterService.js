import Filtered from '../data/fill-filter.svg';
import { toggleFilterText } from '../services/filterService';

export function toggleFilterText() {
    const [filterIcon, setFilterIcon] = useState(LineFilter); // Initial icon state

    const toggleFilter = () => {
        toggleFilterText();
        
        if (filterIcon === LineFilter) {
            setFilterIcon(Filtered);
        } else {
            setFilterIcon(LineFilter);
        }
    };
}