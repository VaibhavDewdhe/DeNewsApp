import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  setCurrentPage,
  setCategory,
  setSearchQuery,
} from "../store/newsSlice";
import ArticleCard from "../Components/ArticleCard";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import { useLocation } from "react-router-dom";

const PAGE_SIZE = 12;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HomePage() {
  const dispatch = useDispatch();
  const {
    articles,
    currentPage,
    totalResults,
    loading,
    category,
    searchQuery,
  } = useSelector((state) => state.news);

  const query = useQuery();
  const queryCategory = query.get("category") || "general";
  const querySearch = query.get("search");

  useEffect(() => {
    if (category !== queryCategory) {
      dispatch(setCategory(queryCategory));
    }
    if (searchQuery !== querySearch) {
      dispatch(setSearchQuery(querySearch));
    }
    dispatch(
      fetchArticles({
        category: queryCategory,
        page: currentPage,
        searchQuery: querySearch,
      })
    );
  }, [
    dispatch,
    queryCategory,
    currentPage,
    querySearch,
    category,
    searchQuery,
  ]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / PAGE_SIZE)}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
