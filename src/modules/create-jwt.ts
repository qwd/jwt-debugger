import { CodeCard } from '@/components/code-card';
import { JsonCard, JsonInfo } from '@/components/json-card';
import { translate } from '@/translate/translate';
import { generateJWT, getPem, importPrivatePem } from '@/utils/jwt';

enum ErrorType {
  KEY_ERROR = '1',
  KID_FORMAT_ERROR = '2',
  SUB_FORMAT_ERROR = '3',
  IAT_FORMAT_ERROR = '4',
  EXP_FORMAT_ERROR = '5',
  EXP_TOO_EARLY = '6',
  EXP_EARLY_THAN_IAT = '7',
  JWT_TOO_LONG = '8',
  OTHER = '9999',
}

const createInfo = {
  kid: 'ABCDE12345',
  sub: '12345ABCDE',
  iat: '',
  exp: '',
  privateKeyPem: '',
};

const createJwtResult: { success: boolean; errorType?: ErrorType } = {
  success: true,
};

let jwtCodeCard: CodeCard | undefined = undefined;

const createJwtInfo = (): Promise<{ jwt: string; jwtList: string[] }> => {
  return new Promise((resolve, reject) => {
    importPrivatePem(createInfo.privateKeyPem)
      .then(privateKey => {
        const IdReg = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{10}$/;
        if (createInfo.kid === '' || IdReg.test(createInfo.kid) === false) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.KID_FORMAT_ERROR;
          return reject(null);
        }
        if (createInfo.sub === '' || IdReg.test(createInfo.sub) === false) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.SUB_FORMAT_ERROR;
          return reject(null);
        }
        const timeReg = /^[12]\d{9}$/;
        if (
          createInfo.iat === '' ||
          timeReg.test(createInfo.iat) === false ||
          isNaN(new Date(Number(`${createInfo.iat}000`)).getTime())
        ) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.IAT_FORMAT_ERROR;
          return reject(null);
        }
        if (
          createInfo.exp === '' ||
          timeReg.test(createInfo.exp) === false ||
          isNaN(new Date(Number(`${createInfo.exp}000`)).getTime())
        ) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.EXP_FORMAT_ERROR;
          return reject(null);
        }

        const expTime = new Date(Number(`${createInfo.exp}000`)).getTime();
        const iatTime = new Date(Number(`${createInfo.iat}000`)).getTime();
        if (expTime <= new Date().getTime()) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.EXP_TOO_EARLY;
          return reject(null);
        }

        if (expTime <= iatTime) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.EXP_EARLY_THAN_IAT;
          return reject(null);
        }

        if (expTime - iatTime > 24 * 60 * 60 * 1000) {
          createJwtResult.success = false;
          createJwtResult.errorType = ErrorType.JWT_TOO_LONG;
          return reject(null);
        }

        generateJWT(privateKey, {
          kid: createInfo.kid,
          sub: createInfo.sub,
          iat: createInfo.iat,
          exp: createInfo.exp,
        })
          .then(jwt => {
            createJwtResult.success = true;
            resolve({ jwt, jwtList: jwt.split('.') });
          })
          .catch(() => {
            createJwtResult.success = false;
            createJwtResult.errorType = ErrorType.OTHER;
            reject(null);
          });
      })
      .catch(() => {
        createJwtResult.success = false;
        createJwtResult.errorType = ErrorType.KEY_ERROR;
        reject(null);
      });
  });
};

const changed = (info: JsonInfo) => {
  if (typeof info.kid !== 'undefined' && createInfo.kid !== info.kid) {
    createInfo.kid = info.kid;
  }
  if (typeof info.sub !== 'undefined' && createInfo.sub !== info.sub) {
    createInfo.sub = info.sub;
  }
  if (typeof info.iat !== 'undefined' && createInfo.iat !== info.iat) {
    createInfo.iat = info.iat;
  }
  if (typeof info.exp !== 'undefined' && createInfo.exp !== info.exp) {
    createInfo.exp = info.exp;
  }

  changeJwtResult();
};

