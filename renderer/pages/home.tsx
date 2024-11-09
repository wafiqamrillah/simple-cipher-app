import React from 'react'

import BaseLayout, { useBaseLayout } from '../components/layouts/BaseLayout'

export default function Home() {
  const Content = () => {
    const [encryptionLists, setEncryptionLists] = React.useState<string[]>([]);
    const plainTextRef = React.useRef<HTMLInputElement>(null);
    const cipherTextRef = React.useRef<HTMLInputElement>(null);
    const keyRef = React.useRef<HTMLInputElement>(null);
    const encryptionSelectRef = React.useRef<HTMLSelectElement>(null);
    const { setIsLoading } = useBaseLayout();

    React.useEffect(() => {
      setEncryptionLists(window.encryption?.lists ?? []);

      plainTextRef.current?.addEventListener('keyup', (event) => {
        setIsLoading(true);
        const plainText = plainTextRef.current?.value;
        const cipherText = cipherTextRef.current?.value;
        const key = keyRef.current?.value;
        const encryptionSelect = encryptionSelectRef.current?.value;
        
        if (plainText && key && encryptionSelect) {
          window.encryption[encryptionSelect].encrypt(plainText, key)
            .then((result) => {
              cipherTextRef.current.value = result;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          cipherTextRef.current.value = '';
        }
      });

      cipherTextRef.current?.addEventListener('keyup', (event) => {
        setIsLoading(true);
        const plainText = plainTextRef.current?.value;
        const cipherText = cipherTextRef.current?.value;
        const key = keyRef.current?.value;
        const encryptionSelect = encryptionSelectRef.current?.value;
        
        if (cipherText && key && encryptionSelect) {
          window.encryption[encryptionSelect].decrypt(cipherText, key)
            .then((result) => {
              plainTextRef.current.value = result;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          plainTextRef.current.value = '';
        }
      });

      return () => {
        plainTextRef.current?.removeEventListener('keyup', () => {});
        cipherTextRef.current?.removeEventListener('keyup', () => {});
      }
    }, []);
    
    return (
      <div className="flex flex-col space-y-3">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Welcome to Simple Cipher Application
          </h1>
          <small>Created by : Ahmad Wafiq Amrillah</small>
        </div>
        <div className="grid flex-auto w-full grid-cols-2 gap-3 p-2">
            <div>
              <label htmlFor="plain_text">Plain Text</label>
              <input ref={plainTextRef} id="plain_text" type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="cipher_text">Cipher Text</label>
              <input ref={cipherTextRef} id="cipher_text" type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="col-span-2">
              <label htmlFor="key">Key</label>
              <input ref={keyRef} id="key" type="text" className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg" />
            </div>
            <div className="col-span-2">
              <label htmlFor="encryption_select">Encryption Select</label>
              <select ref={encryptionSelectRef} name="encryption_select" id="encryption_select" className="w-full p-2 border border-gray-300 rounded-lg">
                {
                  encryptionLists.map((encryption, index) => (
                    <option key={index} value={encryption}>
                      {
                        encryption.charAt(0).toUpperCase() + encryption.slice(1)
                      }
                    </option>
                  ))
                }
              </select>
            </div>
        </div>
      </div>
    );
  };

  return (
    <BaseLayout>
      <Content />
    </BaseLayout>
  )
}