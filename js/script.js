/* MATRIX RAIN */
(function(){
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const fs = 14;
  const chars = 'アイウエオカキクケコ0123456789ABCDEF{}[]<>/\\|=+-_';
  function init(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fs);
    drops = Array(cols).fill(1);
  }
  function draw(){
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = '#39ff14';
    ctx.font = fs + 'px JetBrains Mono, monospace';
    for(let i=0;i<drops.length;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fs, drops[i]*fs);
      if(drops[i]*fs > H && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  }
  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

/* TERMINAL TYPEWRITER */
(function(){
  const lines = [
    {type:'prompt', cmd:'whoami'},
    {type:'output', text:'edson_armijo — full stack developer', green:true},
    {type:'prompt', cmd:'cat skills.txt'},
    {type:'output', text:'python · flask · javascript · mysql · java', green:false},
    {type:'prompt', cmd:'echo $STATUS'},
    {type:'output', text:'✓  disponible para trabajar', green:true},
    {type:'prompt', cmd:''},
  ];
  const container = document.getElementById('terminal-text');
  let li=0, ci=0, el=null;

  function nextLine(){
    if(li>=lines.length) return;
    const line = lines[li];
    const div = document.createElement('div');
    div.className='t-line';
    if(line.type==='prompt'){
      const p=document.createElement('span'); p.className='t-prompt'; p.textContent='edson@portfolio:~$'; div.appendChild(p);
      el=document.createElement('span'); el.className='t-cmd'; div.appendChild(el);
    } else {
      el=document.createElement('span'); el.className='t-out'+(line.green?' green':''); div.appendChild(el);
    }
    container.appendChild(div);
    ci=0;
    typeChar();
  }

  function typeChar(){
    const line=lines[li];
    const txt=line.type==='prompt'?line.cmd:line.text;
    if(ci<txt.length){
      el.textContent+=txt[ci]; ci++;
      setTimeout(typeChar, line.type==='prompt'?65:18);
    } else {
      li++;
      setTimeout(nextLine, line.type==='prompt'?350:120);
    }
  }

  setTimeout(nextLine, 800);
})();