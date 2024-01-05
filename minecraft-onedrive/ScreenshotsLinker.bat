@echo off

rem TODO: Backup stuff

set /p ScreenshotsOnedrivePath="Enter the path to the folder within your OneDrive folder where you'll keep your screenshots folder, not including the path to OneDrive itself (eg. Games\Minecraft): "

if not defined ScreenshotsOnedrivePath (
	echo Please start again and enter something this time.
	pause
	exit
)

set ScreenshotsFullPath=%userprofile%\OneDrive\%ScreenshotsOnedrivePath%

rem TODO: Presumably we can test if it's a junction and that it points to
rem the right place, in which case we can exit as successful rather than unsure

if exist "%appdata%\.minecraft\screenshots" (
	echo There's already a screenshots in %appdata%\.minecraft, please check.
	pause
	exit
)

if not exist "%ScreenshotsFullPath%\screenshots" (
	echo There's no screenshots folder at %ScreenshotsFullPath%, please check.
	pause
	exit
)

mklink /J "%appdata%\.minecraft\screenshots" "%ScreenshotsFullPath%\screenshots"

chcp 65001 >nul

echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║ VERY IMPORTANT:                                                            ║
echo ║ Go to where the folder of your screenshots is, right-click it, and choose  ║
echo ║ "Always keep on this device". It might get corrupted if you don't!         ║
echo ╚════════════════════════════════════════════════════════════════════════════╝

pause
