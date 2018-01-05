var objectKeys = require('object-keys')
var html = require('choo/html')

var wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div>
      ${header()}
      <div class="p1 pt0 tac lh1 fs1 sm-fs3">
        ${state.page.date}
      </div>
      <div class="p1">
        testing hows it going
      </div>
      <div class="x xjc w100 p1">
        <img src="/assets/02-berlin/venue.jpg" class="grayscale db" style="width: 10rem">
        <div class="p1">
          ${state.page.venue}<br>
          ${state.page.address}
        </div>
      </div>
    </div>
  `

  function header () {
    return html`
      <div class="x xdc lh1 tac vh100 p0-5 fs3 lh1-25 sm-lh1 curd">
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
              <div class="x xx xjc xac">days</div>
              <div class="x xx xjc xac">hours</div>
              <div class="x xx xjc xac">minutes</div>
            </div>
          </div>
        </div>
        <div class="w100 p0-5 psr x">
          <div class="x xac">↓</div>
          <div class="xx">${state.page.title}</div>
          <div class="x xac">↓</div>
        </div>
      </div>
    `
  }
}
