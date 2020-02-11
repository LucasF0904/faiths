module.exports = function parseStringAsArray(arrayAsString){
    console.log(arrayAsString + 'Array as String');
    return arrayAsString.split(',').map(religion => religion.trim());
}