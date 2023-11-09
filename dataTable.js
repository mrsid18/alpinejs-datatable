export default (data = [], columns = []) => ({
  data: data,
  columns: columns,
  sortColumn: "",
  sortOrder: "asc",
  search: "",
  pagination: {
    current: 1,
    perPage: 10,
    lastPage: 1,
    from: 0,
    to: 1,
    total: 1,
  },
  init() {
    if (this.data.length === 0) return;
    console.log(this.data)
    this.pagination.total = this.data.length;
    this.pagination.lastPage = Math.ceil(
      this.data.length / this.pagination.perPage
    );
    this.pagination.to = this.pagination.perPage;
    if (this.columns.length === 0) {
      this.columns = Object.keys(this.data[0]);
    }
  },
  setPerPage(num) {
    this.pagination.perPage = num;
    this.pagination.lastPage = Math.ceil(
      this.data.length / this.pagination.perPage
    );
    this.setPage(1);
  },
  setPage(page) {
    if (page < 1 || page > this.pagination.lastPage) return;
    this.pagination.current = page;
    this.pagination.from = (page - 1) * this.pagination.perPage;
    this.pagination.to = page * this.pagination.perPage;
    if (this.pagination.to > this.pagination.total) {
      this.pagination.to = this.pagination.total;
    }
  },
  filteredData() {
    if (this.search === "") {
      return this.data.slice(this.pagination.from, this.pagination.to);
    }
    return this.data
      .filter((row) => {
        return this.columns.some((column) => {
          return String(row[column])
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      })
      .slice(this.pagination.from, this.pagination.to);
  },
  sort(column) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortOrder = "asc";
    }
    this.sortColumn = column;
    this.data = this.data.sort((a, b) => {
      let modifier = 1;
      if (this.sortOrder === "desc") modifier = -1;
      if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
      if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
      return 0;
    });
  },
});
