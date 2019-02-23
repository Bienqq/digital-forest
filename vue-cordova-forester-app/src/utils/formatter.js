export function formatName(nameString){
    return nameString.replace(/\w\S*/g, (string) => {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }); 
}