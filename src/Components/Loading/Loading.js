import React, { useState } from 'react';
import { Alert, Spin, Switch } from 'antd';

const App = () => {
    const [loading, setLoading] = useState(true);

    const toggle = (checked) => {
        setLoading(checked);
    };



    return (
        <Spin spinning={loading} delay={500} className='z-100 w-[90%] flex justify-center items-center h-[100%] ' />
    );
};

export default App;
