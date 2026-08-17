# Landing page photo strip

Drop images in this folder. Nothing else to do: the strip on the landing page
reads whatever is here, and nobody has to type filenames into code.

- Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`
- Order is filename order, so prefix to control it: `01-`, `02-`, `03-`
- Alt text is derived from the filename. `02-loading-dock.jpg` becomes
  "Loading dock", so name files like what they show rather than `IMG_4821.jpg`
- The strip does not render at all while this folder has no images in it

Timing: in production the folder is read when the site builds, so adding an
image means pushing a commit (Vercel rebuilds on push). In development it is
re-read on refresh.

Sizing: the frames are 4:3 and about 350px wide on a large screen. Anything
from roughly 1200x900 up looks right; much larger just costs bandwidth.

Photographs of the real operation are the goal here. EVER_WEBSITE_VISION.md is
specific about the kind: equipment on tables, hands sorting, pallets and
vehicles, the actual facility and team. Not stock photos of someone else's
warehouse.
