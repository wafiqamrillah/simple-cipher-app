export default function PlayfairMatrix() {
    const generate = (
        key: string
    ) : string[][] => {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        let matrix = '';
        for (let char of key) {
            if (!matrix.includes(char)) {
                matrix += char;
            }
        }
        for (let char of alphabet) {
            if (!matrix.includes(char)) {
                matrix += char;
            }
        }
        return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5).split(''));
    }

    const findPosition = (
        matrix: string[][],
        char: string
    ): [number, number] => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (matrix[row][col] === char) {
                    return [row, col];
                }
            }
        }
        throw new Error('Character not found in matrix');
    }

    const encrypt = (
        plainText: string,
        key: string
    ) : string => {
        const matrix = generate(key);
        plainText = plainText.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        if (plainText.length % 2 !== 0) plainText += 'X';
        let cipherText = '';
    
        for (let i = 0; i < plainText.length; i += 2) {
            const [a, b] = [plainText[i], plainText[i + 1]];
            const [rowA, colA] = findPosition(matrix, a);
            const [rowB, colB] = findPosition(matrix, b);
    
            if (rowA === rowB) {
                cipherText += matrix[rowA][(colA + 1) % 5] + matrix[rowB][(colB + 1) % 5];
            } else if (colA === colB) {
                cipherText += matrix[(rowA + 1) % 5][colA] + matrix[(rowB + 1) % 5][colB];
            } else {
                cipherText += matrix[rowA][colB] + matrix[rowB][colA];
            }
        }
    
        return cipherText;
    }

    const decrypt = (
        cipherText: string,
        key: string
    ) : string => {
        const matrix = generate(key);
        let plainText = '';
    
        for (let i = 0; i < cipherText.length; i += 2) {
            const [a, b] = [cipherText[i], cipherText[i + 1]];
            const [rowA, colA] = findPosition(matrix, a);
            const [rowB, colB] = findPosition(matrix, b);
    
            if (rowA === rowB) {
                plainText += matrix[rowA][(colA + 4) % 5] + matrix[rowB][(colB + 4) % 5];
            } else if (colA === colB) {
                plainText += matrix[(rowA + 4) % 5][colA] + matrix[(rowB + 4) % 5][colB];
            } else {
                plainText += matrix[rowA][colB] + matrix[rowB][colA];
            }
        }
    
        return plainText;
    }

    return {
        encrypt,
        decrypt
    }
}