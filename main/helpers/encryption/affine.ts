export default function Affine() {
    const modInverse = (
        a: number,
        m: number
    ) : number => {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        throw new Error('No modular inverse found');
    }

    const encrypt = (
        plainText: string,
        a: number,
        b: number
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        plainText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
        let cipherText = '';
    
        for (let char of plainText) {
            const x = alphabet.indexOf(char);
            const encryptedChar = alphabet[(a * x + b) % 26];
            cipherText += encryptedChar;
        }
    
        return cipherText;
    }

    const decrypt = (
        cipherText: string,
        a: number,
        b: number
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
        let plainText = '';
        const aInverse = modInverse(a, 26);
    
        for (let char of cipherText) {
            const y = alphabet.indexOf(char);
            const decryptedChar = alphabet[(aInverse * (y - b + 26)) % 26];
            plainText += decryptedChar;
        }
    
        return plainText;
    }

    return {
        encrypt,
        decrypt
    }
}