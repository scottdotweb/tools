# Minecraft OneDrive sync helper

This tool aims to make it possible to synchronize your Minecraft games and
related data between computers using OneDrive. 

Rather than the entire game installation folder, which is large and would take
time to keep synced, the tool sets up syncing for specific folders within it. At
present those are **mods**, **screenshots**, and **saves**, plus optionally two
folders used by the mod [Xaero's World Map](https://chocolateminecraft.com/worldmap.php)
because I use that.

## How it works
In an ideal world, you would be able to tell OneDrive to sync any old folder on
your PC, but it doesn't work that way. So the workaround is to move the folders
you want to sync into your OneDrive folder, and then create what Windows calls a
_directory junction_ at the original location, which points to the real location.
The game won't notice anything has changed. That's what this tool does for you.

## General notes before proceeding

⚠️ This software comes with no guarantee or warranty of usefulness and you run 
it at your own risk.

ℹ️ OneDrive's Windows app can be flaky and I've noticed the game lagging
sometimes while it scans file changes. It's probably best to pause OneDrive
while you're playing. But don't forget to turn it back on afterwards.

😱 Don't play Minecraft on one machine until it's finished syncing from the
other machine first. And certainly don't play it on two machines at the same
time after using this tool.

## How to use it

Before doing anything: MAKE A BACKUP OF THE FOLDERS YOU INTEND TO SYNC. On
Windows they're in `.minecraft`, which is in the `%AppData%` folder - enter that
into the Explorer address bar and it will expand to the full path.

On all computers you want to keep Minecraft synchronized between, [download the
`Linker.cmd`
script](https://raw.githubusercontent.com/scottdotjs/tools/main/minecraft-onedrive/Linker.cmd)
from this repository.

On the computer that has the Minecraft installation which you want to synchronize:

1. Move your Minecraft mods, saves, and/or screenshots folder into wherever you want to keep it/them in your OneDrive folder.
2. Run `Linker.cmd` by double-clicking it and answer the prompts.
3. Wait for the folder to finish uploading to OneDrive.

On the other computer(s):

1. Move any existing Minecraft mods, saves, and/or screenshots folders out of `%AppData%\.minecraft`.
2. Run `Linker.cmd` by double-clicking it and answer the prompts.
3. Wait for the folder to finish downloading from OneDrive.

Go mine and craft!

## Important note

The script will remind you to get OneDrive to always keep a local copy of the
folder where you moved your game folders - in other words exempt it from OneDrive's
_Files On-Demand_ feature, which moves your files off your computer and into the
cloud until you need to open them. If you don't, there's a risk of the game
getting confused looking for files that aren't there yet.

You do this by right-clicking the folder and choosing **Always keep
on this device** from the context menu:

![Screenshot of folder context menu with "Always keep on this device" selected](https://raw.githubusercontent.com/scottdotjs/tools/main/minecraft-onedrive/always_keep.png)

Also, when switching between machines, **you must** wait for the game files to
sync to OneDrive from the first and from OneDrive to the other before starting
to play.

This whole thing is kind of hacky so you do have to be a little careful, sorry.
But it works!

## Putting things back as they were

Delete the `mods`, `saves`, and/or `screenshots` directory link[s] from the
`.minecraft` folder and move the real folder[s] back there. Obviously, make
sure OneDrive has fully synchronized before you do that.

## Author and copyright

©️ 2024 [Scott Martin](https://github.com/scottdotjs/).