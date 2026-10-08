#!/usr/bin/env python3
"""Riduce i font OFL conservando i glifi italiani e gli assi usati.
Passare una cartella node_modules con @fontsource-variable e @fontsource.
"""
from pathlib import Path
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]);output=root/'assets/fonts'
files=[('archivo',source/'@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2',{'wdth':(72,100),'wght':(400,800)}),('caveat',source/'@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2',{'wght':500}),('plex-mono',source/'@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',{})]
for name,path,axes in files:
 font=TTFont(path)
 if axes:font=instantiateVariableFont(font,axes,inplace=True)
 options=subset.Options();options.flavor='woff2';options.name_IDs=['*'];options.name_legacy=True;options.name_languages=['*']
 sub=subset.Subsetter(options=options);sub.populate(unicodes=list(range(0x20,0x100))+list(range(0x2000,0x2070))+list(range(0x2190,0x21a0)))
 sub.subset(font);font.flavor='woff2';p=output/f'{name}-latin.woff2';font.save(p);print(name,p.stat().st_size)
