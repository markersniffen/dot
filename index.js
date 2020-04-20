// get main DIV
const container = d3.select('#box');

// get width/height
let height = container._groups[0][0].offsetHeight;
let width = container._groups[0][0].offsetWidth;
const padLeft = 35;
const padRight = 35;
const padBottom = 35;
const padTop = 35;
let innerWidth = width - padLeft - padRight;
let innerHeight = height - padTop - padBottom;

let score = 0;
const resetTime = 30;
let time = 30;
let status = 'ready';

const t8 = d3.transition()
  .duration(800)

timeScale = d3.scaleLinear().domain([0, 30]).range([30, 0])


function render() {
  height = container._groups[0][0].offsetHeight;
  width = container._groups[0][0].offsetWidth;
  innerWidth = width - padLeft - padRight;
  innerHeight = height - padTop - padBottom;

  svg = container.selectAll('#svg').data([null])
   .join(
      enter => enter
      .append('svg')
      .attr('id', 'svg')
      .style('background-color', 'none')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewbox', `0 0 ${width} ${height}`),
      update => update
      .attr('viewbox', `0 0 ${width} ${height}`)
   )

      
      
    // setup padded group
    let pad = svg.selectAll('#pad').data([null])
    .join('g')
    .attr('id', 'pad')
    .attr('transform', `translate(${padLeft}, ${padTop})`)

    // add circle
    pad.selectAll('.circle').data([null])
      .join(
        enter => enter
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', innerWidth/2)
        .attr('cy', innerHeight/2)
        .attr('r', 10)
        .style('fill-opacity', 0)
        .call(
          enter => enter
          .transition(t8)
          .attr('r', innerHeight*.1)
          .style('fill-opacity', 1)
          .style('fill', 'grey')
          )
          .on('click', clickMe),
        update => update 
          .attr('cx', innerWidth/2)
          .attr('cy', innerHeight/2)
          .style('fill', 'steelblue')
        )
    
    pad.selectAll('.score').data([score])
      .join('text')
      .attr('class', 'score')
      .text(`Score: ${score}`)
      .style('fill', 'white')
      .attr('x', innerWidth)
      .attr('y', 12)

    pad.selectAll('.myTime').data([time])
      .join('text')
      .attr('class', 'myTime')
      .text(time)
      .style('fill', 'white')
      .attr('x', 0)
      .attr('y', 12)

}

function clickMe(iw, ih) {
  if (status === 'gameover') {
    status = 'ready'
    setTimeout(render, 500);
  } else {
 
  d3.selectAll('.circle')
    .attr('cx', Math.random()*innerWidth)
    .attr('cy', Math.random()*innerHeight)
    .style('fill', 'steelblue')
  
  score += 1;
  d3.selectAll('.score')
    .text(score)

  status = 'playing';
  }
  console.log(status)

}

// timer
function timer() { 

if (status === 'ready') {
  time = resetTime;
} else if (status === 'playing' ){
      
  time -= .01;
  d3.selectAll('.myTime')
  .text(`Time: ${time.toFixed(2)}`);
  if (time <= 0 ) {
    d3.selectAll('.myTime')
    .text(`GAME OVER`);

    d3.selectAll('.circle')
    .transition(t8)
    .attr('cx', innerWidth/2)
    .attr('cy', innerHeight/2)
    .style('fill', 'red')

    status = 'gameover'
  }
}   

}

render();

setInterval(timer, 10);
window.addEventListener('resize', render);