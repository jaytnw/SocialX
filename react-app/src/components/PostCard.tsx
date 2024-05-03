import React from 'react';
import Tag from './Tag';
import IPostCard from '../types/PostCard';
import ReactHtmlParser from 'react-html-parser'; 
import truncateContent from '../utils/truncateContent';
import formatDate from '../utils/formatDate';

const PostCard: React.FC<{ post: IPostCard }> = ({ post }) => {
    return (
        <div className="block w-[50rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
            <p className="text-[12px] text-gray-700 dark:text-gray-400">by {post.postedBy} </p>
            <p className="text-[12px] text-gray-700 dark:text-gray-400">{formatDate(post.postedAt)} </p>
    
            {post.content && (
                <div className="font-normal text-gray-700 dark:text-gray-400 mt-2">{ReactHtmlParser(truncateContent(post.content))}</div>
            )}

            <div className='mt-4'>
                {post.tags.map((tag, index) => (
                    <Tag key={index} text={tag} />
                ))}
            </div>
        </div>
    );
};

export default PostCard;
