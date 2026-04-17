export interface JsonInfo {
  kid?: string;
  sub?: string;
  iat?: string;
  exp?: string;
}

export class JsonCard {
  #info: {
    key: string;
    value?: string;
    edit?: boolean;
  }[] = [];
  changed;
  constructor(options: {
    info: {
      key: string;
      value?: string;
      edit?: boolean;
    }[];
    target: HTMLElement;
    className?: string;
    changed?: (info: JsonInfo) => void;
  }) {
    if (options.info.length <= 0) {
      return;
    }
    if (options.changed) {
      this.changed = options.changed;
    }
    this.#info = options.info;
    const codeCardBox = document.createElement('div');
    codeCardBox.className = `code-card json-card ${options.className ?? ''}`;
    const txtClassName = 'q-txt code-family font-14 line-20 color-text-qGray user-no-select';
    const start = document.createElement('p');
    start.className = txtClassName;
    start.innerHTML = `{`;
    codeCardBox.appendChild(start);
    for (let i = 0; i < this.#info.length; i++) {
      const item = this.#info[i];
      const rowStartDom = `&nbsp;&nbsp;`;
      const rowEndDom = i !== this.#info.length - 1 ? ',' : '';
      if (item.edit === true) {
        const itemJson = document.createElement('div');
        itemJson.className = 'q-flex q-align-items-center';
        codeCardBox.appendChild(itemJson);
        const span1 = document.createElement('span');
        span1.className = txtClassName;
        span1.innerHTML = `${rowStartDom}"${item.key}": "`;
        itemJson.appendChild(span1);

        // --- main start ---
        const inputBox = document.createElement('div');
        inputBox.className = 'json-card-input-box q-flex gap-10 q-align-items-center';
        inputBox.style.display = 'none';
        const input = document.createElement('input');
        input.name = `${item.key}-json-value`;
        input.type = 'text';
        input.value = item.value ?? '';
        input.maxLength = 10;
        inputBox.appendChild(input);
        const closeSpan = document.createElement('span');
        closeSpan.className = `q-txt code-family font-18 line-16 1 color-text-qGray user-no-select weight-700 cursor-pointer`;
        closeSpan.innerHTML = '&#10005;';
        inputBox.appendChild(closeSpan);
        const valueBox = document.createElement('div');
        valueBox.className = 'json-card-value-box q-flex gap-5 q-align-items-center';
        valueBox.style.cursor = 'pointer';
        const valueSpan = document.createElement('span');
        valueSpan.className = `q-txt code-family font-14 line-20 color-primary-orange italic weight-700`;
        valueSpan.innerHTML = item.value ?? '';
        const editIcon = document.createElement('span');
        editIcon.className = `q-txt line-20 user-no-select color-primary-orange italic weight-700`;
        editIcon.innerHTML = '✎';
        editIcon.style.transform = 'scaleX(-1)';
        valueBox.appendChild(valueSpan);
        valueBox.appendChild(editIcon);

        const open = () => {
          inputBox.style.display = 'flex';
          valueBox.style.display = 'none';
          input.focus();
        };
        const close = () => {
          inputBox.style.display = 'none';
          valueBox.style.display = 'flex';
          if (this.changed) {
            const params: JsonInfo = {};
            params[item.key as keyof JsonInfo] = item.value;
            this.changed(params);
          }
        };
        valueBox.onclick = open;
        input.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.keyCode === 13) {
            close();
            event.preventDefault();
          } else if (event.key === 'Escape' || event.keyCode === 27) {
            close();
          }
        });
        input.onblur = close;
        input.oninput = event => {
          const target = event.target as HTMLInputElement;
          valueSpan.innerHTML = this.#info[i].value = input.value = `${target.value}`.trim().toLocaleUpperCase();
        };
        closeSpan.onclick = close;

        itemJson.appendChild(valueBox);
        itemJson.appendChild(inputBox);
        // --- main end ---

        const span2 = document.createElement('span');
        span2.className = txtClassName;
        span2.innerHTML = `"${rowEndDom}`;
        itemJson.appendChild(span2);
      } else {
        const itemJson = document.createElement('p');
        itemJson.className = txtClassName;
        itemJson.innerHTML = `${rowStartDom}"${item.key}": "${item.value ?? ''}"${rowEndDom}`;
        codeCardBox.appendChild(itemJson);
      }
    }
    const end = document.createElement('p');
    end.className = txtClassName;
    end.innerHTML = `}`;
    codeCardBox.appendChild(end);

    options.target.appendChild(codeCardBox);
  }
}
