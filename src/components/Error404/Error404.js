import React from 'react';
import { Empty } from 'antd';

export const Error404 = () => {
    return (
        <div type="flex" align="middle">
            <h1>Sorry, route not found</h1>
            <Empty />
        </div>
    );
}