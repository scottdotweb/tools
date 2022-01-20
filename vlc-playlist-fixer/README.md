# VLC Playlist Fixer

When [VLC](https://www.videolan.org/vlc/) generates playlist (`.xspf`) files it specifies the paths to the videos absolutely, which means that they won't work if you move the folder with it in to another disk, which is ridiculous. This tool fixes that, plus removes a bunch of tags that aren't really useful.

Drag a playlist onto the box on the left (or use the file picker) tool to fix that, then click the icon that appears on the right to be prompted to save the fixed playlist.

Excerpt from a playlist before:

```
<track>
	<location>file:///C:/Users/scott/Videos/Cool%20Video.mp4</location>
	<title>Cool Video</title>
	<annotation>Some blah blah that was added by the application that created the video file</annotation>
	<duration>25710</duration>
	<extension application="http://www.videolan.org/vlc/playlist/0">
		<vlc:id>0</vlc:id>
	</extension>
</track>
```

And after:

```
<track>
	<location>Cool%20Video.mp4</location>
</track>
```

[You can try it out here.](https://scottdotjs.github.io/tools/vlc-playlist-fixer/)
