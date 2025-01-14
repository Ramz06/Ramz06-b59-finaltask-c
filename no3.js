function cetakPola(num) {
    const totalLength = num + (num - 1); // Panjang total yang diinginkan
    for (let i = num; i >= 1; i--) {
        let charArray = [];
        for (let j = 1; j <= i; j++) {
            if (j % 2 === 0) {
                if ( i === Math.ceil( num * 0.5)) {
                    charArray.push("#");
                } else {
                    charArray.push("+");
                }
            } else {
                if (i % 2 === 0) {
                    charArray.push("+");
                } else if ( i === Math.ceil( num * 0.5)) {
                    charArray.push("+");
                } else {
                    charArray.push("#");

                } 
            }
        }

        
        while (charArray.length < totalLength) {
            charArray.unshift(" "); 
            charArray.push(" "); 
        }

        const result = charArray.join(" ");
        console.log(result);
    }
}

cetakPola(5);
