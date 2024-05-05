import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import ReactHtmlParser from 'react-html-parser';
import IPostCard from '../types/PostCard';
import { url } from '../utils/url';
import { authService } from '../services/authService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';


const Post: React.FC = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<IPostCard | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const token = authService.getAccessToken();
                const response = await fetch(`${url.base_resource_url}/posts/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    // throw new Error('Failed to fetch post data');
                }
                const postData = await response.json();
                setPost(postData.data[0]);


            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center mt-10 mb-10 flex-col'>
                <div className="block w-[50rem] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
                    {post && (
                        <>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            <p className="text-[12px] text-gray-700 dark:text-gray-400">by {post.postedBy} </p>
                            <p className="text-[12px] text-gray-700 dark:text-gray-400">{formatDate(post.postedAt)} </p>

                            <div className='mt-4'>
                                {post.tags.map((tag, index) => (
                                    <Tag key={index} text={tag} />
                                ))}
                            </div>

                            {post.content && (
                                <div className="font-normal text-gray-700 dark:text-gray-400 mt-5">{ReactHtmlParser(post.content)}</div>
                            )}
                        </>
                    )}

                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                    onClick={handleGoBack}
                >
                    Back
                </button>

            </div>

        </>
    );
};

export default Post;
