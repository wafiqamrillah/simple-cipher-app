export default function AutoKeyVigenere() {
    const encrypt = (
        plainText: string,
        key: string
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        plainText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
        key = key.toUpperCase() + plainText;
        let cipherText = '';
    
        for (let i = 0; i < plainText.length; i++) {
            const letter = plainText[i];
            const keyLetter = key[i];
            const encryptedLetter = alphabet[(alphabet.indexOf(letter) + alphabet.indexOf(keyLetter)) % 26];
            cipherText += encryptedLetter;
        }
    
        return cipherText;
    }

    const decrypt = (
        cipherText: string,
        key: string
    ) : string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
        key = key.toUpperCase();
        let plainText = '';
    
        for (let i = 0; i < cipherText.length; i++) {
            const letter = cipherText[i];
            const keyLetter = key[i] || plainText[i - key.length];
            const decryptedLetter = alphabet[(alphabet.indexOf(letter) - alphabet.indexOf(keyLetter) + 26) % 26];
            plainText += decryptedLetter;
        }
    
        return plainText;
    }

    return {
        encrypt,
        decrypt
    }
}