const createResultHtml = () => {
  const resultBox = document.getElementById('createJWTResult');
  if (!resultBox) {
    return;
  }
  resultBox.innerHTML = '';
  const resultDesc = document.createElement('p');
  const resultDescClassName = 'q-txt line-20 user-no-select';
  if (createJwtResult.success) {
    resultDesc.className = `${resultDescClassName} weight-700 color-primary-green`;
    resultDesc.innerHTML = translate.result.success.txt1;
    const desc = document.createElement('p');
    desc.className = 'q-txt font-14 line-20 color-grey user-no-select q-margin top-5';
    desc.innerHTML = translate.result.success.txt2;
    resultBox.appendChild(resultDesc);
    resultBox.appendChild(desc);
  } else {
    resultDesc.className = `${resultDescClassName} font-14 color-primary-red`;
    if (createJwtResult.errorType === ErrorType.KEY_ERROR) {
      resultDesc.innerHTML = translate.result.error.txt1;
    } else if (createJwtResult.errorType === ErrorType.KID_FORMAT_ERROR) {
      resultDesc.innerHTML = translate.result.error.txt2;
    } else if (createJwtResult.errorType === ErrorType.SUB_FORMAT_ERROR) {
      resultDesc.innerHTML = translate.result.error.txt3;
    } else if (createJwtResult.errorType === ErrorType.IAT_FORMAT_ERROR) {
      resultDesc.innerHTML = translate.result.error.txt4;
    } else if (createJwtResult.errorType === ErrorType.EXP_FORMAT_ERROR) {
      resultDesc.innerHTML = translate.result.error.txt5;
    } else if (createJwtResult.errorType === ErrorType.EXP_TOO_EARLY) {
      resultDesc.innerHTML = translate.result.error.txt6;
    } else if (createJwtResult.errorType === ErrorType.EXP_EARLY_THAN_IAT) {
      resultDesc.innerHTML = translate.result.error.txt7;
    } else if (createJwtResult.errorType === ErrorType.JWT_TOO_LONG) {
      resultDesc.innerHTML = translate.result.error.txt8;
    } else {
      resultDesc.innerHTML = translate.result.error.txt9;
    }
    resultBox.appendChild(resultDesc);
  }
};

const changeJwtResult = () => {
  if (!jwtCodeCard) {
    return;
  }
  createJwtInfo()
    .then(jwtInfo => {
      const codeTxt = `<span class="teal">${jwtInfo.jwtList[0]}</span>.<span class="purple">${jwtInfo.jwtList[1]}</span>.<span class="pink">${jwtInfo.jwtList[2]}</span>`;
      jwtCodeCard?.reset({ codeTxt, copyTxt: jwtInfo.jwt });
    })
    .catch(() => {
      jwtCodeCard?.reset({ codeTxt: '', copyTxt: '' });
    })
    .finally(() => {
      createResultHtml();
    });
};

