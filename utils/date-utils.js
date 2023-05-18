const formatDate = date => {
    let day = '' + date.getDate()
    let month = '' + (date.getMonth() + 1)
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year,].join('/')
}

module.exports = { formatDate }