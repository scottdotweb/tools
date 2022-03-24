# Playlist Entropy Repair Tool (PERT) for YouTube

## Description

When an entry on one of your YouTube playlists becomes unavailable, either through having been deleted or made private, the service will not only remove it from your playlist but also refuse to tell you what it was. The reasoning for this manifestly stupid behavior has never been provided, but the consequence is the same - you can't have any confidence in them as a tool for curation. If you didn't happen to make a record of what was in your playlist (and who does that?), when part of it goes missing years later you're screwed. This is where PERT comes in.

When you get an export of one of your playlists as JSON (instructions for that to come later), missing videos still have their ID included. Put one of those JSON files into PERT and it will use the video IDs to find captures of the video pages in the Internet Archive's [Wayback Machine](https://web.archive.org/). Those captures don't include the videos, but do have the video's title and upload date. With any luck, that information may be enough to help you find replacement copies to repair your playlist with.

## Installation

Eventually PERT will be a web app available in [my tools](https://scottdotjs.github.io/), but for now it runs on the command line.

* Clone [the tools repo](https://github.com/scottdotjs/tools)
* If you don't have [pnpm](https://pnpm.io) installed, `npm install -g pnpm`
* `cd tools/pert; pnpm install`

## Usage


`node pert.mjs <playlist JSON file name or path>`

If no file name or path is given PERT will default to `playlist.json`.

The results will be logged in the console.

## Author and license

Copyright 2022 [Scott Martin](https://github.com/scottdotjs).

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.