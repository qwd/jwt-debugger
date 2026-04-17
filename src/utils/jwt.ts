interface Pem {
  privateKey: {
    value: CryptoKey;
    pemForHtml: string;
    pem: string;
  };
  publicKey: {
    value: CryptoKey;
    pemForHtml: string;
    pem: string;
  };
}

const arrayBufferToPem = (buf: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .match(/.{1,64}/g)!
    .join('\n');
};

export const initPemKey = (): Promise<CryptoKeyPair> => {
  return crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
};

export const getPem = (keyPair: CryptoKeyPair): Promise<Pem> => {
  return new Promise((resolve, reject) => {
    Promise.all([
      crypto.subtle.exportKey('pkcs8', keyPair.privateKey),
      crypto.subtle.exportKey('spki', keyPair.publicKey),
    ])
      .then(([privatePKCS8, publicSPKI]) => {
        resolve({
          privateKey: {
            value: keyPair!.privateKey,
            pemForHtml: `-----BEGIN PRIVATE KEY-----<br/>${arrayBufferToPem(privatePKCS8)}<br/>-----END PRIVATE KEY-----`,
            pem: `-----BEGIN PRIVATE KEY-----\n${arrayBufferToPem(privatePKCS8)}\n-----END PRIVATE KEY-----`,
          },
          publicKey: {
            value: keyPair!.publicKey,
            pemForHtml: `-----BEGIN PUBLIC KEY-----<br/>${arrayBufferToPem(publicSPKI)}<br/>-----END PUBLIC KEY-----`,
            pem: `-----BEGIN PUBLIC KEY-----\n${arrayBufferToPem(publicSPKI)}\n-----END PUBLIC KEY-----`,
          },
        });
      })
      .catch(reject);
  });
};

const base64url = (source: ArrayBuffer | string) => {
  let encoded;
  if (typeof source === 'string') {
    encoded = btoa(unescape(encodeURIComponent(source)));
  } else {
    encoded = btoa(String.fromCharCode(...new Uint8Array(source)));
  }
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const cachePrivateKey = new Map<string, CryptoKey>();
export const importPrivatePem = (pem: string): Promise<CryptoKey> => {
  return new Promise((resolve, reject) => {
    if (cachePrivateKey.has(pem)) {
      resolve(cachePrivateKey.get(pem) as CryptoKey);
      return;
    }
    const b64 = pem
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\s/g, '');

    const binaryDerString = atob(b64);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
      binaryDer[i] = binaryDerString.charCodeAt(i);
    }
    crypto.subtle
      .importKey(
        'pkcs8',
        binaryDer.buffer,
        {
          name: 'Ed25519',
        },
        true,
        ['sign']
      )
      .then(privateKey => {
        cachePrivateKey.set(pem, privateKey);
        resolve(privateKey);
      })
      .catch(reject);
  });
};
const keyIds = new WeakMap<CryptoKey, string>();
let keyCount = 0;
const cacheJwt = new Map<string, string>();
export const generateJWT = (
  privateKey: CryptoKey,
  params: {
    kid: string; //凭证id
    sub: string; //项目ID
    iat: string; //起始时间 秒级时间戳 Math.floor(Date.now() / 1000);
    exp: string; //到期时间 秒级时间戳 issuedAt + 60 * 60 * 24;
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (keyIds.has(privateKey) === false) {
      keyIds.set(privateKey, `key-${keyCount++}`);
    }
    const keyId = keyIds.get(privateKey) as string;
    const cacheJwtKey = `${keyId}-${params.kid}-${params.sub}-${params.iat}-${params.exp}`;
    if (cacheJwt.has(cacheJwtKey)) {
      resolve(cacheJwt.get(cacheJwtKey) as string);
      return;
    }
    const header = { alg: 'EdDSA', kid: params.kid };
    const encodedHeader = base64url(JSON.stringify(header));
    const payload = { sub: params.sub, iat: Number(params.iat), exp: Number(params.exp) };
    const encodedPayload = base64url(JSON.stringify(payload));
    const message = `${encodedHeader}.${encodedPayload}`;
    crypto.subtle
      .sign({ name: 'Ed25519' }, privateKey, new TextEncoder().encode(message))
      .then(signatureBuffer => {
        const jwt = `${message}.${base64url(signatureBuffer)}`;
        cacheJwt.set(cacheJwtKey, jwt);
        resolve(jwt);
      })
      .catch(reject);
  });
};
