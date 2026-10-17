"""Create a lightweight ScriptsPlay sharing image from the site colours."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "social-marketplace.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

navy = "#0f172a"
blue = "#1e3a8a"
orange = "#f97316"
teal = "#14b8a6"
white = "#ffffff"

image = Image.new("RGB", (1200, 630), navy)
draw = ImageDraw.Draw(image)
font_dir = Path("C:/Windows/Fonts")
bold = font_dir / "arialbd.ttf"
regular = font_dir / "arial.ttf"
brand_font = ImageFont.truetype(str(bold), 45)
title_font = ImageFont.truetype(str(bold), 78)
small_font = ImageFont.truetype(str(regular), 29)
tag_font = ImageFont.truetype(str(bold), 20)

draw.rounded_rectangle((790, -100, 1240, 700), radius=150, fill=blue)
draw.ellipse((900, 63, 1180, 343), fill=orange)
draw.ellipse((895, 405, 1040, 550), fill=teal)
draw.rounded_rectangle((75, 71, 121, 117), radius=10, outline=orange, width=4)
draw.polygon([(93, 82), (93, 106), (111, 94)], fill=orange)
draw.text((139, 66), "ScriptsPlay", font=brand_font, fill=white)
draw.text((75, 212), "Find the talent.", font=title_font, fill=white)
draw.text((75, 306), "Make the moment.", font=title_font, fill=orange)
draw.text((78, 430), "Video  ·  Audio  ·  Performance", font=small_font, fill=white)
draw.rounded_rectangle((76, 520, 517, 571), radius=25, fill=teal)
draw.text((99, 531), "CREATIVE WORK, MADE POSSIBLE", font=tag_font, fill=navy)
image.save(OUT, optimize=True)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
