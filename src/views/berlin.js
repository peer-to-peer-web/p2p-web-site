var objectKeys = require('object-keys')
var raw = require('choo/html/raw')
var Markdown = require('markdown-it')
var html = require('choo/html')
var css = require('sheetify')
var md = new Markdown()

var FormRsvp = require('../components/form-rsvp')
var wrapper = require('../components/wrapper')
var footer = require('../components/footer')
var formRsvp = new FormRsvp()

var style = css`
  .ham {
    transform: translateY(0.4rem) rotate(90deg);
  }
`

module.exports = wrapper(view)

function view (state, emit) {
  var langs = {
    en: {
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      date: state.page.dateen
    },
    de: {
      days: 'tag',
      hours: 'stunde',
      minutes: 'minuten',
      date: state.page.datede
    }
  }

  var lang = langs[state.ui.lang] || langs.en

  emit(state.events.DOMTITLECHANGE, 'Peer-to-peer web / Berlin')

  return html`
    <div class="x xjc xw ${style}">
      ${header()}
      <div class="c12 p1 sm-pt0 tac lh1 fs1 sm-fs3">
        ${lang.date}
      </div>
      <div class="mxwidth">
        ${localization()}
        <div class="c12 pt3">
          ${rsvp()}
        </div>
        <div class="c12 pt3">
          ${copy()}
        </div>
        <div class="c12 pt2">
          ${images()}
        </div>
        <div class="c12 pt3">
          ${location()}
        </div>
        <div class="c12 pt2"></div>
      </div>
      ${footer()}
    </div>
  `

  function header () {
    return html`
      <div class="usn c12 x xdc lh1 tac vh100 p0-5 fs3 lh1-25 sm-lh1 curd">
        <div class="xx w100 psr">
          <div class="psa lh1 px1 t0 r0 z2 blink-sec fc-white">
            •
          </div>
          <div
            class="psa t0 l0 b0 c6 m0-5 bgsc bgrn bgpc"
            style="background-image: url(/assets/02-berlin/apple.png)"
          ></div>
          <div
            class="psa t0 r0 b0 c6 m0-5 bgsc bgrn bgpc"
            style="background-image: url(/assets/02-berlin/google.png)"
          ></div>
          <div class="psa t0 l0 r0 b0 x fc-white lh1 fs2 sm-fs3 z2">
            <div class="c6 h100 x xdc ff-mono">
              <div class="x xx xjc xac">23</div>
              <div class="x xx xjc xac">10</div>
              <div class="x xx xjc xac">59</div>
            </div>
            <div class="c6 h100 x xdc">
              <div class="x xx xjc xac">${lang.days}</div>
              <div class="x xx xjc xac">${lang.hours}</div>
              <div class="x xx xjc xac">${lang.minutes}</div>
            </div>
          </div>
        </div>
        <div class="w100 p0-5 psr x">
          <div class="xx">${state.page.title}</div>
          <a href="/" class="dn x xac psr oh curp bb0">
            <div class="psa t0 r0 l0 b0 x xjc xac ham">
              |||
            </div>
            <span class="op0">↓</span>
          </a>
        </div>
      </div>
    `
  }

  function copy () {
    return html`
      <div class="c12 x xw p0-5">
        <div class="c12 sm-c6 p0-5 copy">
          ${raw(md.render(state.page.texten))}
        </div>
        <div class="c12 sm-c6 p0-5 copy">
          ${raw(md.render(state.page.textde))}
        </div>
      </div>
    `
  }

  function location () {
    return html`
      <div class="c12 tac w100 p1">
        <img src="/assets/02-berlin/venue.jpg" class="" style="width: 6rem">
        <div class="p1">
          ${state.page.venue}<br>
          <a href="${state.page.addresslink}" class="pb0-25">
            ${state.page.address}
          </a>
        </div>
      </div>
    `
  }

  function rsvp () {
    return html`
      <div class="c12 x xjc">
        <div class="c12 sm-c8 p1">
          ${formRsvp.render({
            lang: state.ui.lang,
            event: 'berlin'
          })}
        </div>
      </div>
    `
  }

  function localization () {
    return html`
      <div class="c12 x xjc lh1-5">
        ${objectKeys(langs).map(function (lang) {
          var active = state.ui.lang === lang ? 'bb1-black' : 'op25'
          return html`
            <div class="p0-5 ttu">
              <span
                class="${active} curp oph100 pb0-25"
                onclick=${handleClick}
              >${lang}</span>
            </div>
          `
          function handleClick () {
            emit(state.events.UI, { lang: lang })
            emit(state.events.RENDER)
          }
        })}
      </div>
    `
  }

  function images () {
    var blocks = state.page.streetview.map(function (image) {
      return html`
        <div class="c4 psr p0-5">
          ${state.ui.loaded ? img() : ''}
          <div style="padding-bottom: 100%"></div>
        </div>
      `

      function img () {
        return html`
          <div
            class="psa t0 l0 r0 b0 m0-5 bgpc bgsct bgrn"
            style=" background-image: url(${image.url});"
          ></div>
        `
      }
    })

    return html`
      <div class="c12 sm-co1 sm-c10 p0-5">
        <div class="c12 x">
          ${blocks}
        </div>
      </div>
    `
  }
}
