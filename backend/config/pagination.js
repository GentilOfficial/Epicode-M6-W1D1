const paginateResponse = (currentPage, pageSize, totalPages, totalData, data) => {
  return {
    pages: {
      current: Number(currentPage),
      size: Number(pageSize),
      totals: totalPages,
    },
    count: totalData,
    data,
  }
}

module.exports = paginateResponse
