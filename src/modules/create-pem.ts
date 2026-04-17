import { getPem, initPemKey } from '@/utils/jwt';
import { translate } from '@/translate/translate';
import { CodeCard } from '@/components/code-card';

const downloadPemFile = (fileName: string, content: string): void => {
  const blob: Blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url: string = window.URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith('.pem') ? fileName : `${fileName}.pem`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const initPem = (app: HTMLElement, keyPair: CryptoKeyPair): Promise<void> => {
  return new Promise((resolve, reject) => {
    getPem(keyPair)
      .then(pem => {
        const qCard = document.createElement('div');
        qCard.className = 'q-card q-margin top-30';
        app.appendChild(qCard);

        const h3 = document.createElement('h3');
        h3.className = 'q-txt font-20 weight-700 color-text-title';
        h3.textContent = translate.title.txt2;
        qCard.appendChild(h3);

        const PrivateKeyTitle = document.createElement('h4');
        PrivateKeyTitle.className = 'q-txt weight-600 q-margin top-20';
        PrivateKeyTitle.textContent = 'Private Key (PEM)';
        qCard.appendChild(PrivateKeyTitle);

        const privateKeyCard = new CodeCard({
          codeTxt: pem.privateKey.pemForHtml,
          copyTxt: pem.privateKey.pem,
          target: qCard,
          className: 'q-margin top-10',
        });

        const PublicKeyTitle = document.createElement('h4');
        PublicKeyTitle.className = 'q-txt weight-600 q-margin top-20';
        PublicKeyTitle.textContent = 'Public Key (PEM)';
        qCard.appendChild(PublicKeyTitle);

        const publicKeyCard = new CodeCard({
          codeTxt: pem.publicKey.pemForHtml,
          copyTxt: pem.publicKey.pem,
          target: qCard,
          className: 'q-margin top-10',
        });

        const btnGroup = document.createElement('div');
        btnGroup.className = 'q-margin top-20 q-flex gap-20 q-align-items-center';
        qCard.appendChild(btnGroup);
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'q-button q-txt line-20 color-primary-blue';
        downloadBtn.innerHTML = translate.title.txt3;
        let downloadBtnTimer: number | undefined;
        downloadBtn.onclick = () => {
          if (downloadBtnTimer) {
            clearTimeout(downloadBtnTimer);
          }
          downloadBtnTimer = setTimeout(() => {
            downloadPemFile('ed25519-publicKey', pem.publicKey.pem);
            setTimeout(() => {
              downloadPemFile('ed25519-private', pem.privateKey.pem);
            }, 150);
          }, 200);
        };

        const recreateBtn = document.createElement('button');
        recreateBtn.className = 'q-button q-txt line-20 color-primary-blue';
        recreateBtn.innerHTML = translate.title.txt4;

        let recreateBtnTimer: number | undefined;
        const noop = () => {};
        recreateBtn.onclick = () => {
          if (recreateBtnTimer) {
            clearTimeout(recreateBtnTimer);
          }
          recreateBtnTimer = setTimeout(() => {
            initPemKey()
              .then(async newKeyPair => {
                try {
                  const pem = await getPem(newKeyPair);
                  privateKeyCard.reset({ codeTxt: pem.privateKey.pemForHtml, copyTxt: pem.privateKey.pem });
                  publicKeyCard.reset({ codeTxt: pem.publicKey.pemForHtml, copyTxt: pem.publicKey.pem });
                } catch {
                  noop();
                }
              })
              .catch(noop);
          }, 200);
        };
        btnGroup.appendChild(recreateBtn);
        btnGroup.appendChild(downloadBtn);
        resolve();
      })
      .catch(reject);
  });
};
