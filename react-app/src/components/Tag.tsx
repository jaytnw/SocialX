import React from 'react';

const Tag: React.FC<{ text: string }> = ({ text }) => {
    return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {text}
        </span>
    );
};

export default Tag;
