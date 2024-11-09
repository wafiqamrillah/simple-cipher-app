import ExtendedVigenere from './extended_vigenere';

export default function SuperEncryption() {
    const { encrypt: extendedVigenereEncrypt, decrypt: extendedVigenereDecrypt } = ExtendedVigenere();

    const columnTranspositionEncrypt = (
        text: string,
        key: string
    ): string => {
        const numCols = key.length;
        const numRows = Math.ceil(text.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
    
        for (let i = 0; i < text.length; i++) {
            const row = Math.floor(i / numCols);
            const col = i % numCols;
            grid[row][col] = text[i];
        }
    
        const sortedKey = key.split('').map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
        let cipherText = '';
    
        for (let { index } of sortedKey) {
            for (let row = 0; row < numRows; row++) {
                cipherText += grid[row][index] || '';
            }
        }
    
        return cipherText;
    }
    
    const columnTranspositionDecrypt = (
        cipherText: string,
        key: string
    ): string => {
        const numCols = key.length;
        const numRows = Math.ceil(cipherText.length / numCols);
        const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        const sortedKey = key.split('').map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
        let index = 0;
    
        for (let { index: colIndex } of sortedKey) {
            for (let row = 0; row < numRows; row++) {
                grid[row][colIndex] = cipherText[index++] || '';
            }
        }
    
        let plainText = '';
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                plainText += grid[row][col];
            }
        }
    
        return plainText;
    }

    const encrypt = (
        plainText: string,
        key: string
    ) : string => {
        const extendedVigenereCipherText = extendedVigenereEncrypt(plainText, key);
        return columnTranspositionEncrypt(extendedVigenereCipherText, key);
    }

    const decrypt = (
        cipherText: string,
        key: string
    ) : string => {
        const columnTranspositionPlainText = columnTranspositionDecrypt(cipherText, key);
        return extendedVigenereDecrypt(columnTranspositionPlainText, key);
    }

    return {
        encrypt,
        decrypt
    }
}