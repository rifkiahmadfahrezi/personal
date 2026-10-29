// Runs inline in <head>, before the bundle. Applies the saved theme first so the loader never flashes light. Then counts scripts, stylesheets, eager images and fonts as they
// finish, and writes the real percentage to --load on <html>. CSS renders the number (globals.css),
// so it ticks while React is still downloading. Fires "rf:loaded" when everything is in.
export const preloaderScript = `(function(){var d=document,r=d.documentElement;
try{var t=localStorage.getItem("theme")||"dark";if(t==="system")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";r.classList.add(t);r.style.colorScheme=t}catch(e){r.classList.add("dark")}
try{if(sessionStorage.getItem("rf-loaded")){r.classList.add("loaded");window.__rfDone=1;return}}catch(e){}
if(matchMedia("(prefers-reduced-motion: reduce)").matches){window.__rfDone=1;return}
r.classList.add("rf-loading");history.scrollRestoration="manual";scrollTo(0,0);
var max=0,done=0;function set(v){v=Math.round(v);if(v>max){max=v;r.style.setProperty("--load",v)}}
function finish(){if(done)return;done=1;set(100);window.__rfDone=1;dispatchEvent(new Event("rf:loaded"))}
function ratio(){var els=d.querySelectorAll("script[src],link[rel=stylesheet],img:not([loading=lazy])"),ok=0;
for(var i=0;i<els.length;i++){var el=els[i];if(el.tagName==="IMG"?el.complete:performance.getEntriesByName(el.src||el.href).length)ok++}
if(d.fonts&&d.fonts.status==="loaded")ok++;return ok/(els.length+1)}
function tick(){if(done)return;var complete=d.readyState==="complete";set(Math.min(ratio()*100,complete?100:96));
if(complete&&(!d.fonts||d.fonts.status==="loaded"))return finish();requestAnimationFrame(tick)}
requestAnimationFrame(tick);setTimeout(finish,8000)})()`;
