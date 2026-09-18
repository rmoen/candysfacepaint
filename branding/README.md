# Candy's Facepaint — brand assets

| File | What it is |
|---|---|
| `candys-facepaint-logo-original.png` | Original logo, 1152×1728, transparent (as delivered) |
| `candys-facepaint-logo-4x.png` | AI-upscaled 4× (4268×3500, transparent) — RealESRGAN on the aix RTX 3090. Use this for print / large format. |
| `candys-facepaint-kiosk-banner.png` | Co-branded Lark Booth kiosk banner, 600 DPI raster (5811×24709) |
| `candys-facepaint-kiosk-banner-24.6x104.6cm.pdf` | Same banner, print-ready PDF at true size (24.6 × 104.6 cm @ 600 DPI) |

## Notes
- Kiosk banner print area **24.6 × 104.6 cm** (kiosk seller MTTD Direct). Stand has a
  ~½" flange over left/right/bottom — the design is inset to clear it. White background
  for even backlit light-box diffusion.
- To re-upscale any logo: `larkbooth/tools/gpu-upscale.sh IN OUT` (RealESRGAN on aix).
- Candy's Facepaint = Lark Booth premier client #1 (farmers-market booth, weekly).
