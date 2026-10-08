import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
 define: { __NETLIFY__: JSON.stringify(process.env.NETLIFY === 'true') },
 build: { target:'es2020', assetsInlineLimit:0, rollupOptions: { input: {
  main: fileURLToPath(new URL('./index.html', import.meta.url)),
  proposta: fileURLToPath(new URL('./proposta/index.html', import.meta.url))
 } } },
 plugins:[{
  name:'inline-styles-for-first-paint',
  enforce:'post',
  generateBundle(_,bundle){
   const html=bundle['index.html'];if(!html)return;
   html.source=String(html.source).replace(/<link[^>]+href="([^\"]+\.css)"[^>]*>/g,(tag,url)=>{
    const file=bundle[url.replace(/^\//,'')];
    return file?`<style>${file.source}</style>`:tag;
   });
  }
 }]
});
