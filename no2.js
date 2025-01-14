const inputArray = ["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "];
const targetArray = "Dumbways is awesome".split('');

function arraySort(input, target) {
    for (let i = 0; i < target.length; i++) {
        for (let j = i; j < input.length; j++) {
            if (input[j] === target[i]) {
                [input[i], input[j]] = [input[j], input[i]];
                break;
            }
        }
    }
    return input.join("");
}

console.log(arraySort(inputArray, targetArray))