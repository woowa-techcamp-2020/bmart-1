import './style.scss'

const html = (s: TemplateStringsArray, ...args: unknown[]) =>
  s.map((ss, i) => `${ss}${args[i] || ''}`).join('')

class DialogInstance {
  dom: HTMLElement

  private createDialogDom(msg: string, type: 'alert' | 'confirm'): void {
    const dom = new DOMParser().parseFromString(
      html`
        <div class="dialog">
          <div class="bg"></div>
          <div class="msg-box">
            <p class="msg">${msg}</p>
            <div class="actions">
              ${type === 'confirm'
                ? html` <button class="cancel">취소</button>`
                : ''}
              <button class="done">
                ${type === 'alert' ? '완료' : '확인'}
              </button>
            </div>
          </div>
        </div>
      `,
      'text/html'
    ).body.firstElementChild as HTMLElement

    this.dom = dom

    document.body.appendChild(this.dom)
    this.dom.getBoundingClientRect()
    this.dom.classList.add('active')
  }

  private destroy() {
    this.dom.$sel('.bg').addEventListener('transitionend', () => {
      this.dom.remove()
    })

    this.dom.classList.remove('active')
  }

  alert(msg: string): void {
    this.createDialogDom(msg, 'alert')

    this.dom.$sel('.done').onclick = () => {
      this.destroy()
    }
  }

  confirm(msg: string): Promise<boolean> {
    this.createDialogDom(msg, 'confirm')

    return new Promise((resolve) => {
      this.dom.$sel('.done').onclick = () => {
        this.destroy()
        resolve(true)
      }

      this.dom.$sel('.cancel').onclick = () => {
        this.destroy()
        resolve(false)
      }
    })
  }
}

export const Dialog = () => new DialogInstance()
