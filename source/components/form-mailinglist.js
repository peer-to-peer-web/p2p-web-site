var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xhr = require('xhr')
var qs = require('qs')

var style = css`
  :host {
    padding: 1px;
    position: relative;
  }

  form input, form label { margin: 0 0 1px 0 }

  input:not([value=""]):invalid {
    color: #f00;
  }

  :-moz-submit-invalid { box-shadow: none }
  :-moz-ui-invalid { box-shadow: none }

  label { position: relative; }
  input[checked]+label:after {
    content: '×';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem 1rem;
  }
`

module.exports = class FormMailinglist extends Nanocomponent {
  constructor () {
    super()

    this.props = { }
    this.state = {
      loading: false,
      message: '',
      error: '',
      form: {
        name: '',
        address: '',
        event: 'p2p',
      }
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  createElement (props) {
    this.props = props

    return html`
      <form
        enctype="application/x-www-form-urlencoded "
        method="post"
        class="c12 lh1 x xw bgc-black ${style} ${this.state.loading ? 'pen' : ''}"
        onsubmit=${this.handleSubmit}
      >
        <input
          name="name"
          required="true"
          type="text"
          class="px1 py0-5 c12 fs1 ff-sans fc-black bgc-white"
          placeholder="Name"
          value="${this.state.form.name}"
          oninput=${this.handleInput}
        />
        <input
          name="address"
          type="email"
          required="true"
          class="px1 py0-5 c12 fs1 ff-sans fc-black bgc-white"
          placeholder="Email address"
          value="${this.state.form.address}"
          oninput=${this.handleInput}
        />
        <div class="psr w100">
          <div class="${this.state.loading ? 'x' : 'dn'} curd xjc xac bgc-white psa t0 l0 r0 b0 z2">
            Submitting…
          </div>
          <div class="${this.state.message ? 'x' : 'dn'} curd xjc xac bgc-white psa t0 l0 r0 b0 z2">
            ${this.state.message}
          </div>
          <button
            type="submit"
            class="db px1 py0-5 c12 fs1 curp ff-sans fc-black bgc-white"
            style="outline: 0;"
          >Join mailinglist</button>
        </div>
      </form>
    `
  }

  handleInput (event) {
    this.state.form[event.target.name] = event.target.value
    this.rerender()
  }

  handleSubmit (event) {
    var self = this
    event.preventDefault()

    this.state.loading = true
    this.rerender()

    xhr.post('https://api.jon-kyle.com/mailinglist/save', {
      body: qs.stringify(this.state.form),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded '
      }
    }, function (err, resp) {
      self.state.loading = false
      if (err) {
        self.state.error = 'Submission failed'
      } else {
        self.state.message = 'Success!'
      }
      self.rerender()
    })
  }

  update (props) {
    return false
  }
}
