import {useCallback, useState} from 'react';
import {TPost} from '../types';

const PAGE_SIZE = 10;

export function usePosts() {
  const [data, setData] = useState<TPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    )
      .then(response => response.json())
      .then((json: TPost[]) => {
        if (json.length === 0) {
          setHasMore(false);
        } else {
          setData([...data, ...json]);
          setCurrentPage(currentPage + 1);
        }
        setIsLoading(false);
        setRefreshing(false); // Stop the refreshing indicator
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setRefreshing(false); // Stop the refreshing indicator
      });
  }, [currentPage, data, isLoading]);

  const handleRefresh = useCallback(() => {
    setHasMore(true);
    setRefreshing(true); // Start the refreshing indicator
    setData([]); // Clear the existing data
    setCurrentPage(1); // Reset the current page
    fetchPosts(); // Fetch new data
  }, [fetchPosts]);

  return {
    posts: data,
    fetchPosts,
    refreshing,
    isLoading,
    refreshPost: handleRefresh,
    hasMore,
  };
}
