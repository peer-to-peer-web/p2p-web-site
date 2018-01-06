var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var xhr = require('xhr')
var qs = require('qs')

var style = css`
  :host {
    padding: 1px;
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

module.exports = class FormRsvp extends Nanocomponent {
  constructor () {
    super()

    this.props = { }
    this.state = {
      loading: false,
      lang: 'en',
      message: '',
      error: '',
      name: '',
      address: '',
      event: 'p2p',
      attendance: 'livestream'
    }

    this.lang = {
      en: {
        livestream: 'Livestream',
        event: 'Event',
        name: 'Name',
        email: 'Email address',
        submit: 'Submit RSVP',
        submitting: 'Submitting…',
        success: 'Success!',
        error: 'Submission failed'
      },
      de: {
        livestream: 'Liveübertragung',
        event: 'Veranstaltung',
        name: 'Name',
        email: 'Email addresse',
        submit: 'Senden Sie Ihre Antwort',
        submitting: 'Einreichen…',
        success: '',
        error: ''
      }
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  createElement (props) {
    this.state = xtend(this.state, props)

    return html`
      <form
        enctype="application/x-www-form-urlencoded "
        method="post"
        class="c12 x xw bgc-black ${style} ${this.state.loading ? 'pen' : ''}"
        onsubmit=${this.handleSubmit}
      >
        <div class="c6">
          <input
            type="radio"
            name="attendance"
            class="dn"
            id="livestream"
            value="livestream"
            onchange=${this.handleInput}
            ${this.state.attendance === 'livestream' ? 'checked' : ''}
          >
          <label class="curp ff-sans px1 py0-5 db fs1 bgc-white fc-black" style="margin-right: 1px" for="livestream">
            ${this.getLang('livestream')}
          </label>
        </div>
        <input
          type="radio"
          name="attendance"
          class="dn"
          id="event"
          value="event"
          onchange=${this.handleInput}
          ${this.state.attendance === 'event' ? 'checked' : ''}
        >
        <label class="curp ff-sans px1 py0-5 db c6 fs1 bgc-white fc-black" for="event">
          ${this.getLang('event')}
        </label>
        <input
          name="name"
          required="true"
          type="text"
          class="px1 py0-5 c12 fs1 lh1-5 ff-sans fc-black bgc-white"
          placeholder="Name"
          value="${this.state.name}"
          oninput=${this.handleInput}
        />
        <input
          name="address"
          type="email"
          required="true"
          class="px1 py0-5 c12 fs1 lh1-5 ff-sans fc-black bgc-white"
          placeholder="${this.getLang('email')}"
          value="${this.state.address}"
          oninput=${this.handleInput}
        />
        <div class="psr w100">
          <div class="${this.state.loading ? 'x' : 'dn'} curd xjc xac bgc-white psa t0 l0 r0 b0 z2">
            ${this.getLang('submitting')}
          </div>
          <div class="${this.state.message ? 'x' : 'dn'} curd xjc xac bgc-white psa t0 l0 r0 b0 z2">
            ${this.state.message}
          </div>
          <button
            type="submit"
            class="px1 py0-5 c12 fs1 curp lh1-5 ff-sans fc-black bgc-white"
            style="outline: 0;"
          >${this.getLang('submit')}</button>
        </div>
      </form>
    `
  }

  getLang (str) {
    return this.lang[this.state.lang][str]
  }

  handleInput (event) {
    this.state[event.target.name] = event.target.value
    this.rerender()
  }

  handleSubmit (event) {
    var self = this
    event.preventDefault()

    this.state.loading = true
    this.rerender()

    xhr.post('https://api.jon-kyle.com/mailinglist/save', {
      body: qs.stringify(this.state),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded '
      }
    }, function (err, resp) {
      self.state.loading = false
      if (err) {
        self.state.error = this.getLang('error')
      } else {
        self.state.message = this.getLang('success')
      }
      self.rerender()
    })
  }

  update (props) {
    return (this.state.lang !== props.lang)
  }
}
