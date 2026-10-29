import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Clock3, MapPin, Music2, VolumeX, Sparkles, ArrowRight, PartyPopper, Heart, Copy, Check, RotateCcw } from 'lucide-react';
import './style.css';

const jokes = ['Nice try! 😈', 'Pakka nahi aana? 🤨', 'YES daba de bhai 😂', 'Button bhi nahi chahta tu miss kare!', 'Caught you looking 👀', 'No entry for “NO” 😭'];
const personalities = [
  { id: 'dance', emoji: '🕺', title: 'Dance Floor King', line: 'DJ wale bhaiya, inki demand poori karo. 💃' },
  { id: 'food', emoji: '🍕', title: 'Food Hunter', line: 'Inka location buffet ke aas-paas hi milega. 🍽️' },
  { id: 'sofa', emoji: '😴', title: 'Sofa Specialist', line: '4 baje entry, 4:15 pe power nap. Iconic. 🛋️' },
];
const drinkChoices = [
  { id: 'soft', emoji: '🥤', title: 'Soft drinks', subtitle: 'Chill & refreshing' },
  { id: 'mocktail', emoji: '🍹', title: 'Mocktails', subtitle: 'Fancy glass, full vibes' },
  { id: 'beer', emoji: '🍺', title: 'Beer', subtitle: 'Only if available & you’re of legal age' },
  { id: 'other', emoji: '✨', title: 'Surprise me', subtitle: 'Host’s choice' },
];

