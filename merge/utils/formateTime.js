const formateTime = (timeVal) => {
    const oDate = new Date(timeVal);
    const _date = oDate.getFullYear()
        + '-' + fn(oDate.getMonth() + 1)
        + '-' + fn(oDate.getDate()) + ' '
        + fn(oDate.getHours())
        + ':' + fn(oDate.getMinutes())
        + ':' + fn(oDate.getSeconds());
    return _date;

};
const fn = (str) =>{
    if(+str < 10 ){
        str = '0' + str
    }
    return str;
}
module.exports = formateTime;