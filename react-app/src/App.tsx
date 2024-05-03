import { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import IPostCard from './types/PostCard';
import { url } from './utils/url';
import { authService } from './services/authService';
import LoadingSpinner from './components/LoadingSpiner';
import { Link, useNavigate } from 'react-router-dom';

function App(): JSX.Element {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPostCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = authService.getAccessToken();
      const response = await fetch(
        `${url.base_resource_url}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const responseData = await response.json();
      setPosts(responseData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    authService.refreshToken(navigate);
  }, []);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className='mt-10'>
          <SearchForm />
        </div>

        <div className='mt-5 flex justify-center align-middle'>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col items-center">
              {posts.map((post, index) => (
                <div key={index} className="mb-4">
                  <Link to={`/post/${post.id}`} className="block w-full max-w-5xl mx-auto">
                    <PostCard post={post} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-5 my-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePreviousPage}
            disabled={pageNumber === 1}
          >
            Previous Page
          </button>
          <span className="mx-2">Page {pageNumber}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        </div>

      </div>
    </>
  );
}

export default App;
