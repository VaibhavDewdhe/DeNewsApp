import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import image from "../assets/news.png";
import { useEffect, useState } from "react";

function ArticleDetail() {
  const { state } = useLocation();
  const { article } = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="display-4">{article.title}</h1>
          <img
            src={article.urlToImage || image}
            alt={article.title}
            className="img-fluid mb-4 rounded"
          />
          <p className="lead">
            {article.content ||
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, aspernatur perspiciatis vitae ipsa iusto, quibusdam nam atque rerum ut deserunt, omnis itaque quisquam dolore veniam"}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
