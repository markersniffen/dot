// get main DIV
const container = d3.select('#box');

// get width/height
let height = container._groups[0][0].offsetHeight;
let width = container._groups[0][0].offsetWidth;
const padLeft = 35;
const padRight = 35;
const padBottom = 35;
const padTop = 65;
let innerWidth = width - padLeft - padRight;
let innerHeight = height - padTop - padBottom;

let score = 0;
const resetTime = 30;
let time = 30;
let status = 'ready';
rad = innerHeight * .05;

const t8 = d3.transition()
  .duration(800)

  const t1 = d3.transition()
  .duration(100)

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

   message2 = svg.selectAll('.message2').data([null])
   .join( enter => enter
    .append('text')
   .text("Welcome to Dot!")
   .attr('class', 'message2')
   .style('fill', 'steelBlue')
   .style('font-size', '2em')
   .style('font-weight', 'bold')
   .style('fill-opacity', 0)
   .attr('x', width/2)
   .attr('y', innerHeight * .5 + padTop)
   .call(enter => enter
   
   .transition(t8)
   .attr('x', width/2)
   .attr('y', innerHeight * .5 + padTop - 70)
   .style('fill-opacity', 1)
   ),
   update => update
    .text('Again...?')
    .style('fill-opacity', 0)
    .attr('x', width/2)
    .attr('y', height * .5)
    .call(update => update
    .transition(t8)
    .attr('x', width/2)
    .attr('y', height * .5 - 60)
    .style('fill-opacity', 1)
    .style('fill', 'steelblue')
    )
   )
   

  message = svg.selectAll('.message').data([null])
  .join('text')
  .text('try and press the dot...')
  .attr('class', 'message')
  .style('fill', 'steelBlue')
  .style('fill-opacity', 0)
  .attr('x', width/2)
  .attr('y', innerHeight * .5 + padTop)
  .transition(t8)
  .attr('x', width/2)
  .attr('y', innerHeight * .5 + padTop + 70)
  .style('fill-opacity', 1)
  

    if (status === 'ready') {
      message.text("Try and press the dot...")
    } else {
      message.text('');
    }
      
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
          .attr('r', rad)
          .style('fill-opacity', 1)
          .style('fill', 'grey')
          )
          .on('click', clickMe),
        update => update 
          .attr('cx', innerWidth/2)
          .attr('cy', innerHeight/2)
          .style('fill', 'steelblue')
        )

    
    
    svg.selectAll('.score').data([score])
      .join('text')
      .attr('class', 'score')
      .text(`Score: ${score}`)
      .style('fill', 'white')
      .attr('x', width - padRight)
      .attr('y', padTop - 20)

    svg.selectAll('.myTime').data([time])
      .join('text')
      .attr('class', 'myTime')
      .text(`Time: ${time}`)
      .style('fill', 'white')
      .attr('x', padLeft)
      .attr('y', padTop -20)

}

function clickMe(iw, ih) {
  if (status === 'gameover') {
    status = 'ready'
    svg.selectAll('circle')
    .transition().duration(150)
    .attr('r', 50)
    .style('fill', 'steelblue')
    .transition().duration(350)
    .attr('r', innerHeight*.05)
    .style('fill', 'grey')

    d3.selectAll('.message2')
    .transition().duration(500)
    .attr('y', innerHeight * .5 + padTop)
    .style('fill-opacity', 0) 



    
    setTimeout(render, 500);
  } else {
  svg.selectAll('.message').text('')
  svg.selectAll('.message2').text('')
  d3.selectAll('.circle')
    .transition().duration(50)
    .attr('cx', Math.random()*innerWidth)
    .attr('cy', Math.random()*innerHeight)
    .style('fill', 'steelblue')
  
  score += 1;
  d3.selectAll('.score')
    .text(`Score: ${score}`)

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
    .text(`Time: 0`);

    d3.selectAll('.score')
    .text(`Final score: ${score}`);

    d3.selectAll('.message2')
    .attr('y', innerHeight * .5 + padTop - 90)
    .transition(t8)
    .attr('y', innerHeight * .5 + padTop - 70)
    .style('fill', '#e63737') 
    .text(`GAME OVER`);

    d3.selectAll('.circle')
    .transition(t8)
    .attr('cx', innerWidth/2)
    .attr('cy', innerHeight/2)
    .style('fill', '#e63737') 

    status = 'gameover'
  }
}   

}


render();

setInterval(timer, 10);
window.addEventListener('resize', render);