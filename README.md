# Flow-Creative website

Static site: plain HTML, CSS and JavaScript. No build step.

## Folder structure

```
flow-creative-site/
├── index.html
├── favicon.ico
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── fonts/       self-hosted Anton and Inter Tight (no Google requests)
    ├── icons/       favicon and app icons
    ├── images/      og-image.jpg, the preview shown when the link is shared
    ├── videos/      looping work videos (silent, 20 sec max)
    └── posters/     first-frame image for each video (shown while it loads)
```

Upload the whole folder as is. The paths in `index.html` are relative, so keep the folder structure exactly the same.

## Video naming

Lowercase, words separated by hyphens, `brand-project.mp4`. Each video has a matching poster with the same name and `.jpg`.

| Project | Video | Poster |
|---|---|---|
| Johnnie Walker, Blue Label Elusive Umami | `assets/videos/jw-blue-label-elusive-umami.mp4` | `assets/posters/jw-blue-label-elusive-umami.jpg` |
| Johnnie Walker × James Jean, Year of the Dragon | `assets/videos/jw-james-jean-year-of-the-dragon.mp4` | `assets/posters/jw-james-jean-year-of-the-dragon.jpg` |
| Nike FC × Rocket League | `assets/videos/nike-fc-rocket-league.mp4` | `assets/posters/nike-fc-rocket-league.jpg` |
| Johnnie Walker × The Blend | `assets/videos/jw-the-blend.mp4` | `assets/posters/jw-the-blend.jpg` |
| Johnnie Walker, Black Label Whisky Desire | `assets/videos/jw-black-label-whisky-desire.mp4` | `assets/posters/jw-black-label-whisky-desire.jpg` |
| Mercedes-Benz, A-Series Celebrations | `assets/videos/mercedes-benz-a-series-celebrations.mp4` | `assets/posters/mercedes-benz-a-series-celebrations.jpg` |

To replace a video, keep the same file name and overwrite it. To add a new project, copy one `<a class="tile">` block in `index.html` and point it at the new file names.

Video specs used: H.264 MP4, no audio, 540p (720p for the Nike full-width tile), under 6 MB each.

## Legal pop-ups

Privacy, Cookies and Terms open as pop-ups from the footer. Their text lives in the three `<template>` blocks near the bottom of `index.html` (`tpl-privacy`, `tpl-cookies`, `tpl-terms`). Edit the text there.

The site sets no cookies and loads nothing from third parties (fonts are self-hosted), so no cookie banner is needed. If you ever add analytics or embeds (YouTube, Google Analytics, etc.), you will need a consent banner again and must update the Cookies Policy.

## Deploying

The repo must keep its `CNAME` file (it contains `flow-creative.nl`). GitHub Pages publishes automatically on every commit to `main`.
