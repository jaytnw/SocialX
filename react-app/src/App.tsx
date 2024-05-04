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
  const [clickSearchByTag, setClickSearchByTag] = useState<boolean>(false);

  const [posts, setPosts] = useState<IPostCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>('');
  const [tagName, setTagName] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const [errorMessageFetchData, setErrorMessageFetchData] = useState<string>('');


  const refreshTokenIntervalTime = 5 * 60 * 1000; 

  const fetchPosts = async () => {
    setLoading(true);
    setErrorMessageFetchData('')

    try {
   
      const token = authService.getAccessToken();
      const response = await fetch(
        `${url.base_resource_url}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        setErrorMessageFetchData(responseData.message)
        setPosts([]);
        setLoading(false);
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


  const searchByTag = async (keyword: string, tagName: string) => {
    setLoading(true);
    setClickSearchByTag(true)
    setKeyword(keyword)
    setTagName(tagName)
    setErrorMessageFetchData('')
    try {
     
      const token = authService.getAccessToken();

      const queryString = `keyword=${keyword}&tagName=${tagName}&sort=${sortBy}`;

      const response = await fetch(
        `${url.base_resource_url}/posts/searchByTag?pageNumber=${pageNumber}&pageSize=${pageSize}&${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        setErrorMessageFetchData(responseData.message)
        setPosts([]);
        setLoading(false);
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
    clickSearchByTag ? searchByTag(keyword, tagName) : fetchPosts();



  }, [pageNumber, pageSize, sortBy]);

  useEffect(() => {
    authService.refreshToken(navigate);

    const refreshTokenInterval = setInterval(() => {
      authService.refreshToken(navigate);
    }, refreshTokenIntervalTime);

  
    return () => clearInterval(refreshTokenInterval);
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
          <SearchForm onSearch={searchByTag} />
        </div>

        <form className="max-w-sm mx-auto flex justify-center flex-col items-center mt-4">
          <label htmlFor="sortBy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sort By</label>
          <select id="sortBy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </form>


        <div className='mt-5 flex justify-center align-middle'>
        {errorMessageFetchData !== '' ? errorMessageFetchData : null}
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
