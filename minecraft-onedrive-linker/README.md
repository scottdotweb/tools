# Minecraft OneDrive Linker

This Windows batch script will let you keep your Minecraft game data folder on
OneDrive and thus synchronized between different computers.

# How to use it

Before doing anything: MAKE A BACKUP OF YOUR MINECRAFT FOLDER. This script
comes with no guarantees! On Windows it's called `.minecraft` and is found in
the `%AppData%` folder. Type that into the Explorer address bar and it will
expand to the full path.

On the computer that has the Minecraft installation you want to synchronize:

1. Move your Minecraft folder into wherever you want to keep it in your OneDrive folder.
2. Run the script by double-clicking it and answer the prompts.
3. Wait for the folder to finish uploading to OneDrive.

On the other computer(s):

1. Move any existing Minecraft folder out of `%AppData%`.
2. Run the script by double-clicking it and answer the prompts.
3. Wait for the folder to finish downloading from OneDrive.

Go mine and craft!

# Important note

The script will tell you how to get OneDrive to always keep a local copy of the folder (exempt it from Files On-Demand). If you don't there's a risk of the game getting confused looking for files that aren't technically there. Also, when switching between machines, YOU MUST wait for the game files to sync up and then down again before starting to play.

# Putting things back how they were

Delete the `.minecraft` directory link in `%AppData%` and move the real folder back there. Obviously make sure it's fully synchronized before doing that.

# DISCLAIMER

This is a very hacky workaround for OneDrive not letting you add arbitrary file paths. This software comes with no guarantees or warranty of usefulness whatsoever and you run it at your own risk. Regularly back up your Minecraft folder!

