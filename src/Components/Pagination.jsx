import { Pagination as BootstrapPagination } from "react-bootstrap";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, onPageChange }) {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return <BootstrapPagination>{items}</BootstrapPagination>;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
