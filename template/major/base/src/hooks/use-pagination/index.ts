/**
 * A Vue composable for handling pagination state and calculations
 * @param {object} options - Pagination options
 * @param {number} [options.limit] - Number of items per page
 * @returns {object} An object containing pagination query state and skip calculation function
 */
export function usePagination({ limit } = { limit: 20 }) {
  const query = reactive({
    limit,
    // skip: 0,
    page: 1,
    total: 0,
    loading: false,
    lastPage: false,
  });

  const useSkip = () => {
    return (query.page - 1) * query.limit;
  };

  return { query, useSkip };
}
