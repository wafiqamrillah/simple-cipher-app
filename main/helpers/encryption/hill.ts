import * as math from 'mathjs';

export default function Hill() {
    const multiplyMatrixVector = (
        matrix: number[][],
        vector: number[]
    ): number[] => {
        return matrix.map(row => row.reduce((sum, value, index) => sum + value * vector[index], 0));
    }
    
    const invertMatrix = (
        matrix: number[][]
    ): number[][] => {
        const det = math.det(matrix);
        if (det === 0) {
            throw new Error('Matrix is not invertible');
        }
        const adjugate = math.transpose(matrix.map((row, i) =>
            row.map((_, j) => {
                const subMatrix = matrix
                    .filter((_, m) => m !== i)
                    .map(row => row.filter((_, n) => n !== j));
                return ((i + j) % 2 === 0 ? 1 : -1) * math.det(subMatrix);
            })
        ));
        return adjugate.map(row => row.map(value => value / det));
    }

    const encrypt = (
        plainText: string,
        keyMatrix: number[][]
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        plainText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
        if (plainText.length % keyMatrix.length !== 0) {
            plainText += 'X'.repeat(keyMatrix.length - (plainText.length % keyMatrix.length));
        }
        let cipherText = '';
    
        for (let i = 0; i < plainText.length; i += keyMatrix.length) {
            const vector = plainText.slice(i, i + keyMatrix.length).split('').map(char => alphabet.indexOf(char));
            const encryptedVector = multiplyMatrixVector(keyMatrix, vector).map(num => alphabet[num % 26]);
            cipherText += encryptedVector.join('');
        }
    
        return cipherText;
    }

    const decrypt = (
        cipherText: string,
        keyMatrix: number[][]
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
        const inverseKeyMatrix = invertMatrix(keyMatrix);
        let plainText = '';
    
        for (let i = 0; i < cipherText.length; i += keyMatrix.length) {
            const vector = cipherText.slice(i, i + keyMatrix.length).split('').map(char => alphabet.indexOf(char));
            const decryptedVector = multiplyMatrixVector(inverseKeyMatrix, vector).map(num => alphabet[(num + 26) % 26]);
            plainText += decryptedVector.join('');
        }
    
        return plainText;
    }

    return {
        encrypt,
        decrypt
    }
}