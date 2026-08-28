const c=(o,t)=>t===0?o:c(t,o%t),a=(o,t=20)=>{const r=Math.round(o*t);if(r===0)return"0";const s=c(r,t)||1,n=t/s;return n===1?`${r/s}`:`${r/s}/${n}`};export{a};
