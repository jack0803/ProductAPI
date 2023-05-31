function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}


const getCurrentTimestamp = () => Math.ceil(Date.now() / 1000);
const convertTimestampToDate = () => {
  let val = getCurrentTimestamp();
  const d = formatDate(new Date(Number(val) * 1000));
  return d;
};


const processString = (s) => {
      
    // const sentence = '    My string with a    lot   of Whitespace.  '.toLowerCase().replace(/\s+/g, ' ').trim()
    //Output: 'my string with a lot of whitespace.'
    console.log(s);
    return s.toString().toLowerCase().replace(/\s+/g, ' ').trim();
}

module.exports = {
    getCurrentTimestamp,
    convertTimestampToDate,
    processString
}