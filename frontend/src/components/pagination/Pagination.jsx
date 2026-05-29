import { Pagination as BSPagination } from 'react-bootstrap'

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 3 }) => {
  const half = Math.floor(maxVisiblePages / 3)

  let start = Math.max(currentPage - half, 1)
  let end = Math.min(start + maxVisiblePages - 1, totalPages)

  start = Math.max(end - maxVisiblePages + 1, 1)

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const go = (p) => () => onPageChange(p)

  return (
    <BSPagination className="justify-content-center flex-wrap">
      <BSPagination.First disabled={isFirst} onClick={go(1)} />
      <BSPagination.Prev disabled={isFirst} onClick={go(currentPage - 1)} />

      {pages.map((p) => (
        <BSPagination.Item key={p} active={p === currentPage} onClick={go(p)}>
          {p}
        </BSPagination.Item>
      ))}

      <BSPagination.Next disabled={isLast} onClick={go(currentPage + 1)} />
      <BSPagination.Last disabled={isLast} onClick={go(totalPages)} />
    </BSPagination>
  )
}

export default Pagination
