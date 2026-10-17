from pathlib import Path
import base64
from PIL import Image
p=Path(__file__).parent/'dist'/'assets'
im=Image.open(p/'logo.png')
w,h=im.size
source=base64.b64encode((p/'logo.png').read_bytes()).decode('ascii')
# Native SVG filter preserves the exact source letterforms. White background
# becomes zero alpha; ink becomes white with its original antialiasing.
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs><filter id="reverse" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -0.333333 -0.333333 -0.333333 0 1"/><feComponentTransfer><feFuncA type="linear" slope="1.6" intercept="0"/></feComponentTransfer></filter></defs>
<image width="{w}" height="{h}" href="data:image/png;base64,{source}" filter="url(#reverse)"/>
</svg>'''
(p/'logo-white.svg').write_text(svg,encoding='utf-8')
b=Path(__file__).parent/'build.mjs'
s=b.read_text(encoding='utf-8').replace('assets/logo-white.png','assets/logo-white.svg')
s=s.replace('<link href="styles.css" rel="stylesheet">','<link href="styles.css" rel="stylesheet"><link href="type-system.css" rel="stylesheet">') if 'href="type-system.css"' not in s else s
s=s.replace('The small details. The bigger picture.</h2>','Metalwork, with character.</h2>')
s=s.replace('A bold trade identity with oversized Noto Sans headlines, custom product-profile diagrams and architectural project features.','A bold trade identity with a photographic workshop hero, clear Noto Sans headlines, custom product-profile diagrams and architectural project features.')
b.write_text(s,encoding='utf-8')
