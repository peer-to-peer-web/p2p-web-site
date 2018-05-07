var html = require('choo/html')
var objectValues = require('object-values')

module.exports = createSponsors

function createSponsors (state, emit, local) {
  var sponsors = objectValues(state.page('/about').v('sponsors'))

  return html`
    <div class="x xac xjb fs1">
      <div>Sponsors →</div>
      <div class="x">
        ${sponsors.map(createSponsor)} 
      </div>
    </div>
  `

  function createSponsor (props) {
    return html`
      <div class="pl1">
        <a href="${props.href}" target="_blank">
          <img
            src="${state.page('/about').v('path')}/${props.svg}"
            class="db" style="height: 1.25rem; ${props.scale ? 'transform: scale(' + props.scale + ')' : ''}"
          >
        </a>
      </div>
    `
  }
}