function App() {
  const [step, setStep] = useState('welcome');
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ left: 0, top: 0 });
  const [drinkType, setDrinkType] = useState('');
  const [drinkChoice, setDrinkChoice] = useState('');
  const [personality, setPersonality] = useState('');
  const [musicOn, setMusicOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);
  const musicTimer = useRef(null);

  useEffect(() => () => stopMusic(), []);

  function stopMusic() {
    if (musicTimer.current) clearInterval(musicTimer.current);
    musicTimer.current = null;
    if (audioRef.current) {
      try { audioRef.current.oscillators.forEach(o => { try { o.stop(); } catch {} }); audioRef.current.ctx.close(); } catch {}
      audioRef.current = null;
    }
    setMusicOn(false);
  }

  ```jsx
async function toggleMusic() {
  if (musicOn) {
    stopMusic();
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    alert("Sorry! Your browser does not support audio.");
    return;
  }

  try {
    const ctx = new AudioContext();
    await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);

    const notes = [
      261.63, 329.63, 392.00, 329.63,
      293.66, 349.23, 440.00, 349.23
    ];

    let i = 0;
    const oscillators = new Set();

    const play = () => {
      if (ctx.state !== "running") return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = notes[i % notes.length];

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.7,
        ctx.currentTime + 0.08
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.65
      );

      osc.connect(gain);
      gain.connect(master);

      oscillators.add(osc);
      osc.onended = () => oscillators.delete(osc);

      osc.start();
      osc.stop(ctx.currentTime + 0.7);

      i++;
    };

    play();

    musicTimer.current = setInterval(play, 780);

    audioRef.current = {
      ctx,
      oscillators: [...oscillators]
    };

    setMusicOn(true);
  } catch (error) {
    console.error("Music could not start:", error);
    alert("Music start nahi hua. Please button dobara try karo.");
  }
}
```

  function moveNo() {
    const maxX = Math.max(8, Math.min(190, window.innerWidth / 2 - 95));
    const maxY = 82;
    setNoPos({ left: Math.round((Math.random() * 2 - 1) * maxX), top: Math.round((Math.random() * 2 - 1) * maxY) });
    setNoCount(c => c + 1);
  }

  function celebrate() {
    setStep('drinks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finishDrinks() {
    setStep('personality');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finishParty() {
    setStep('final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => window.dispatchEvent(new Event('party-confetti')), 100);
  }

  async function shareInvite() {
    const text = '🪔 You’re invited to my Diwali House Party! 31 October 2026 • 4 PM onwards • Flat Party 🎉';
    if (navigator.share) {
      try { await navigator.share({ title: 'Diwali House Party 🪔', text, url: window.location.href }); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        setCopied(true); setTimeout(() => setCopied(false), 2200);
      } catch {
        window.prompt('Copy this invitation link:', window.location.href);
      }
    }
  }

  function addCalendar() {
    const start = '20261031T103000Z'; // 4:00 PM IST
    const end = '20261031T150000Z'; // 8:30 PM IST, approximate end
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Diwali House Party 🪔')}&dates=${start}/${end}&details=${encodeURIComponent('Good food, great vibes and festive memories!')}&location=${encodeURIComponent('Flat Party')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="string-lights" aria-hidden="true">{Array.from({length: 15}, (_, i) => <span key={i} style={{'--i': i}} />)}</div>
      <header className="topbar">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); setStep('welcome'); }}><span className="brand-diya">🪔</span><span>THE FESTIVE EDIT</span></a>
        <button className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? 'Turn music off' : 'Turn music on'}>
          {musicOn ? <VolumeX size={16}/> : <Music2 size={16}/>} <span>{musicOn ? 'Music on' : 'Calm music'}</span>
        </button>
      </header>

      {step === 'welcome' && <section className="hero page-enter">
        <div className="eyebrow"><Sparkles size={14}/> YOU’RE ON THE LIST… MAYBE</div>
        <div className="diya-row" aria-hidden="true"><span>✦</span><span className="big-diya">🪔</span><span>✦</span></div>
        <h1>Diwali <em>House Party</em></h1>
        <p className="hero-subtitle">Lights, laughter & a little bit of chaos.</p>
        <div className="event-pills">
          <span><CalendarDays size={16}/> 31 October 2026</span>
          <span><Clock3 size={16}/> 4 PM onwards</span>
          <span><MapPin size={16}/> Flat Party</span>
        </div>
        <div className="ornament"><span></span> ✧ <span></span></div>
        <h2>Are you coming?</h2>
        <p className="muted">Think carefully. The universe is watching. 👀</p>
        <div className="choice-area">
          <button className="btn btn-primary yes-button" onClick={celebrate}><Heart size={18} fill="currentColor"/> YES, I'M COMING!</button>
          <button className="btn btn-no" style={{ transform: `translate(${noPos.left}px, ${noPos.top}px)` }} onMouseEnter={moveNo} onTouchStart={e => { e.preventDefault(); moveNo(); }} onClick={moveNo}>{noCount ? jokes[(noCount - 1) % jokes.length] : "NO, I'M BORING 😒"}</button>
        </div>
        <div className="tiny-note">P.S. The “NO” button has commitment issues.</div>
        <div className="scroll-hint"><span/> GOOD VIBES ONLY <span/></div>
      </section>}

      {step === 'drinks' && <section className="content-page page-enter">
        <div className="step-label">STEP 01 / 02 <span>✦</span> THE VIBE CHECK</div>
        <div className="section-emoji">🥂</div>
        <h1>What’s your <em>party vibe?</em></h1>
        <p className="hero-subtitle">Choose your lane. No judgement. Mostly. 😂</p>
        <div className="drink-type-grid">
          <button className={`selection-card ${drinkType === 'non' ? 'selected' : ''}`} onClick={() => { setDrinkType('non'); setDrinkChoice(''); }}>
            <span className="card-emoji">🥤</span><span className="card-title">Non-Alcoholic</span><span className="card-subtitle">Main shareef hoon 😇</span>
          </button>
          <button className={`selection-card ${drinkType === 'alcohol' ? 'selected' : ''}`} onClick={() => { setDrinkType('alcohol'); setDrinkChoice(''); }}>
            <span className="card-emoji">🍻</span><span className="card-title">Alcoholic</span><span className="card-subtitle">Party mode activated 🔥</span>
          </button>
        </div>
        {drinkType && <div className="reaction-box page-enter">
          {drinkType === 'non' ? <><div className="reaction-emoji">😇🥤</div><p><strong>Achha ji, shareef ban rahe ho?</strong><br/>Koi nahi, tumhare liye bhi kuch special hai! 😂</p><span className="reaction-small">Mocktails & soft drinks deserve main-character energy too.</span></> : <><div className="reaction-emoji">😎✨</div><p><strong>Oho! Party mode activated!</strong><br/>Bas responsible rehna, superstar. ✨</p><span className="reaction-small">Pick your vibe — options depend on what’s available.</span></>}
          <div className="drink-options">
            {drinkChoices.map(item => <button key={item.id} className={`mini-option ${drinkChoice === item.id ? 'selected' : ''}`} onClick={() => setDrinkChoice(item.id)}><span>{item.emoji}</span><b>{item.title}</b><small>{item.subtitle}</small></button>)}
          </div>
          {drinkType === 'alcohol' && <p className="responsible-note">Alcohol is optional. Please follow local legal-age rules and don’t drink and drive.</p>}
          <button className="btn btn-primary continue-btn" onClick={finishDrinks}>CONTINUE <ArrowRight size={17}/></button>
        </div>}
        <button className="text-back" onClick={() => setStep('welcome')}>← Back to invitation</button>
      </section>}

      {step === 'personality' && <section className="content-page page-enter">
        <div className="step-label">STEP 02 / 02 <span>✦</span> KNOW THYSELF</div>
        <div className="section-emoji">🎭</div>
        <h1>Your party <em>personality</em></h1>
        <p className="hero-subtitle">Be honest. Your friends already know. 😂</p>
        <div className="personality-grid">
          {personalities.map(p => <button key={p.id} className={`personality-card ${personality === p.id ? 'selected' : ''}`} onClick={() => setPersonality(p.id)}><span className="card-emoji">{p.emoji}</span><b>{p.title}</b><small>{p.id === 'dance' ? 'The dance floor is calling' : p.id === 'food' ? 'Here for the snacks' : 'Social battery: 2%'}</small></button>)}
        </div>
        {personality && <div className="personality-result page-enter"><span>{personalities.find(p => p.id === personality).emoji}</span><p>{personalities.find(p => p.id === personality).line}</p></div>}
        <button className="btn btn-primary continue-btn" disabled={!personality} onClick={finishParty}>REVEAL MY INVITATION <Sparkles size={17}/></button>
        <button className="text-back" onClick={() => setStep('drinks')}>← Back to drinks</button>
      </section>}

      {step === 'final' && <section className="final-page page-enter">
        <div className="confetti" aria-hidden="true">{Array.from({length: 32}, (_, i) => <i key={i} style={{'--n': i}} />)}</div>
        <div className="final-card">
          <div className="final-topline">A LITTLE FESTIVE MAGIC <span>✦</span> JUST FOR YOU</div>
          <div className="final-diyas">🪔 <span>✧</span> 🪔</div>
          <p className="script-label">You’re officially invited to</p>
          <h1>Diwali <em>House Party</em></h1>
          <p className="final-copy">Good food. Great vibes.<br/>Crazy memories in the making.</p>
          <div className="final-divider">✦ ✧ ✦</div>
          <div className="final-details">
            <div><CalendarDays/><span><small>DATE</small><b>Saturday, 31 October 2026</b></span></div>
            <div><Clock3/><span><small>TIME</small><b>4 PM onwards</b></span></div>
            <div><MapPin/><span><small>WHERE</small><b>Flat Party</b></span></div>
          </div>
          <div className="dress-code">✨ DRESS CODE <b>Ethnic or Party Wear</b> ✨</div>
          <p className="final-signoff">Bring your best vibes. Leave your boring side at home. 💛</p>
          <div className="final-buttons">
            <button className="btn btn-primary" onClick={shareInvite}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'LINK COPIED!' : 'SHARE INVITATION'}</button>
            <button className="btn btn-secondary" onClick={addCalendar}><CalendarDays size={17}/> ADD TO CALENDAR</button>
          </div>
          <button className="restart" onClick={() => { setStep('welcome'); setDrinkType(''); setDrinkChoice(''); setPersonality(''); setNoCount(0); setNoPos({left:0,top:0}); }}><RotateCcw size={14}/> Replay the chaos</button>
        </div>
        <p className="final-footer">MADE WITH ✦ FESTIVE CHAOS ✦ AND A LITTLE LOVE</p>
      </section>}

      <footer className="site-footer"><span>🪔</span> A LITTLE LIGHT. A LOT OF MEMORIES. <span>🪔</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
