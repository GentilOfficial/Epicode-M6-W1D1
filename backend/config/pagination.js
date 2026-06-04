const paginateResponse = (currentPage, pageSize, totalData, data) => {
  return {
    pages: {
      current: Number(currentPage),
      size: Number(pageSize),
      totals: Math.ceil(totalData / pageSize),
    },
    count: totalData,
    data,
  }
}

module.exports = paginateResponse
