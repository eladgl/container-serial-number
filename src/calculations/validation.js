import { LETTER_VALUE, WEIGHTS_10 } from './constants';

const validateSerialNumber = (arr) => {
    const initialValue = 0
    const sum = arr.reduce((acc, currentCharacter, i) => {
        if(i < 4) {
            return acc + LETTER_VALUE[currentCharacter] * WEIGHTS_10[i];
        } else if(i === 10) {
            return acc;
        }
        return acc + Number(currentCharacter) * WEIGHTS_10[i];
    }, initialValue)

    const divided = sum / 11;
    const withoutRemainder = Math.floor(divided);
    const checksumDigit = sum - withoutRemainder * 11;
    return checksumDigit % 10;
};

export default validateSerialNumber;