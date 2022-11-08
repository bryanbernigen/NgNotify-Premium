import * as React from 'react';
import Footbar from '../reusables/footbar/footbar';
import Sidebar from '../reusables/sidebar/sidebar';
import Topbar from '../reusables/topbar/topbar';

const SearchSortFilter = () => {
    return (
        <div>
            <Sidebar creds='admin' />
            <div className='ct'>
                <Topbar />
                <Footbar />
            </div>
        </div>
    );
};

export default SearchSortFilter;