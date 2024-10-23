//FilterQueryModel Class

export default class FilterQueryModel {
    searchText = "";
    year = "";
    batch = "";
    month = "";
    tags = "";

    constructor(searchText, year = "", batch = "", month = "", tags = "") {
        this.searchText = searchText;
        this.year = year;
        this.batch = batch;
        this.month = month;
        this.tags = tags;
    }
}