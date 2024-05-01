export const isValidDate = (date) => {
    // check format MM/DD/YYYY
    let splitDate = date.trim().split('/');
    if(splitDate.length !== 3){
        return false;
    }

    let month = Number(splitDate[0]);
    let day = Number(splitDate[1]);
    let year = Number(splitDate[2]);
    if(!isValidMonth(month) ||
        !isValidDay(day) ||
        !isValidYear(year) ||
        !isValidDayMonth(day, month, year)){
            return false;
        }
    return true;    
}

export const isValidDay = (day) => {
    let dayLengthLim = 2;
    day = day.toString();
    if(day === undefined || !(day.length >= 1 && day.length <= dayLengthLim))
        return false;

    dayLengthLim = (dayLengthLim > day.length) ? day.length : dayLengthLim;
    for(let i = 0; i < dayLengthLim; i++){
        if(!isValidNum(Number(day[i])))
            return false;
    }

    return true;
}

export const isValidMonth = (month) => {
    let monthLengthLim = 2;
    month = month.toString();
    if(month === undefined || !(month.length >= 1 && month.length <= monthLengthLim))
        return false;

    monthLengthLim = (monthLengthLim > month.length) ? month.length : monthLengthLim;
    for(let i = 0; i < monthLengthLim; i++){
        if(!isValidNum(Number(month[i])))
            return false;
    }
    return true;
}

export const isValidYear = (year) => {
    let yearLengthLimit = 4;
    year = year.toString();
    if(year === undefined || !(year.length >= 1 && year.length <= yearLengthLimit))
        return false;

    yearLengthLimit = (yearLengthLimit > year.length) ? year.length : yearLengthLimit;
    for(let i = 0; i < yearLengthLimit; i++){
        if(!isValidNum(Number(year[i])))
            return false;
    }
    return true;
}

export const isValidNum = (num) => {
    return typeof num === 'number';
 }

// leveraged this code date checker from: https://stackoverflow.com/questions/38561003/check-a-valid-date-by-day-month-and-year
export const isValidDayMonth = (day, month, year) => {
    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    let total_days = 0;
    
    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;
    
    let thisYear = new Date().getFullYear();
    if (!((year.toString().length == 4) && (year > 1900 && year <= thisYear))) {
        return false;
    }
    
    if (!(month > 0 && month < 13)) {
        return false;
    }
    else {
        total_days = monthLength[month - 1];
    }

    if (!(day > 0 && day <= total_days)) {
        return false;
    }

    return true;
}

// String with no numbers
export const isValidStr = (str) => {
    str = str.trim();
    
    // check if empty string
    if(str === "")
        return false;

    for(let charIndex = 0; charIndex < str.length; charIndex++){
        let char = str[charIndex];
        let charInAlphabet = Alphabet.includes(char.toLowerCase());
        let charIsDigit = Digits.includes(char);
        let charIsWhiteSpace = (char === ' ');
        if(!charInAlphabet && !charIsWhiteSpace && !charIsDigit)
            return false;
    }
    return true;
}

export const isValidStrArr = (strArr) => {
    if(strArr && Array.isArray(strArr)){
        for(let i = 0; i < strArr.length; i++){
            let memStr = strArr[i];
            if(!isValidStr(memStr))
                return false;
        }
        return true;
    }
    else{
        return false;
    }
}

export const Digits = ['0','1','2','3','4','5','6', '7', '8', '9'];

export const Alphabet = ['a','b','c','d','e','f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];