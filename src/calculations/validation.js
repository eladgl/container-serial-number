import letterToValueMap from "./letterToValueMap";
import indexToPower from "./indexToPower";

const validateSerialNumber = (arr) => {
    const initialValue = 0
    console.log(arr)
    const sum = arr.reduce((acc, currentCharacter, i) => {
        if(i < 4) {
            console.log(letterToValueMap[currentCharacter])
            return acc + letterToValueMap[currentCharacter] * indexToPower[i];
        }
        return acc + Number(currentCharacter) * indexToPower[i];
    }, initialValue)
    return sum;
};

export default validateSerialNumber;