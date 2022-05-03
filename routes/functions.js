    function formatDateWrong(Sdate) { //2005-07-06T00:00:00.000Z
        date = new Date(Sdate)
        Day = date.getDate()
        Month = date.getMonth() + 1
        Year = date.getYear() + 1900
        Hour = date.getHours()
        Minute = date.getMinutes()
    
        if (parseInt(Day) < 10) {
            newDate = '0' + date.getDate()
    
        } else {
            newDate = date.getDate()
        }
        
        if (parseInt(Month) < 10) {
            newDate = newDate + '.' + '0' + Month + '.' + Year 
        } else {
            newDate = newDate + '.' + Month + '.' + Year 
        }
    
        if (parseInt(Hour) < 10){
            newDate = newDate + ' 0' + Hour + ':'
        } else{
            newDate = newDate + ' ' + Hour + ':'
        }
    
        if (parseInt(Minute) < 10){
            newDate = newDate + '0' + Minute
        } else{
            newDate = newDate + Minute
        }
    
        return newDate
    }
    function formatDateBack(Sdate) { //03.05.2022 16:27
        let newDate = Sdate.slice(6, 10) + '-' + Sdate.slice(3, 5) + '-' + Sdate.slice(0, 2) + 'T' + Sdate.slice(11,16)
    
        return newDate
    
    
    
    }
    
module.exports = {formatDateWrong, formatDateBack}