# Minecraft OneDrive sync helper

This project aims to make it possible to synchronize your Minecraft games and
related data between computers using OneDrive.

This is a workaround for OneDrive not allowing you to add any folder path on
your system to it. Because of that, if you want to use OneDrive to sync Minecraft
we have to move some of the Minecraft folders into OneDrive's folder, then
create links to those folders from where they were originally, so that the
game can keep using them. This project will do the work of that for you.

# General notes before proceeding

⚠️ This software comes with no guarantees or warranty of usefulness
whatsoever and you run it at your own risk. Make regular backups!

ℹ️ OneDrive's Windows app can be flaky and I've noticed the game lagging
sometimes while it scans file changes. It's probably best to pause OneDrive
while you're playing. But don't forget to turn it back on afterwards.

😱 Don't play Minecraft on one machine until it's finished syncing from the
other machine first. And certainly don't play it on two machines at the same
time after using this tool.

# How to use it

Before doing anything: MAKE A BACKUP OF YOUR SAVES FOLDER. On Windows it's in
`.minecraft` which is in the `%AppData%` folder - type that into the Explorer
address bar and it will expand to the full path.

On all computers you want to keep Minecraft synchronized between, download the
`Linker.cmd` script from this repository.

On the computer that has the Minecraft installation you want to synchronize:

1. Move your Minecraft saves folder and/or screenshots folder into wherever you want to keep it/them in your OneDrive folder.
2. Run `Linker.cmd` by double-clicking it and answer the prompts.
3. Wait for the folder to finish uploading to OneDrive.

On the other computer(s):

1. Move any existing Minecraft saves folder and/or screenshots folder out of `%AppData%\.minecraft`.
2. Run `Linker.cmd` by double-clicking it and answer the prompts.
3. Wait for the folder to finish downloading from OneDrive.

Go mine and craft!

# Important note

The script will remind you to get OneDrive to always keep a local copy of
the folder (exempt it from Files On-Demand). If you don't there's a risk of
the game getting confused looking for files that aren't technically there.
Also, when switching between machines, YOU MUST wait for the game files to
sync up and then down again before starting to play.

# Putting things back how they were

Delete the `saves` and/or `screenshots` directory link[s] from the
`.minecraft` folder and move the real folder[s] back there. Obviously make
sure OneDrive has fully synchronized before you do that.