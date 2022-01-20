# Renaming Script Generator

This tool allows you to generate a list of terminal commands for PowerShell, the old Windows command line (CMD.EXE), or Bash-type shells, to rename a list of files to a different list of files.

For example, you may have a group of video files that are the episodes of a TV show and want to rename them to have the episode titles in. In that case, put your file names in the box on the left:

```
Great.Series.Season.01.Episode.01.mkv
Great.Series.Season.01.Episode.02.mkv
Great.Series.Season.01.Episode.03.mkv
Great.Series.Season.01.Episode.04.mkv
Great.Series.Season.01.Episode.05.mkv
```

And your desired new file names in the middle box (without the file extension):

```
Great Series - S01E01 - The Adventure Begins
Great Series - S01E02 - More Characters
Great Series - S01E03 - Suddenly A Subplot
Great Series - S01E04 - Oh No, A Setback
Great Series - S01E05 - Cliffhanger Ending
```

The terminal commands will appear in the box on the right. In Bash that would look like:

```
mv "Great.Series.Season.01.Episode.01.mkv" "Great Series - S01E01 - The Adventure Begins.mkv"
mv "Great.Series.Season.01.Episode.02.mkv" "Great Series - S01E02 - More Characters.mkv"
mv "Great.Series.Season.01.Episode.03.mkv" "Great Series - S01E03 - Suddenly A Subplot.mkv"
mv "Great.Series.Season.01.Episode.04.mkv" "Great Series - S01E04 - Oh No, A Setback.mkv"
mv "Great.Series.Season.01.Episode.05.mkv" "Great Series - S01E05 - Cliffhanger Ending.mkv"
```

There's also a checkbox called "append new name to old", which can be of use if you just need to stick some text on the end of file names instead of completely changing them.

[You can try it out here.](https://scottdotjs.github.io/tools/renaming-script-generator/)
