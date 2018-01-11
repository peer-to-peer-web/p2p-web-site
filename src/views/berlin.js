var objectKeys = require('object-keys')
var raw = require('choo/html/raw')
var Markdown = require('markdown-it')
var html = require('choo/html')
var css = require('sheetify')
var md = new Markdown()

var Slideshow= require('../components/slideshow-2')
var FormRsvp = require('../components/form-rsvp')
var sound = require('../components/berlin-sound')
var wrapper = require('../components/wrapper')
var footer = require('../components/footer')

var slideshowLeft = new Slideshow()
var slideshowRight = new Slideshow()
var formRsvp = new FormRsvp()

var style = css`
  .ham {
    transform: translateY(0.4rem) rotate(90deg);
  }
`

module.exports = wrapper(view)

function view (state, emit) {
  var page = state.content['/02-berlin']
  var langs = {
    en: {
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      date: page.dateen
    },
    de: {
      days: 'tag',
       hours: 'Stunden',
       minutes: 'minuten',
       date: page.datede
    }
  }

  var lang = langs[state.ui.lang] || langs.en

  emit(state.events.DOMTITLECHANGE, 'Peer-to-peer web / Berlin')

  return html`
    <div class="x xjc xw ${style}">
      ${header()}
      <div class="c12 p1 sm-pt0 tac lh1-25 sm-lh1 fs3">
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
        <div class="c12 pt3">
          ${location()}
        </div>
        <div class="c12 pt3">
          ${sponsors()}
        </div>
        <div class="c12 pt2"></div>
      </div>
      ${footer()}
    </div>
  `

  function header () {
    return html`
      <div class="usn c12 x xdc lh1 tac vhmn100 p0-5 fs3 lh1-25 sm-lh1 curd">
        <div class="xx w100 psr">
          <div class="psa lh1 p2 t0 r0 z2 blink-sec" style="color: #ff0; font-size: 0.5rem">
            •
          </div>
          <div class="psa t0 l0 r0 b0 bgsct bgrn bgpc z2 pen" style="margin: 2.5vmin; background-image: url(/assets/02-berlin/lines.png"></div>
          <div class="x psa t0 l0 b0 c6 pr0 p0-5">
            <div class="w100 h100 bgc-black oh psr">
              ${slideshowLeft.render({
                trigger: page.playing,
                images: page.imgLeft,
                reverse: true,
                select: function (slideshow) {
                  slideshow.delay = getRandomSlideDelay()
                  if (sound && slideshow.trigger) sound.playOne()
                }
              })}
            </div>
          </div>
          <div class="psa t0 r0 b0 c6 pl0 p0-5">
            <div class="w100 h100 bgc-black oh psr">
              ${slideshowRight.render({
                trigger: page.playing,
                rightToLeft: true,
                images: page.imgRight,
                select: function (slideshow) {
                  slideshow.delay = getRandomSlideDelay()
                  if (sound && slideshow.trigger) sound.playTwo()
                }
              })}
            </div>
          </div>
          <div class="dn psa t0 l0 r0 b0 x fc-white lh1 fs2 sm-fs3 z2">
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
        <div class="w100 p0-5 sm-psr">
          <div class="xx">${page.title}</div>
          <div class="x xjc xac oh curp psa t0 r0 p0-5 t0 sm-b0 z2" onclick=${toggleSound}>
            <div class="bgc-black p1" style="border-radius: 50%">
              ${page.playing ? iconOn() : iconOff()}
            </div>
          </div>
        </div>
      </div>
    `
  }

  function copy () {
    return html`
      <div class="c12 x xw p0-5">
        <div class="c12 sm-c6 p0-5 copy">
          ${raw(md.render(page.texten))}
        </div>
        <div class="c12 sm-c6 p0-5 copy">
          ${raw(md.render(page.textde))}
        </div>
      </div>
    `
  }

  function location () {
    return html`
      <div class="c12 tac w100 p1">
        <a href="https://trust.support" class="bb0" target="_blank"><img src="/assets/02-berlin/venue.jpg" class="" style="width: 12rem"></a>
        <div class="p1">
          <div><a href="https://trust.support" target="_blank">${page.venue}</a></div>
          <br>
          <div>${page.time} (CET)</div>
          <a href="${page.addresslink}" class="pb0-25">${page.address}</a>
        </div>
      </div>
    `
  }

  function sponsors () {
    return html`
      <div class="x xw xjc">
        ${page.sponsors.map(function (sponsor) {
          return html`
            <div class="x xjc xac p1 sm-px1-5">
              <a href="${sponsor.url}" target="_blank" class="bb0">
                <img src="/assets/02-berlin/${sponsor.src}" style="max-width: ${sponsor.size}rem">
              </a>
            </div>
          `
        })}
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
    var blocks = page.streetview.map(function (image) {
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

  function toggleSound () {
    if (sound) sound.load()
    emit(state.events.CONTENT, {
      page: '/02-berlin',
      data: { playing: !page.playing }
    })
  }
}

function getRandomSlideDelay () {
  return Math.floor((Math.random() * 4000)) + 3000
}

function iconOff () {
  return html` 
    <svg class="db" style="height: 1rem; width: 1rem" viewBox="0 0 15 15" version="1.1">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Artboard" transform="translate(-114.000000, -167.000000)" fill="#fff">
                <path d="M127.359375,174.5 C127.359375,173.171868 126.968754,171.973964 126.1875,170.90625 C125.406246,169.838536 124.403652,169.122398 123.179688,168.757812 L123.179688,167 C124.846362,167.390627 126.233067,168.289055 127.339844,169.695312 C128.44662,171.10157 129,172.703116 129,174.5 C129,175.906257 128.687503,177.156245 128.0625,178.25 L126.8125,177 C127.177085,176.218746 127.359375,175.385421 127.359375,174.5 Z M121.5,167.625 L121.5,171.6875 L119.507812,169.695312 L121.5,167.625 Z M115.054688,167.117188 L128.882812,180.945312 L127.945312,181.882812 L126.382812,180.320312 C125.445308,181.179692 124.37761,181.739582 123.179688,182 L123.179688,180.242188 C123.986983,179.98177 124.66406,179.61719 125.210938,179.148438 L121.5,175.4375 L121.5,181.375 L117.320312,177 L114,177 L114,172 L117.320312,172 L117.671875,171.609375 L114.117188,168.054688 L115.054688,167.117188 Z M125.25,174.5 C125.25,174.890627 125.223959,175.177082 125.171875,175.359375 L123.179688,173.367188 L123.179688,171.023438 C123.804691,171.335939 124.305988,171.811195 124.683594,172.449219 C125.0612,173.087243 125.25,173.77083 125.25,174.5 Z" id="ion-android-volume-off---Ionicons"/>
            </g>
        </g>
    </svg> 
  `
}

function iconOn () {
  return html`
    <svg class="db" style="height: 1rem; width: 1rem" viewBox="0 0 15 15" version="1.1">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Artboard" transform="translate(-99.000000, -119.000000)" fill="#fff">
                <path d="M99,124 L102.320312,124 L106.5,119.625 L106.5,133.375 L102.320312,129 L99,129 L99,124 Z M110.25,126.5 C110.25,127.255212 110.0612,127.945309 109.683594,128.570312 C109.305988,129.195316 108.804691,129.65104 108.179688,129.9375 L108.179688,123.023438 C108.804691,123.335939 109.305988,123.811195 109.683594,124.449219 C110.0612,125.087243 110.25,125.77083 110.25,126.5 Z M108.179688,119 C109.846362,119.390627 111.233067,120.289055 112.339844,121.695312 C113.44662,123.10157 114,124.703116 114,126.5 C114,128.296884 113.44662,129.89843 112.339844,131.304688 C111.233067,132.710945 109.846362,133.609373 108.179688,134 L108.179688,132.242188 C109.403652,131.877602 110.399736,131.161464 111.167969,130.09375 C111.936202,129.026036 112.320312,127.828132 112.320312,126.5 C112.320312,125.171868 111.936202,123.973964 111.167969,122.90625 C110.399736,121.838536 109.403652,121.122398 108.179688,120.757812 L108.179688,119 Z" id="ion-android-volume-up---Ionicons"/>
            </g>
        </g>
    </svg>
  `
}