const globalpagination = ((totallist,page,limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {};
    if (endIndex < totallist) {
        results.next = page + 1;
    }
    if (startIndex > 0 && totallist > 0) {
        results.previous = page - 1;
    }
    results.total = totallist;
    return results;
})


module.exports = globalpagination;