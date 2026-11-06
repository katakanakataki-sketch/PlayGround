
const $ = (s) => document.querySelector(s);
const panel = $('#panel-scroll');
const stage = $('#stage');
const art = $('#scene-art');
const toast = $('#toast');
const defaults = {name:'', origin:'isekai', pronouns:'she / her', skin:'#e8b99f', eyes:'#7f8eab', hair:'#30283e', hairStyle:'soft waves', eyeShape:'almond', outfit:'Moonlit formal'};
const avatar = {...defaults};
let screen = 'home', route = null, chapter = 0, affinity = {aster:0, ren:0, soren:0, luca:0, idris:0}, friendship = {tavi:{score:0,visits:0}, nessa:{score:0,visits:0}}, activeFriend = null, originChoice='isekai';
let prologueChoice = '';
let interfaceLead='aster', phoneApp='apps', phoneContact='aster';
const inbox={};
let shoot={characters:['player','aster'],pose:'Together',clothes:'Moonlit formal',accessory:'Silver hairpin',background:'Moon garden',effect:'Soft glow',camera:'Portrait'};
const expressions = {player:'curious',aster:'curious',ren:'curious',soren:'curious',luca:'curious',idris:'curious',tavi:'curious',nessa:'curious'};
const leads = {
 aster:{id:'aster',name:'Aster Vale',role:'The star-reader',tag:'THE QUIET CONSTELLATION',hair:'#d8bd8c',skin:'#e8c2ad',eyes:'#83a3a4',style:'soft waves',coat:'#34455c',accent:'#ead6aa',scene:'night-scene',intro:'An astronomer who reads the future in a sky that no longer has stars. He trusts patterns more than people—until you arrive, carrying a constellation he has never seen.',quote:'“You appeared where the sky has a hole in it. Tell me… do you know what you are?”',places:['The observatory roof','The west watchtower','The starless dome'],moments:[['Tell him the truth about waking in another world.','A secret offered freely is still a kind of trust.'],['Ask what he wishes the stars would say.','For once, he answers without looking up.'],['Stay beside him in the silence.','Some silences feel more honest than words.']],final:['Let him choose the future, together.','Ask him to trust what cannot be measured.','Kiss him beneath the unfinished constellation.']},
 ren:{id:'ren',name:'Ren Amari',role:'The wandering blade',tag:'THE WAYWARD SWORD',hair:'#20232b',skin:'#d7a47f',eyes:'#bd725f',style:'tousled',coat:'#743f4d',accent:'#d5a176',scene:'garden-scene',intro:'A charming swordsman with a laugh too bright for a man who keeps leaving. Ren knows every road out of the capital, and none of the reasons to stay.',quote:'“You’ve got the look of someone who’s lost a whole world. Lucky for you, I’m very good at getting lost.”',places:['The lantern market','The old river bridge','The garden beyond the gate'],moments:[['Ask him to teach you the first move.','His hand pauses over yours, just a little too long.'],['Challenge his story about the road.','His grin slips. He appreciates that you noticed.'],['Tell him it’s okay to be afraid to stay.','For once, Ren has no clever answer.']],final:['Ask him to show you a road worth staying for.','Offer to walk beside him, wherever it leads.','Take his hand before he can make another joke.']},
 soren:{id:'soren',name:'Soren Lune',role:'The court alchemist',tag:'THE VELVET ALCHEMIST',hair:'#493448',skin:'#f0d4c2',eyes:'#8d789f',style:'long',coat:'#563f62',accent:'#d6af91',scene:'library-scene',intro:'A court alchemist whose beautiful hands can mend almost anything—except the strange fracture spreading through his own magic. He is all elegant manners and carefully guarded heart.',quote:'“Every impossible thing has a cause. And you, my dear, are the most impossible thing I have ever met.”',places:['The moonlit conservatory','The forbidden archive','The alchemy room after hours'],moments:[['Offer to help with his experiment.','He lets you hold the vial. That is its own kind of invitation.'],['Ask about the scar on his hand.','He tells you the part of the story he never tells.'],['Tell him he does not have to be useful to be wanted.','For a moment, all his composure disappears.']],final:['Choose the unknown with him, without a formula.','Promise to stay when the magic fades.','Let him see the parts of you that are still becoming.']},
  luca:{id:'luca',name:'Luca Bellamy',role:'The royal gardens keeper',tag:'THE GARDEN HEART',hair:'#a55e45',skin:'#ae765f',eyes:'#6c8c72',style:'curly',coat:'#3f6859',accent:'#d4c3b0',scene:'garden-scene',intro:'Vesper’s warm-hearted royal gardener knows every secret path and every flower that blooms after midnight. Luca makes everyone feel at home, though he has quietly forgotten how to make a home for himself.',quote:'“The roses only bloom at night this year. I thought I was the only one who still came to see them.”',places:['The moon garden','The glasshouse in the rain','The hidden orchard'],moments:[['Help him replant a stubborn moonflower.','Dirt smudges his cheek; his smile stays with you longer.'],['Ask what he wishes he could grow for himself.','His answer is a little dream he has never said aloud.'],['Tell him that caring for himself matters, too.','He looks at you as if you have given him permission.']],final:['Build a garden neither of you has to leave.','Tell him you want to grow toward the future together.','Take his hand beneath the first new bloom.']},
  idris:{id:'idris',name:'Idris Thorne',role:'The keeper of the city archives',tag:'THE INKBOUND SECRET',hair:'#20232b',skin:'#805344',eyes:'#bd725f',style:'tousled',coat:'#39445f',accent:'#d8bd8c',scene:'library-scene',intro:'A reserved archivist guards Vesper’s most dangerous stories, including one that seems to have your name written in its margins. Idris trusts books more readily than people, but he is beginning to make an exception.',quote:'“Your name appeared in a book written two hundred years ago. I was hoping you could explain that before the book does.”',places:['The sealed archive','The bell tower records room','The library after closing'],moments:[['Ask him to show you the page with your name.','He shares the truth—and the fear he has hidden beside it.'],['Bring him tea and let the silence settle.','He admits this is the first quiet evening he has enjoyed in weeks.'],['Invite him to write a story with an uncertain ending.','His careful smile is worth more than any answer.']],final:['Write a future no archive can predict.','Promise that he does not have to face the unknown alone.','Close the book and choose each other.']}
};
const friends={
 tavi:{id:'tavi',name:'Tavi Rowan',role:'The courier with a thousand stories',tag:'A FRIEND IN EVERY CORNER',hair:'#d8bd8c',skin:'#d7a47f',eyes:'#83a3a4',style:'bob',coat:'#b46d57',accent:'#e9cf9d',scene:'garden-scene',moments:[['Help deliver a mysterious parcel across the rooftops.','Tavi tells you the best shortcut—and a story for every turn.'],['Share a late-night snack on the bell tower steps.','The city feels smaller when someone laughs beside you.'],['Ask what Tavi wants, beyond being everyone’s helper.','For once, Tavi lets someone else take care of them.']]},
 nessa:{id:'nessa',name:'Nessa Quill',role:'The maker of enchanted maps',tag:'A MAP TO SOMEWHERE SAFE',hair:'#493448',skin:'#f0d4c2',eyes:'#8d789f',style:'long',coat:'#536b7d',accent:'#d6af91',scene:'library-scene',moments:[['Help test a map that changes with the moon.','Nessa trusts you with the one copy that has no marked destination.'],['Tell her about a place you miss.','She draws it from your words, and listens to the rest.'],['Offer to be her safe place when the road gets confusing.','Nessa’s careful smile turns into a real one.']]}
};
const skinColors=['#f5d9c5','#e8b99f','#d7a47f','#ae765f','#805344','#603f3b'];
const eyeColors=['#6c8c72','#83a3a4','#7f8eab','#8d789f','#bd725f','#46354d'];
const hairColors=['#30283e','#493448','#20232b','#a55e45','#d8bd8c','#d4c3b0'];
const hairStyles=['soft waves','tousled','long','bob','curly'];
const outfits={
 'Moonlit formal':['#82687b','#dfc7ae'],'Vesper academy':['#34455c','#c47d92'],'Garden casual':['#3f6859','#d4c3b0'],'Traveler’s cloak':['#743f4d','#d5a176'],
 'Starlight gown':['#4c527d','#ead6aa'],'Velvet soirée':['#75465e','#d8b77c'],'Rose court dress':['#9b5268','#f0d4c2'],'Midnight coat':['#29334d','#8296ad'],
 'Sunlit linen':['#b47f69','#f2dfc1'],'Wanderer layers':['#765b47','#c7a77b'],'Moonflower kimono':['#566e68','#d9b8cb'],'Celestial suit':['#41506c','#b9c9d8']
};
let voiceEnabled=false;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function hairSvg(style,color){
 const paths={
 'soft waves':`<path d="M77 179 Q60 62 148 47 Q250 42 228 177 L220 286 Q206 253 202 209 L198 145 Q165 173 109 153 Q99 214 82 268Z"/>`,
 'tousled':`<path d="M77 178 Q52 98 105 63 L90 40 L135 53 Q159 24 184 48 L211 39 L204 65 Q247 91 224 180 L212 252 L201 162 Q166 178 121 148 Q104 175 86 209Z"/>`,
 'long':`<path d="M77 174 Q62 53 148 47 Q241 45 226 179 L236 388 Q213 367 207 299 L200 150 Q166 172 109 151 Q99 260 79 369 L63 355Z"/>`,
 'bob':`<path d="M77 176 Q61 58 148 47 Q239 44 226 177 L217 257 Q204 238 202 150 Q163 176 108 150 Q101 212 83 255Z"/>`,
 'curly':`<path d="M72 178 Q51 151 66 124 Q48 89 83 76 Q80 39 118 51 Q139 22 161 48 Q194 23 207 59 Q248 63 228 108 Q247 142 224 176 L215 261 Q201 231 199 149 Q163 172 109 150 Q100 215 82 260Z"/><g fill="${color}"><circle cx="74" cy="125" r="23"/><circle cx="91" cy="79" r="24"/><circle cx="126" cy="54" r="23"/><circle cx="164" cy="52" r="24"/><circle cx="202" cy="76" r="23"/><circle cx="227" cy="124" r="23"/></g>`};
 return `<g class="hair-idle" fill="${color}">${paths[style]||paths['soft waves']}</g>`;
}
function personSvg(person,opts={}){
 const p={skin:person.skin||'#e8b99f',hair:person.hair||'#30283e',eyes:person.eyes||'#7f8eab',style:person.style||'soft waves',coat:person.coat||'#614c69',accent:person.accent||'#ddc59b',eyeShape:person.eyeShape||'almond'};
 const mood=opts.mood||'curious';
 const lashes=p.eyeShape==='round'?'M112 125 Q121 111 132 125 Q122 138 112 125 M169 125 Q180 111 190 125 Q180 138 169 125':'M111 126 Q122 117 133 126 Q122 136 111 126 M168 126 Q180 117 191 126 Q180 136 168 126';
 const brows=mood==='angry'||mood==='annoyed'?'M111 111 L136 103 M168 103 L191 111':mood==='worried'||mood==='hurt'?'M111 104 Q124 92 137 104 M166 104 Q179 92 191 104':mood==='happy'||mood==='excited'?'M112 105 Q123 99 135 104 M168 104 Q180 99 190 105':'M114 104 Q124 98 136 103 M168 103 Q181 98 190 104';
 const mouth=mood==='angry'||mood==='annoyed'?'M137 195 Q151 181 165 195':mood==='worried'?'M138 197 Q151 185 164 197':mood==='hurt'?'M138 197 Q151 190 164 197':mood==='happy'?'M136 184 Q151 205 167 184':mood==='excited'?'M136 182 Q151 211 167 182':mood==='shy'?'M141 189 Q151 193 161 189':'M137 187 Q151 196 165 186';
 return `<svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated character portrait">
 <defs><linearGradient id="coat-${opts.id||'x'}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${p.coat}"/><stop offset="1" stop-color="#26263b"/></linearGradient><linearGradient id="face-${opts.id||'x'}" x1="0" x2=".8" y1="0" y2="1"><stop stop-color="${p.skin}"/><stop offset="1" stop-color="${p.skin}"/></linearGradient></defs>
 <path d="M18 500 Q22 381 62 337 Q91 307 122 300 L178 300 Q220 313 246 348 Q279 390 286 500Z" fill="url(#coat-${opts.id||'x'})"/>
 <path d="M117 296 L150 357 L185 296 L203 315 L178 500 L122 500 L96 315Z" fill="${p.accent}" opacity=".8"/>
 <path d="M126 270 L180 270 L186 316 L151 353 L115 315Z" fill="#d5a58e"/>
 <path d="M92 124 Q91 72 150 69 Q212 70 210 128 L202 215 Q194 274 152 283 Q108 276 98 216Z" fill="url(#face-${opts.id||'x'})"/>
 <path d="M94 167 Q80 142 84 125 Q94 110 102 139 M207 164 Q224 140 217 125 Q207 111 199 139" fill="${p.skin}"/>
 ${hairSvg(p.style,p.hair)}
 <g class="eye-blink"><path d="${lashes}" fill="#30263b"/><ellipse cx="122" cy="126" rx="4.2" ry="5.1" fill="${p.eyes}"/><ellipse cx="180" cy="126" rx="4.2" ry="5.1" fill="${p.eyes}"/><circle cx="123" cy="124" r="1.5" fill="white"/><circle cx="181" cy="124" r="1.5" fill="white"/></g>
 <path d="M148 137 Q143 164 151 165" fill="none" stroke="#b87970" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="${mouth}" fill="none" stroke="#a95e67" stroke-width="2.3" stroke-linecap="round"/><path d="M135 205 Q151 211 166 204" fill="none" stroke="#d58e8c" stroke-width="2" opacity=".4"/>
 <path d="${brows}" fill="none" stroke="${p.hair}" stroke-width="5" stroke-linecap="round"/>
 <path d="M74 344 Q91 322 116 314 L150 355 L184 314 Q213 321 231 346 L215 378 Q191 361 175 361 L150 388 L125 361 Q104 361 88 379Z" fill="${p.coat}"/>
 <path d="M150 358 L137 377 L150 468 L163 377Z" fill="${p.accent}" opacity=".72"/><circle cx="150" cy="396" r="4" fill="${p.accent}"/><circle cx="150" cy="423" r="3" fill="${p.accent}" opacity=".7"/>
 </svg>`;
}
function avatarSvg(){const [coat,accent]=outfits[avatar.outfit]||outfits['Moonlit formal'];return personSvg({...avatar,coat,accent},{id:'player'})}
function setStage({scene='night-scene',location='THE BETWEEN',time='A NEW BEGINNING',caption='',chars=[]}={}){
 stage.classList.remove('night-scene','library-scene','garden-scene','prologue-art'); stage.classList.add(scene);
 $('#scene-location').textContent=location.toUpperCase(); $('#scene-time').textContent=time.toUpperCase();
 $('#stage-caption').style.display=caption?'block':'none'; $('#stage-caption').innerHTML=caption?caption:'';
 art.innerHTML=`<div class="water"></div><div class="city"></div><div class="character-shadow"></div>${chars.map((c,i)=>`<div class="char-illustration ${chars.length===1?'left':i===0?'left':'right'}" style="--idle-delay:${i*.8}s">${personSvg(c.person,{id:c.id,mood:c.mood||expressions[c.id]||'curious'})}</div>`).join('')}`;
}
function updatePreview(){
 const chars=Object.values(leads).map((p,i)=>({person:p,id:p.id}));
 setStage({scene:'night-scene',location:'A WORLD BETWEEN WORLDS',time:'YOUR STORY BEGINS HERE',chars,caption:'<span>AN ORIGINAL INTERACTIVE ROMANCE</span><strong>Somewhere between<br>who you were and who<br>you might become.</strong>'});
}
function swatches(colors,key){return `<div class="color-options">${colors.map(c=>`<button class="swatch ${avatar[key]===c?'selected':''}" data-key="${key}" data-color="${c}" style="background:${c}" aria-label="Select ${key} color ${c}" title="${c}"></button>`).join('')}</div>`}
function creator(){
 updatePreview();
 panel.innerHTML=`<div class="eyebrow">A romance written in the stars</div><h1 class="panel-title">Every great story<br>starts with a choice.</h1><p class="lead">A strange new world. Five unforgettable romances, plus friendships that grow into something lasting. Your story bends around the person you choose to be.</p>
 <div class="section-label">First, how did you get here?</div><div class="origin-grid">
 <button class="choice-card ${originChoice==='isekai'?'selected':''}" data-origin="isekai"><span class="choice-icon">✧</span><b>Another life</b><small>You woke in a world from a story you loved.</small></button>
 <button class="choice-card ${originChoice==='native'?'selected':''}" data-origin="native"><span class="choice-icon">☽</span><b>Born of this world</b><small>This is home. But something is changing.</small></button></div>
 <div class="creator-block"><div class="section-label">Your character</div><div class="form-row"><div class="field" style="flex:1.35"><label for="hero-name">Name</label><input id="hero-name" maxlength="18" placeholder="A name for your story" value="${esc(avatar.name)}"></div><div class="field"><label for="pronouns">Pronouns</label><select id="pronouns"><option ${avatar.pronouns==='she / her'?'selected':''}>she / her</option><option ${avatar.pronouns==='they / them'?'selected':''}>they / them</option><option ${avatar.pronouns==='he / him'?'selected':''}>he / him</option></select></div></div>
 <div class="section-label">Make them yours</div><div class="appearance-grid">
 <div class="field"><label>Skin tone</label>${swatches(skinColors,'skin')}</div>
 <div class="field"><label>Eye color</label>${swatches(eyeColors,'eyes')}</div>
 <div class="field"><label>Hair color</label>${swatches(hairColors,'hair')}</div>
 <div class="field"><label>Eye shape</label><select class="select-mini" id="eye-shape"><option>almond</option><option ${avatar.eyeShape==='round'?'selected':''}>round</option></select></div>
 <div class="field"><label>Hair style</label><select class="select-mini" id="hair-style">${hairStyles.map(x=>`<option ${avatar.hairStyle===x?'selected':''}>${x}</option>`).join('')}</select></div>
 <div class="field outfit-field"><label for="hero-outfit">Your outfit · 12 looks</label><select class="select-mini" id="hero-outfit">${Object.keys(outfits).map(x=>`<option ${avatar.outfit===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
 <div class="creator-foot"><div class="mini-avatar">${avatarSvg()}</div><span>Your look is part of the story. You can change it any time before you begin.</span></div>
 <button class="button-primary" id="begin">STEP INTO THE STORY <span>→</span></button></div>`;
 panel.scrollTop=0;
 panel.querySelectorAll('[data-origin]').forEach(b=>b.onclick=()=>{originChoice=b.dataset.origin;creator()});
 panel.querySelectorAll('.swatch').forEach(b=>b.onclick=()=>{avatar[b.dataset.key]=b.dataset.color;creator()});
 $('#hero-name').oninput=e=>avatar.name=e.target.value;
 $('#pronouns').onchange=e=>avatar.pronouns=e.target.value;
 $('#eye-shape').onchange=e=>avatar.eyeShape=e.target.value;
 $('#hair-style').onchange=e=>{avatar.hairStyle=e.target.value;creator()};
 $('#hero-outfit').onchange=e=>{avatar.outfit=e.target.value;creator()};
 $('#begin').onclick=()=>{if(!avatar.name.trim())avatar.name='Mira';avatar.name=avatar.name.trim();screen='prologue';chapter=0;updatePreview();render()};
}
const prologueOptions=[
 {title:'Follow the silver moth into the city.',sub:'Some things are easier to face when you follow the beautiful and impossible.',delta:1},
 {title:'Call out to the figure waiting beneath the bell tower.',sub:'If this is a dream, you might as well ask it a question.',delta:2},
 {title:'Find a way back to where you woke up.',sub:'You don’t know this place yet. You need to understand it first.',delta:1}
];
function playerPerson(){const [coat,accent]=outfits[avatar.outfit]||outfits['Moonlit formal'];return {...avatar,style:avatar.hairStyle,coat,accent}}
function currentChapter(){return route && leads[route]}
function stageForStory(location,time,sceneClass='night-scene'){
 const chars=screen==='friend'&&activeFriend?[{person:playerPerson(),id:'player'},{person:friends[activeFriend],id:activeFriend}]:route?[{person:playerPerson(),id:'player'},{person:currentChapter(),id:route}]:[{person:playerPerson(),id:'player'}];
 setStage({scene:sceneClass,location,time,chars});
}
function routeMenu(){
 stage.classList.add('night-scene');
 const chars=Object.values(leads).map(x=>({person:x,id:x.id}));
 setStage({scene:'night-scene',location:'THE CITY OF VESPER',time:'FIVE FATES, ONE THREAD',chars,caption:'<span>THE CITY OF VESPER</span><strong>Every heart has<br>its own gravity.</strong>'});
 panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">Chapter I · The city of Vesper</span><span class="chapter-count">01 / 04</span></div><h1 class="panel-title">A world that knows<br>your name.</h1><p class="story-text">${originChoice==='isekai'?`The bell tower rings thirteen times. You remember a book, a rainy afternoon, and a life that was yours. Here, in Vesper, ${esc(avatar.name)}, everyone insists you have always belonged.`:`The bell tower rings thirteen times. You know every crooked street in Vesper, every rumor in the market. But tonight, the stars are wrong—and the city seems to be holding its breath.`} A silver thread glimmers around your wrist, then vanishes.</p><p class="story-text">At the moonlit square, five strangers look up at exactly the same moment. Somehow, you know this is where your story turns.</p><div class="section-label">Whose story will you follow?</div><div class="route-cards">${Object.values(leads).map(l=>`<button class="route-card" data-route="${l.id}"><span class="route-avatar" style="background:linear-gradient(155deg,${l.accent}88,${l.coat})">${personSvg(l,{id:'card-'+l.id})}</span><span class="route-info"><b>${l.name}</b><small>${l.role}</small><span class="affinity"><span style="width:${Math.min(100,(affinity[l.id]+2)*18)}%"></span></span></span><span class="route-tag">${l.tag}</span></button>`).join('')}</div><p class="choice-note">Every choice shapes your connection. There are no wrong ways to care.</p><div class="section-label relationship-heading">And the friends who make Vesper home</div><div class="route-cards friend-cards">${Object.values(friends).map(f=>{const state=friendship[f.id];const tier=state.score>=6?'Best Friends':state.score>=3?'Close Friends':state.score>=1?'Friends':'Meet them';return `<button class="route-card friend-card" data-friend="${f.id}"><span class="route-avatar" style="background:linear-gradient(155deg,${f.accent}88,${f.coat})">${personSvg(f,{id:'card-'+f.id})}</span><span class="route-info"><b>${f.name}</b><small>${f.role}</small><span class="affinity"><span style="width:${Math.min(100,state.score*15)}%"></span></span></span><span class="route-tag">${tier}</span></button>`}).join('')}</div>`;
 panel.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{route=b.dataset.route;chapter=0;affinity[route]=affinity[route]||0;expressions.player='curious';expressions[route]='curious';screen='meeting';render()});
  panel.querySelectorAll('[data-friend]').forEach(b=>b.onclick=()=>{activeFriend=b.dataset.friend;chapter=0;screen='friend';render()});
}
function friendMoment(){
  const friend=friends[activeFriend], state=friendship[activeFriend];
  const tier=state.score>=6?'Best Friends':state.score>=3?'Close Friends':state.score>=1?'Friends':'New Friend';
  const moment=friend.moments[state.visits%friend.moments.length];
  stageForStory(friend.role,`A MOMENT WITH ${friend.name.toUpperCase()}`,friend.scene);
  const response=state.visits===0?`You meet ${friend.name} in the middle of Vesper’s latest bit of magical trouble. ${moment[1]}`:state.score>=6?`${friend.name} already knows they can count on you. Today, they have saved a quiet moment just for the two of you. ${moment[1]}`:`You find ${friend.name} again, and the conversation picks up as if no time has passed. ${moment[1]}`;
  panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">A friendship in Vesper</span><span class="chapter-count">${tier.toUpperCase()}</span></div><div class="speaker">${friend.name}</div><div class="dialogue">“I’m glad you came. The city feels a little less daunting when you’re around.”</div><p class="story-text">${response}</p><div class="section-label">How will you spend this moment?</div><div class="option-list">${friend.moments.map((m,i)=>`<button class="story-choice" data-friend-choice="${i}"><span class="choice-number">0${i+1}</span><span><b>${m[0]}</b><small>${m[1]}</small></span></button>`).join('')}</div><div class="stats-row"><span>YOUR FRIENDSHIP</span><span>${friend.name.toUpperCase()} · ${tier.toUpperCase()}</span></div><div class="affinity"><span style="width:${Math.min(100,state.score*15)}%"></span></div><button class="button-secondary" id="friend-back">← Back to Vesper</button>`;
  panel.querySelectorAll('[data-friend-choice]').forEach(b=>b.onclick=()=>{const i=+b.dataset.friendChoice;state.score+=i===2?2:1;state.visits++;expressions.player=['happy','curious','shy'][i];expressions[activeFriend]=['happy','curious','shy'][i];const next=state.score>=6?'Best Friends':state.score>=3?'Close Friends':'Friends';showToast(`${friend.name}: ${next}`);screen='meeting-select';render()});
  $('#friend-back').onclick=()=>{screen='meeting-select';render()};
}
function prologue(){
 stageForStory(originChoice==='isekai'?'THE BETWEEN':'VESPER · NORTH GATE','THE FIRST NIGHT');
 $('#stage-caption').style.display='none';
 const setup=originChoice==='isekai'?`The last thing you remember is ordinary: rain on glass, a page turning, the soft weight of sleep. Then the world folds like paper. You wake beneath a sky full of unfamiliar stars, a silver bell humming somewhere in the distance.`:`The book in your hands is older than the city. When you open it, the ink rearranges itself into a map of Vesper—your home, though you have never seen this page before. A single silver thread curls around your wrist.`;
 panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">Prologue · A thread appears</span><span class="chapter-count">00 / 04</span></div><h1 class="panel-title">${originChoice==='isekai'?'The world between.':'The page that changed.'}</h1><p class="story-text">${setup}</p><div class="speaker">A voice from the dark</div><div class="dialogue">“${originChoice==='isekai'?'If you can hear the bell, there is still a way home. If you can see the thread, there may be a reason to stay.':'The old stories are waking, little star. You can close the book—or find out what it wants from you.'}”</div><div class="section-label">What do you do?</div><div class="option-list">${prologueOptions.map((o,i)=>`<button class="story-choice" data-prologue="${i}"><span class="choice-number">0${i+1}</span><span><b>${o.title}</b><small>${o.sub}</small></span></button>`).join('')}</div>`;
 panel.querySelectorAll('[data-prologue]').forEach(b=>b.onclick=()=>{const i=+b.dataset.prologue;prologueChoice=prologueOptions[i].title;expressions.player=['curious','confident','worried'][i];Object.keys(affinity).forEach(k=>affinity[k]+=prologueOptions[i].delta===2?1:0);screen='meeting-select';render()});
}
function meeting(){
 const lead=currentChapter();
 stageForStory(lead.places[0],lead.role,lead.scene);
 panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">Chapter I · ${lead.role}</span><span class="chapter-count">01 / 04</span></div><div class="speaker">${lead.name}</div><div class="dialogue">${lead.quote}</div><p class="story-text">${lead.intro} The silver thread at your wrist brightens, connecting you for one breath, then dissolving into moonlight.</p><p class="story-text">${esc(avatar.name)}, the night is young. Where will the two of you go?</p><div class="section-label">Choose your first moment together</div><div class="option-list">${lead.moments.map((m,i)=>`<button class="story-choice" data-meet="${i}"><span class="choice-number">0${i+1}</span><span><b>${m[0]}</b><small>${m[1]}</small></span></button>`).join('')}</div><button class="button-secondary" id="choose-another">← Choose a different fate</button>`;
 panel.querySelectorAll('[data-meet]').forEach(b=>b.onclick=()=>{const i=+b.dataset.meet;affinity[route]+=i===0?1:2;expressions.player=['happy','curious','shy'][i];expressions[route]=['shy','worried','happy'][i];chapter=0;screen='route';render()});
 $('#choose-another').onclick=()=>{route=null;screen='meeting-select';render()};
}
function sceneChoice(){
 const lead=currentChapter();
 if(chapter>=3){ending();return}
 const names=['A small kindness','What you choose to reveal','A moment just for the two of you'];
 const intro=chapter===0?`The city settles into evening around you. ${lead.name.split(' ')[0]} walks at your side, their usual defenses a little less certain.`:chapter===1?`Night gathers over ${lead.places[chapter]}. A new piece of the silver thread has appeared, glowing faintly between you and ${lead.name.split(' ')[0]}.`:`At ${lead.places[chapter]}, the world seems to pause. Whatever happens next, you want to remember this version of the night.`;
 stageForStory(lead.places[chapter],chapter===0?'LATER THAT EVENING':chapter===1?'AFTER THE LAST BELL':'ONE MOMENT MORE',lead.scene);
 panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">Chapter ${chapter+2} · ${names[chapter]}</span><span class="chapter-count">0${chapter+2} / 04</span></div><p class="story-text">${intro}</p><div class="speaker">${lead.name}</div><div class="dialogue">${chapter===0?'“People usually ask me about the rumors. You’re the first person tonight who asked how I was.”':chapter===1?'“I thought I had the answer. Then you came along and made every question feel worth keeping.”':'“Whatever tomorrow brings, I’m glad this moment belongs to us.”'}</div><p class="story-text">The silver thread curls softly around your fingers. You feel it waiting—not for the right answer, but for <em>your</em> answer.</p><div class="section-label">${chapter===2?'How will you answer the moment?':'What do you choose?'}</div><div class="option-list">${lead.moments.map((m,i)=>{const copy=chapter===2?lead.final[i]:m[0];return `<button class="story-choice" data-action="${i}"><span class="choice-number">0${i+1}</span><span><b>${copy}</b><small>${chapter===2?'Let the moment speak for itself.':m[1]}</small></span></button>`}).join('')}</div><div class="stats-row"><span>YOUR CONNECTION</span><span>${lead.name.toUpperCase()}</span></div><div class="affinity"><span style="width:${Math.min(100,Math.max(14,affinity[route]*13))}%"></span></div>`;
 panel.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const i=+b.dataset.action;affinity[route]+=i===1?2:1;const playerMoods=[['happy','curious','excited'],['worried','happy','hurt'],['shy','hurt','excited']];const leadMoods=[['happy','annoyed','shy'],['curious','worried','excited'],['happy','shy','hurt']];expressions.player=playerMoods[chapter][i];expressions[route]=leadMoods[chapter][i];chapter++;if(chapter===3){showToast('The silver thread between you grows brighter.')}render()});
}
function ending(){
 const lead=currentChapter();
 const score=affinity[route]||0;const bright=score>=7;
 stageForStory('VESPER · UNDER THE STARS','YOUR STORY, STILL UNFOLDING',lead.scene);
 panel.innerHTML=`<div class="scene-kicker"><span class="eyebrow">The end of the beginning</span><span class="chapter-count">04 / 04</span></div><div class="ending-card"><div class="ending-icon">${bright?'✦':'✧'}</div><div class="eyebrow">${bright?'A constellation made for two':'A new star in the sky'}</div><h3>${bright?'Somewhere, together.':'A promise in the making.'}</h3><p>${bright?`The silver thread has become a constellation: two bright points, connected by a line that neither fate nor fear can erase. ${lead.name} reaches for your hand. This time, neither of you lets go.`:`The thread glimmers between you, not binding, just bright with possibility. ${lead.name} smiles and asks what you might discover together tomorrow. You already know you will say yes.`}</p></div><p class="story-text">“${bright?'When the whole world is still a mystery, I’m glad you are the part I know.':'This is not the end of our story. It is the part where we get to write it ourselves.'}”</p><div class="speaker">${lead.name} · ${lead.role}</div><div class="dialogue">You chose to ${prologueChoice.toLowerCase()} and found a heart that met yours halfway. Your journey through Vesper is only just beginning.</div><div class="stats-row"><span>CHAPTERS SHARED</span><span>04 &nbsp;·&nbsp; ${score} HEART MOMENTS</span></div><button class="button-primary" id="restart">BEGIN ANOTHER STORY <span>↻</span></button><div style="height:10px"></div><button class="button-secondary" id="new-route">Choose another heart</button>`;
 $('#restart').onclick=()=>{route=null;activeFriend=null;chapter=0;affinity={aster:0,ren:0,soren:0,luca:0,idris:0};friendship={tavi:{score:0,visits:0},nessa:{score:0,visits:0}};screen='creator';render()};
 $('#new-route').onclick=()=>{route=null;screen='meeting-select';render()};
}
function cast(){return {...leads,...friends}}
function allCast(){return Object.values(cast())}
function shootCast(){const [coat]=outfits[avatar.outfit]||outfits['Moonlit formal'];return [{id:'player',name:avatar.name||'You',coat},...allCast()]}
function characterById(id){return cast()[id]}
function home(){
 const lead=leads[interfaceLead];
 setStage({scene:lead.scene,location:'WELCOME TO VESPER',time:'YOUR STORY STARTS HERE',chars:[{person:lead,id:lead.id}],caption:`<span>EVER AFTER, ELSEWHERE</span><strong>A world of stories<br>waiting for you.</strong>`});
 panel.innerHTML=`<div class="eyebrow">A little magic. A lot of choices.</div><h1 class="panel-title">Welcome to<br>Ever After, Elsewhere.</h1><p class="lead">Choose the face that greets you in Vesper, then step into a story, check your in-world phone, or make a memory in the photo studio.</p><div class="section-label">Your interface companion</div><div class="home-lead-grid">${Object.values(leads).map(l=>`<button class="home-lead ${interfaceLead===l.id?'selected':''}" data-interface-lead="${l.id}" aria-pressed="${interfaceLead===l.id}"><span class="home-lead-portrait" style="background:linear-gradient(145deg,${l.accent}88,${l.coat})">${personSvg(l,{id:'home-'+l.id})}</span><b>${l.name}</b><small>${l.role}</small></button>`).join('')}</div><div class="home-actions"><button class="button-primary" id="home-story">${avatar.name?'CONTINUE YOUR STORY':'CREATE YOUR STORY'} <span>→</span></button><button class="button-secondary" data-go="phone">Open your phone · ${Object.values(inbox).reduce((n,m)=>n+m.length,0)} messages</button><button class="button-secondary" data-go="photoshoot">Visit the photo studio</button></div>`;
 panel.querySelectorAll('[data-interface-lead]').forEach(b=>b.onclick=()=>{interfaceLead=b.dataset.interfaceLead;home()});
 $('#home-story').onclick=()=>{if(avatar.name){screen='meeting-select'}else screen='creator';render()};
 panel.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{screen=b.dataset.go;render()});
}
function phone(){
 const people=allCast();
 if(phoneApp==='apps'){
  stageForPhone();
  panel.innerHTML=`<div class="phone-heading"><div><div class="eyebrow">VESPER MOBILE NETWORK</div><h1 class="panel-title">Your phone</h1></div><span class="phone-time">9:41 ☾</span></div><p class="story-text">A little window into the lives and places you’ve found in Vesper.</p><div class="phone-app-grid"><button data-app="messages"><i>✉</i><b>Messages</b><small>Write to someone in Vesper</small></button><button data-app="journal"><i>✧</i><b>Journal</b><small>Your story so far</small></button><button data-app="bonds"><i>♡</i><b>Connections</b><small>Romance & friendship</small></button><button data-app="camera"><i>▧</i><b>Photo studio</b><small>Make a Vesper memory</small></button></div><div class="section-label">Recent messages</div><div class="phone-recent">${people.slice(0,4).map(p=>{const msgs=inbox[p.id]||[];return `<button data-contact="${p.id}"><span class="contact-dot" style="background:${p.coat}">${p.name[0]}</span><span><b>${p.name}</b><small>${esc(msgs.length?msgs[msgs.length-1].text:'A new message is waiting when you are.')}</small></span><i>›</i></button>`}).join('')}</div>`;
  panel.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>{phoneApp=b.dataset.app;if(phoneApp==='camera'){screen='photoshoot'}render()});
  panel.querySelectorAll('[data-contact]').forEach(b=>b.onclick=()=>{phoneContact=b.dataset.contact;phoneApp='messages';openMessages()});
 }else if(phoneApp==='messages') messagesApp(); else if(phoneApp==='journal') journalApp(); else if(phoneApp==='bonds') bondsApp(); else {phoneApp='apps';phone()}
}
function stageForPhone(){setStage({scene:'library-scene',location:'VESPER · YOUR POCKET',time:'ALWAYS WITH YOU',chars:[{person:leads[interfaceLead],id:interfaceLead}],caption:'<span>CONNECTED IN VESPER</span><strong>Somewhere, someone<br>is thinking of you.</strong>'})}
function openMessages(){if(!inbox[phoneContact]){const p=characterById(phoneContact);inbox[phoneContact]=[{from:'them',text:`${p.name.split(' ')[0]} here. I was just thinking of you—how are you finding Vesper?`}]}messagesApp()}
function messagesApp(){
 stageForPhone();const p=characterById(phoneContact);if(!inbox[phoneContact]){openMessages();return}
 const history=inbox[phoneContact];
 panel.innerHTML=`<div class="phone-heading"><div><button class="text-back" id="phone-home">‹ All apps</button><div class="eyebrow">PRIVATE MESSAGES</div><h1 class="panel-title">${p.name}</h1></div><span class="contact-large" style="background:${p.coat}">${p.name[0]}</span></div><div class="contact-picker">${allCast().map(x=>`<button class="contact-chip ${x.id===p.id?'selected':''}" data-contact="${x.id}">${x.name.split(' ')[0]}</button>`).join('')}</div><div class="message-thread" id="message-thread">${history.map(m=>`<div class="message ${m.from==='you'?'sent':'received'}">${esc(m.text)}</div>`).join('')}</div><form class="message-compose" id="message-form"><label class="sr-only" for="message-text">Write a message</label><input id="message-text" maxlength="180" placeholder="Message ${p.name.split(' ')[0]}…" autocomplete="off" required><button type="submit" aria-label="Send message">➤</button></form><p class="phone-footnote">Messages are little story moments, saved on this device.</p>`;
 $('#phone-home').onclick=()=>{phoneApp='apps';phone()};panel.querySelectorAll('[data-contact]').forEach(b=>b.onclick=()=>{phoneContact=b.dataset.contact;openMessages()});
 $('#message-form').onsubmit=e=>{e.preventDefault();const input=$('#message-text'),text=input.value.trim();if(!text)return;history.push({from:'you',text});const first=p.name.split(' ')[0];const reply=/miss|love|like|heart/i.test(text)?`That means more than you know. I’m glad we found each other, ${avatar.name||'friend'}.`:/help|where|how/i.test(text)?`Meet me by the ${p.id==='aster'?'observatory':p.id==='soren'||p.id==='idris'?'library':'moon garden'} and I’ll tell you everything I can.`:`I’m glad you wrote. Vesper feels a little less strange when we can talk, ${first} here.`;history.push({from:'them',text:reply});messagesApp()};
 const thread=$('#message-thread');thread.scrollTop=thread.scrollHeight;
}
function journalApp(){
 stageForPhone();panel.innerHTML=`<button class="text-back" id="apps-back">‹ All apps</button><div class="eyebrow">A PERSONAL RECORD</div><h1 class="panel-title">${avatar.name?`${esc(avatar.name)}’s journal`:'Your journal'}</h1><p class="story-text">${avatar.name?`${esc(avatar.name)}, ${originChoice==='isekai'?'you arrived in Vesper from another life':'Vesper has always been home'}.`:'Your story has not begun yet.'} ${prologueChoice?`You chose to ${esc(prologueChoice.toLowerCase())}.`:''}</p><div class="journal-entry"><span>THE PEOPLE YOU’VE MET</span><p>${route?`Your story is unfolding with ${leads[route].name}.`:'Your next great meeting is waiting in the moonlit square.'}</p><p>${Object.entries(friendship).filter(([,v])=>v.visits).map(([id,v])=>`${friends[id].name}: ${v.score>=6?'Best Friends':v.score>=3?'Close Friends':'Friends'}`).join(' · ')||'Friendships are waiting to bloom.'}</p></div><button class="button-secondary" id="apps-back-bottom">Return to apps</button>`;
 $('#apps-back').onclick=$('#apps-back-bottom').onclick=()=>{phoneApp='apps';phone()};
}
function bondsApp(){
 stageForPhone();panel.innerHTML=`<button class="text-back" id="apps-back">‹ All apps</button><div class="eyebrow">THE THREADS BETWEEN YOU</div><h1 class="panel-title">Your connections</h1><div class="section-label">Romance</div><div class="bond-list">${Object.values(leads).map(l=>`<div><b>${l.name}</b><span>${l.id===route?'Your story':'A new possibility'}</span><i class="affinity"><span style="width:${Math.min(100,(affinity[l.id]+1)*16)}%"></span></i></div>`).join('')}</div><div class="section-label">Friendship</div><div class="bond-list">${Object.values(friends).map(f=>{const s=friendship[f.id];return `<div><b>${f.name}</b><span>${s.score>=6?'Best Friends':s.score>=3?'Close Friends':s.score>=1?'Friends':'Not met yet'}</span><i class="affinity"><span style="width:${Math.min(100,s.score*16)}%"></span></i></div>`}).join('')}</div>`;
 $('#apps-back').onclick=()=>{phoneApp='apps';phone()};
}
function photoshoot(){
 stage.classList.remove('photoshoot-stage','camera-portrait','camera-wide','camera-close-up','effect-soft-glow','effect-stardust','effect-dream-blur','effect-none','pose-together','pose-side-by-side','pose-looking-at-camera','pose-candid');
 const people=shootCast().filter(p=>shoot.characters.includes(p.id));
 const clothes=outfits[shoot.clothes]||outfits['Moonlit formal'];
 const charSpecs=people.map(p=>({person:p.id==='player'?{...playerPerson(),coat:clothes[0],accent:clothes[1]}:p,id:p.id}));
 const backgrounds={'Moon garden':'garden-scene','Star observatory':'night-scene','Old library':'library-scene','Lantern festival':'garden-scene'};
 setStage({scene:backgrounds[shoot.background],location:shoot.background,time:`${shoot.camera} VIEW · PHOTO STUDIO`,chars:charSpecs,caption:`<span>${shoot.effect.toUpperCase()} · ${shoot.pose.toUpperCase()}</span><strong>${shoot.characters.length===8?'All of Vesper':shoot.characters.length===1?'A moment to keep':'Together, in Vesper.'}</strong>`});
 stage.classList.add('photoshoot-stage',`camera-${shoot.camera.toLowerCase()}`,`effect-${shoot.effect.toLowerCase().replaceAll(' ','-')}`,`pose-${shoot.pose.toLowerCase().replaceAll(' ','-')}`);
 const symbol={'None':'','Silver hairpin':'✦','Flower crown':'❀','Moon halo':'☾','Round glasses':'◉'}[shoot.accessory];
 if(symbol)art.insertAdjacentHTML('beforeend',`<div class="photo-accessory" aria-hidden="true">${symbol}</div>`);
 panel.innerHTML=`<div class="eyebrow">VESPER · PHOTO STUDIO</div><h1 class="panel-title">Make a memory.</h1><p class="story-text">Set the scene, gather your favorite people, and frame a little moment together.</p><div class="section-label">Who’s in the picture? <small>Choose one, two, or everyone</small></div><div class="shoot-cast">${shootCast().map(p=>`<label class="shoot-person ${shoot.characters.includes(p.id)?'selected':''}"><input type="checkbox" data-shoot-person="${p.id}" ${shoot.characters.includes(p.id)?'checked':''}><span class="cast-initial" style="background:${p.coat}">${p.name[0]}</span><span>${p.name}</span></label>`).join('')}</div><div class="shoot-controls"><label>Pose<select data-shoot="pose">${['Together','Side by side','Looking at camera','Candid'].map(o=>`<option ${shoot.pose===o?'selected':''}>${o}</option>`).join('')}</select></label><label>Your outfit<select data-shoot="clothes">${Object.keys(outfits).map(o=>`<option ${shoot.clothes===o?'selected':''}>${o}</option>`).join('')}</select></label><label>Accessory<select data-shoot="accessory">${['None','Silver hairpin','Flower crown','Moon halo','Round glasses'].map(o=>`<option ${shoot.accessory===o?'selected':''}>${o}</option>`).join('')}</select></label><label>Background<select data-shoot="background">${Object.keys(backgrounds).map(o=>`<option ${shoot.background===o?'selected':''}>${o}</option>`).join('')}</select></label><label>Effect<select data-shoot="effect">${['Soft glow','Stardust','Dream blur','None'].map(o=>`<option ${shoot.effect===o?'selected':''}>${o}</option>`).join('')}</select></label><label>Camera view<select data-shoot="camera">${['Portrait','Wide','Close-up'].map(o=>`<option ${shoot.camera===o?'selected':''}>${o}</option>`).join('')}</select></label></div><div class="shoot-count">${shoot.characters.length} ${shoot.characters.length===1?'character':'characters'} in frame</div>`;
 panel.querySelectorAll('[data-shoot-person]').forEach(input=>input.onchange=()=>{if(input.checked){if(!shoot.characters.includes(input.dataset.shootPerson))shoot.characters.push(input.dataset.shootPerson)}else shoot.characters=shoot.characters.filter(id=>id!==input.dataset.shootPerson);if(!shoot.characters.length){shoot.characters=['player'];showToast('Choose at least one character for your photo')}photoshoot()});
 panel.querySelectorAll('[data-shoot]').forEach(select=>select.onchange=()=>{shoot[select.dataset.shoot]=select.value;photoshoot()});
}
function render(){panel.scrollTop=0;document.querySelectorAll('.game-nav [data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===screen||b.dataset.screen==='story'&&['creator','prologue','meeting-select','meeting','friend','route','ending'].includes(screen)));stage.classList.remove('photoshoot-stage','camera-portrait','camera-wide','camera-close-up','effect-soft-glow','effect-stardust','effect-dream-blur','effect-none','pose-together','pose-side-by-side','pose-looking-at-camera','pose-candid');switch(screen){case'home':home();break;case'phone':phone();break;case'photoshoot':photoshoot();break;case'creator':creator();break;case'prologue':prologue();break;case'meeting':meeting();break;case'meeting-select':routeMenu();break;case'friend':friendMoment();break;case'route':sceneChoice();break;case'ending':ending();break;default:home()}wireDialogueVoices()}
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2100)}
function playVoice(text,speaker,mood='curious'){
 if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance){showToast('Character voices are not supported by this browser');return}
 const synth=window.speechSynthesis; synth.cancel();
 const utterance=new SpeechSynthesisUtterance(text.replace(/[“”]/g,''));
 const available=synth.getVoices().filter(v=>/^en([-_]|$)/i.test(v.lang));
 if(available.length){let hash=0;for(const c of speaker)hash=(hash*31+c.charCodeAt(0))|0;utterance.voice=available[Math.abs(hash)%available.length]}
 const ids=Object.keys(cast()).concat('player'),index=Math.max(0,ids.indexOf(speaker));
 const emotion={happy:{rate:1.08,pitch:1.12},excited:{rate:1.16,pitch:1.2},shy:{rate:.92,pitch:1.08},worried:{rate:.9,pitch:.94},hurt:{rate:.84,pitch:.88},angry:{rate:1.12,pitch:.84},annoyed:{rate:1.03,pitch:.88},confident:{rate:1.02,pitch:1.04},curious:{rate:1,pitch:1}}[mood]||{rate:1,pitch:1};
 utterance.rate=emotion.rate;utterance.pitch=Math.max(.65,Math.min(1.5,emotion.pitch+(index%5)*.045));utterance.volume=1;synth.speak(utterance)
}
function wireDialogueVoices(){
 const available='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
 panel.querySelectorAll('.dialogue').forEach((dialogue,index)=>{
  const button=document.createElement('button');button.type='button';button.className='voice-line';button.textContent='▶ Hear this line';button.disabled=!available||!voiceEnabled;button.setAttribute('aria-label',`Hear dialogue ${index+1} aloud`);
  button.title=available?(voiceEnabled?'Play this character’s line':'Turn voices on to hear dialogue'):'Built-in speech is not supported in this browser';
  button.onclick=()=>{const speakerEl=dialogue.previousElementSibling?.classList.contains('speaker')?dialogue.previousElementSibling:null;const name=(speakerEl?.textContent||'A voice from Vesper').split(' · ')[0].trim();const id=Object.keys(cast()).find(key=>cast()[key].name===name)||'aster';playVoice(dialogue.textContent,name,expressions[id]||'curious')};
  dialogue.insertAdjacentElement('afterend',button)
 })
}
$('#sound-toggle').onclick=()=>{
 const button=$('#sound-toggle');voiceEnabled=!voiceEnabled;const label=button.querySelector('span');label.textContent=voiceEnabled?'ON':'OFF';button.setAttribute('aria-pressed',String(voiceEnabled));button.title=voiceEnabled?'Character voices are on':'Character voices are off';
 if(voiceEnabled){const dialogue=panel.querySelector('.dialogue');if(dialogue){const speakerEl=dialogue.previousElementSibling?.classList.contains('speaker')?dialogue.previousElementSibling:null;const name=(speakerEl?.textContent||'A voice from Vesper').split(' · ')[0].trim();const id=Object.keys(cast()).find(key=>cast()[key].name===name)||'aster';playVoice(dialogue.textContent,name,expressions[id]||'curious')}}else if('speechSynthesis'in window)window.speechSynthesis.cancel();
 panel.querySelectorAll('.voice-line').forEach(b=>b.disabled=!voiceEnabled);showToast(voiceEnabled?'Character voices enabled':'Character voices muted')
};
document.querySelectorAll('.game-nav [data-screen]').forEach(button=>button.onclick=()=>{const target=button.dataset.screen;if(target==='story')screen=avatar.name?'meeting-select':'creator';else screen=target;if(target==='phone')phoneApp='apps';render()});
render();
