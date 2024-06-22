import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import image from "../assets/news.png";

function ArticleCard({ article }) {
  if (!article) {
    return <div className="alert alert-danger">Error: Article not found</div>;
  }

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={article.urlToImage || image}
        className="card-img-top rounded-top"
        alt={article.title}
        onError={(e) => {
          e.target.src = image;
        }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{article.title}</h5>
        <p className="card-text text-truncate">
          {article.description || "No description available"}
        </p>
        <Link
          to={`/article/${article.title}`}
          state={{ article }}
          className="btn btn-primary btn-sm btn-block"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