export const initJwt = (app: HTMLElement, keyPair: CryptoKeyPair): Promise<void> => {
  return new Promise((resolve, reject) => {
    getPem(keyPair)
      .then(pem => {
        const now = Math.floor(new Date().getTime() / 1000);
        const issuedAt = now - 30;
        const expirationTime = now + 60 * 60 * 1;
        createInfo.iat = `${issuedAt}`;
        createInfo.exp = `${expirationTime}`;
        createInfo.privateKeyPem = pem.privateKey.pem;

        const qCard = document.createElement('div');
        qCard.className = 'q-card q-margin top-30';
        app.appendChild(qCard);

        const h3 = document.createElement('h3');
        h3.className = 'q-txt font-20 weight-700 color-text-title';
        h3.textContent = translate.title.txt5;
        qCard.appendChild(h3);

        const p = document.createElement('p');
        p.className = 'q-margin top-20 q-txt font-14 line-20';
        p.innerHTML = translate.desc.txt2;
        qCard.appendChild(p);

        const HeaderTitle = document.createElement('h4');
        HeaderTitle.className = 'q-txt q-margin top-20';
        HeaderTitle.textContent = 'Header';
        qCard.appendChild(HeaderTitle);

        new JsonCard({
          info: [
            { key: 'alg', value: 'EdDSA' },
            { key: 'kid', value: createInfo.kid, edit: true },
          ],
          target: qCard,
          className: 'q-margin top-10',
          changed: changed,
        });

        const PayloadTitle = document.createElement('h4');
        PayloadTitle.className = 'q-txt q-margin top-20';
        PayloadTitle.textContent = 'Payload';
        qCard.appendChild(PayloadTitle);

        new JsonCard({
          info: [
            { key: 'sub', value: createInfo.sub, edit: true },
            { key: 'iat', value: createInfo.iat, edit: true },
            { key: 'exp', value: createInfo.exp, edit: true },
          ],
          target: qCard,
          className: 'q-margin top-10',
          changed: changed,
        });

        const PrivateKeyTitle = document.createElement('h4');
        PrivateKeyTitle.className = 'q-txt q-margin top-20';
        PrivateKeyTitle.textContent = 'Private Key (PEM)';
        qCard.appendChild(PrivateKeyTitle);

        const textareaBox = document.createElement('div');
        textareaBox.className = `q-textarea q-flex gap-5 q-align-items-start q-flow-row-reverse q-margin top-10`;
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'q-button q-txt line-20 nowrap color-grey';
        deleteBtn.style.flex = '0 0 20px';
        deleteBtn.style.width = '0';
        deleteBtn.textContent = '⌫';
        textareaBox.appendChild(deleteBtn);

        const lineHeight = 20;
        const maxLines = 5;
        const maxHeight = lineHeight * maxLines;
        const privateKeyTextarea = document.createElement('textarea');
        privateKeyTextarea.id = 'user-private-key-pem';
        privateKeyTextarea.setAttribute('spellcheck', 'false');
        privateKeyTextarea.setAttribute('rows', '1');
        privateKeyTextarea.value = createInfo.privateKeyPem;
        const syncHeight = (): void => {
          privateKeyTextarea.style.height = 'auto';
          const currentScrollHeight = privateKeyTextarea.scrollHeight;

          if (currentScrollHeight <= maxHeight) {
            privateKeyTextarea.style.height = `${currentScrollHeight}px`;
            privateKeyTextarea.style.overflowY = 'hidden';
          } else {
            privateKeyTextarea.style.height = `${maxHeight}px`;
            privateKeyTextarea.style.overflowY = 'auto';
          }
        };

        textareaBox.appendChild(privateKeyTextarea);
        qCard.appendChild(textareaBox);
        syncHeight();

        let changeJwtResultTimer: number | undefined;
        privateKeyTextarea.oninput = function (event: InputEvent) {
          const target = event.target as HTMLTextAreaElement;
          createInfo.privateKeyPem = target.value;
          syncHeight();
          if (changeJwtResultTimer) {
            clearTimeout(changeJwtResultTimer);
          }
          changeJwtResultTimer = setTimeout(changeJwtResult, 250);
        };
        window.addEventListener('resize', syncHeight);

        deleteBtn.onclick = () => {
          createInfo.privateKeyPem = privateKeyTextarea.value = '';
          syncHeight();
          privateKeyTextarea.focus();
          changeJwtResult();
        };

        const JwtTitle = document.createElement('h4');
        JwtTitle.className = 'q-txt weight-600 q-margin top-20';
        JwtTitle.textContent = 'JWT';
        qCard.appendChild(JwtTitle);

        jwtCodeCard = new CodeCard({
          codeTxt: '',
          copyTxt: '',
          target: qCard,
          className: 'q-margin top-10',
          codeMinHeight: 80,
        });
        createJwtInfo()
          .then(jwtInfo => {
            const codeTxt = `<span class="teal">${jwtInfo.jwtList[0]}</span>.<span class="purple">${jwtInfo.jwtList[1]}</span>.<span class="pink">${jwtInfo.jwtList[2]}</span>`;
            jwtCodeCard?.reset({ codeTxt, copyTxt: jwtInfo.jwt });
          })
          .catch(() => {
            jwtCodeCard?.reset({ codeTxt: '', copyTxt: '' });
          })
          .finally(() => {
            const resultBox = document.createElement('div');
            resultBox.id = 'createJWTResult';
            resultBox.className = 'q-margin top-10';
            qCard.appendChild(resultBox);
            createResultHtml();
            resolve();
          });
      })
      .catch(reject);
  });
};
