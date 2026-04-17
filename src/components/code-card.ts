interface CodeCardParams {
  codeTxt: string;
  copyTxt?: string;
  target: HTMLElement;
  className?: string;
  codeMinHeight?: number;
}

export class CodeCard {
  #codeTxt: string = '';
  #copyTxt: string = '';
  #codeTxtDom: HTMLParagraphElement;
  #copyBtn: HTMLButtonElement;
  #copiedBtn: HTMLButtonElement;
  #resetCopyBtnTimer: number | undefined;
  constructor(options: CodeCardParams) {
    this.#codeTxt = options.codeTxt;
    this.#copyTxt = options.copyTxt ?? options.codeTxt;
    const codeCardBox = document.createElement('div');
    codeCardBox.className = `code-card q-flex gap-5 q-align-items-start q-flow-row-reverse ${options.className ?? ''}`;
    const codeTxtBox = document.createElement('div');
    codeTxtBox.style.flex = '1 0';
    codeTxtBox.style.width = '0';
    codeTxtBox.className = 'code-box';
    codeTxtBox.style.minHeight = typeof options.codeMinHeight === 'number' ? `${options.codeMinHeight}px` : 'none';
    this.#codeTxtDom = document.createElement('p');
    this.#codeTxtDom.className = 'q-txt code-family font-14 line-20 color-text-qGray letter-wrap';
    this.#codeTxtDom.innerHTML = this.#codeTxt;
    this.#codeTxtDom.style.minWidth = '240px';
    codeTxtBox.appendChild(this.#codeTxtDom);

    this.#copyBtn = document.createElement('button');
    this.#copiedBtn = document.createElement('button');
    const btnPublicClassName = `q-button q-txt font-18 nowrap`;
    this.#copyBtn.className = `${btnPublicClassName} color-grey`;
    this.#copiedBtn.className = `${btnPublicClassName} color-primary-green`;
    this.#copyBtn.textContent = '⧉';
    this.#copiedBtn.textContent = '✓';
    this.#copyBtn.style.flex = this.#copiedBtn.style.flex = '0 0 20px';
    this.#copyBtn.style.width = this.#copiedBtn.style.width = '0';
    this.#copyBtn.style.lineHeight = this.#copiedBtn.style.lineHeight = '1.2'

    this.#copyBtn.style.display = 'block';
    this.#copiedBtn.style.display = 'none';
    if (this.#copyTxt === '') {
      this.#copyBtn.style.cursor = 'not-allowed';
      this.#copyBtn.style.opacity = '0.6';
      this.#copyBtn.style.pointerEvents = 'none';
    }

    this.#copyBtn.onclick = () => {
      if (!navigator.clipboard) {
        return;
      }
      navigator.clipboard.writeText(this.#copyTxt);
      this.#copyBtn.style.display = 'none';
      this.#copiedBtn.style.display = 'block';
      this.#resetCopyBtn();
    };

    codeCardBox.appendChild(this.#copyBtn);
    codeCardBox.appendChild(this.#copiedBtn);
    codeCardBox.appendChild(codeTxtBox);

    options.target.appendChild(codeCardBox);
  }

  reset(options?: { codeTxt: string; copyTxt?: string }) {
    if (typeof options !== 'undefined') {
      this.#codeTxtDom.innerHTML = this.#codeTxt = this.#copyTxt = options.codeTxt;
    }
    if (typeof options !== 'undefined' && typeof options.copyTxt !== 'undefined') {
      this.#copyTxt = options.copyTxt;
    }
    this.#resetCopyBtn();
    if (this.#copyTxt === '') {
      this.#copyBtn.style.cursor = 'not-allowed';
      this.#copyBtn.style.opacity = '0.6';
      this.#copyBtn.style.pointerEvents = 'none';
    } else {
      this.#copyBtn.style.cursor = 'pointer';
      this.#copyBtn.style.opacity = '1';
      this.#copyBtn.style.pointerEvents = 'auto';
    }
  }

  #resetCopyBtn() {
    if (this.#resetCopyBtnTimer) {
      clearTimeout(this.#resetCopyBtnTimer);
    }
    this.#resetCopyBtnTimer = setTimeout(() => {
      this.#copyBtn.style.display = 'block';
      this.#copiedBtn.style.display = 'none';
    }, 1200);
  }
}
