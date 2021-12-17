module.exports.debugObjects = (obj) => {
    console.debug("DEBUG --- Console.log of the object: " + obj);
    console.debug("DEBUG --- Type of object: " + typeof obj);
    console.debug("DEBUG --- Has keys: " + keys(obj));
    console.debug("DEBUG --- Objects constructor is: " + whatIsIt(obj))
    console.debug("DEBUG --- Objects length is: " + obj.length);
}

function keys(obj) {
    let returnString = "";
    if (Object.keys(obj).length) {
        for (let i = 0; i < Object.keys(obj).length; i++) {
            returnString += Object.keys(obj)[i] + ", "
        }
        returnString = returnString.slice(0, -2);
    }
    return returnString;
}

function whatIsIt(object) {
    const stringConstructor = 'test'.constructor;
    const arrayConstructor = [].constructor;
    const objectConstructor = ({}).constructor;

    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "Object";
    }
    {
        return "don't know";
    }
}