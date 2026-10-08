#!/usr/bin/env python3
"""Prepara immagini responsive allineate e schizzi. Non modifica gli originali.
Uso: python scripts/prepara-immagini.py [--salvia-box x,y,w,h]
Il box è normalizzato 0..1 e verificato sull'immagine dopo EXIF transpose.
"""
from pathlib import Path
import argparse, json, math
import cv2
import numpy as np
from PIL import Image, ImageOps, ImageDraw
import pillow_avif  # registra il codec AVIF
ROOT = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser()
p.add_argument('--salvia-box', default='0.646,0.454,0.053,0.026')
args = p.parse_args()
BOX = tuple(map(float, args.salvia_box.split(',')))
if len(BOX) != 4 or any(v < 0 or v > 1 for v in BOX): p.error('Box normalizzato non valido')
OUT = ROOT / 'assets/immagini'; OUT.mkdir(parents=True, exist_ok=True)
PAPER = np.array([241,236,226], dtype=np.float32)
GRAPHITE = np.array([38,36,33], dtype=np.float32)

def pencil(rgb, textured):
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    if textured:
        gray = cv2.medianBlur(gray, 7)
        for _ in range(3): gray = cv2.bilateralFilter(gray, 9, 45, 45)
    gray = cv2.createCLAHE(clipLimit=2, tileGridSize=(8,8)).apply(gray)
    inverse_blur = cv2.GaussianBlur(255-gray, (0,0), 4)
    dodge = np.minimum(gray.astype(np.float32)*255 / np.maximum(255-inverse_blur.astype(np.float32), 1), 255)/255
    tone = np.power(dodge, 1.8)
    dark = 1-tone
    if textured:
        edges = cv2.Canny(gray, 15, 45)/255
        yy,xx = np.indices(gray.shape)
        hatch = ((xx+yy)%7 < 1).astype(np.float32)
        hatch *= np.clip((150-gray.astype(float))/150,0,1)*.65
        dark = np.maximum.reduce([dark, edges*.76, hatch])
    rng = np.random.default_rng(24)
    texture = rng.normal(0,.75,gray.shape)[...,None]
    return np.clip(PAPER-(PAPER-GRAPHITE)*dark[...,None]+texture,0,255).astype('uint8')

def export(im, stem, long):
    for width in (800,1400,1800):
        if width>long: continue
        # Le immagini verticali mantengono il lato lungo indicato nel nome.
        resized=ImageOps.contain(im,(width,width),Image.Resampling.LANCZOS)
        for ext,quality in [('avif',54),('webp',79),('jpg',85)]:
            opts={'quality':46 if ext=='avif' and stem.endswith('-schizzo') else quality}
            if ext=='jpg': opts.update(optimize=True,progressive=True)
            if ext=='avif': opts.update(speed=6)
            resized.save(OUT/f'{stem}-{width}.{ext}',**opts)

previews=[];manifest={}
for name in ('villa','fronte','sbalzo','pozzo','salvia'):
    im=ImageOps.exif_transpose(Image.open(ROOT/f'assets/originali/{name}.jpg')).convert('RGB')
    if name=='salvia':
        x,y,w,h=BOX;W,H=im.size
        rect=(round(x*W),round(y*H),round((x+w)*W),round((y+h)*H))
        rgb=np.array(im);x1,y1,x2,y2=rect
        patch=rgb[y1:y2,x1:x2].copy()
        rgb[y1:y2,x1:x2]=cv2.GaussianBlur(patch,(0,0),max(12,(x2-x1)/8))
        im=Image.fromarray(rgb)
    long=1800 if name in ('villa','fronte') else 1400
    im=ImageOps.contain(im,(long,long),Image.Resampling.LANCZOS)
    sketch=Image.fromarray(pencil(np.array(im),name in ('sbalzo','pozzo')))
    export(im,name,long);export(sketch,name+'-schizzo',long)
    manifest[name]={'width':im.width,'height':im.height,'longSide':long,'widths':[round(im.width*s/long) for s in (800,1400,1800) if s<=long]}
    previews.append((name,im,sketch))
    if name=='villa':
        (ROOT/'public').mkdir(exist_ok=True)
        ImageOps.fit(im,(1200,630),Image.Resampling.LANCZOS).save(ROOT/'public/og-tratto.jpg',quality=84,optimize=True)
        rgb=np.array(im.resize((1000,667),Image.Resampling.LANCZOS))
        edges=cv2.Canny(cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY),60,130)
        lines=cv2.HoughLinesP(edges,1,np.pi/180,threshold=40,minLineLength=35,maxLineGap=12)
        selected=[];keys=[]
        raw=[] if lines is None else lines.reshape(-1,4).tolist()
        for x1,y1,x2,y2 in sorted(raw,key=lambda l: math.hypot(l[2]-l[0],l[3]-l[1]),reverse=True):
            dx=float(x2-x1);dy=float(y2-y1);length=math.hypot(dx,dy)
            theta=math.atan2(dy,dx)%math.pi;dist=(x1+x2)/2*(-math.sin(theta))+(y1+y2)/2*math.cos(theta)
            if any(min(abs(theta-a),math.pi-abs(theta-a))<.035 and abs(dist-d)<9 for a,d in keys):continue
            keys.append((theta,dist));ux=dx/length*8;uy=dy/length*8
            selected.append([round(float(x1)-ux,2),round(float(y1)-uy,2),round(float(x2)+ux,2),round(float(y2)+uy,2)])
            if len(selected)==100:break
        (ROOT/'src/data/villa-lines.json').write_text(json.dumps({'viewBox':'0 0 1000 667','lines':selected},indent=2))
        print(f'villa: {len(selected)} segmenti')
    print(f'{name}: {im.size}, foto e schizzo allineati')
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
sheet=Image.new('RGB',(1200,5*340),tuple(PAPER.astype('uint8')));draw=ImageDraw.Draw(sheet)
for i,(name,photo,sketch) in enumerate(previews):
    for col,img in enumerate((photo,sketch)):
        thumb=ImageOps.contain(img,(580,300));sheet.paste(thumb,(col*600+(600-thumb.width)//2,i*340))
    draw.text((20,i*340+310),name+' / fotografia',fill='#262421');draw.text((620,i*340+310),name+' / schizzo',fill='#262421')
sheet.save(OUT/'anteprima-schizzi.jpg',quality=88)
print('Anteprima: assets/immagini/anteprima-schizzi.jpg')
