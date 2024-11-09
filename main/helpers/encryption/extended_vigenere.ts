export default function ExtendedVigenere() {
    const encrypt = (
        plainText: string,
        key: string
    ) : string => {
        let cipherText = '';
        for (let i = 0; i < plainText.length; i++) {
            const charCode = (plainText.charCodeAt(i) + key.charCodeAt(i % key.length)) % 256;
            cipherText += String.fromCharCode(charCode);
        }
        return cipherText;
    }

    const decrypt = (
        cipherText: string,
        key: string
    ) : string => {
        let plainText = '';
        for (let i = 0; i < cipherText.length; i++) {
            const charCode = (cipherText.charCodeAt(i) - key.charCodeAt(i % key.length) + 256) % 256;
            plainText += String.fromCharCode(charCode);
        }
        return plainText;
    }

    return {
        encrypt,
        decrypt
    }
}