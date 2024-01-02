@echo off

rem TODO: Backup stuff

set /p MapsOnedrivePath="Enter the path to the folder within your OneDrive folder where you'll keep XaeroWaypoints and XaeroWorldMap, not including the path to OneDrive itself (eg. Games\Minecraft\maps): "

if not defined MapsOnedrivePath (
	echo Please start again and enter something this time.
	pause
	exit
)

set MapsFullPath=%userprofile%\OneDrive\%MapsOnedrivePath%

rem TODO: Presumably we can test if it's a junction and that it points to
rem the right place, in which case we can exit as successful rather than unsure

if exist "%appdata%\.minecraft\XaeroWaypoints" (
	echo There's already a XaeroWaypoints in %appdata%\.minecraft, please check.
	pause
	exit
)

if exist "%appdata%\.minecraft\XaeroWorldMap" (
	echo There's already a XaeroWorldMap in %appdata%\.minecraft, please check.
	pause
	exit
)

if not exist "%MapsFullPath%\XaeroWaypoints" (
	echo There's no XaeroWaypoints folder at %MapsFullPath%, please check.
	pause
	exit
)

if not exist "%MapsFullPath%\XaeroWorldMap" (
	echo There's no XaeroWorldMap folder at %MapsFullPath%, please check.
	pause
	exit
)

mklink /J "%appdata%\.minecraft\XaeroWaypoints" "%MapsFullPath%\XaeroWaypoints"
mklink /J "%appdata%\.minecraft\XaeroWorldMap" "%MapsFullPath%\XaeroWorldMap"

chcp 65001 >nul

echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║ VERY IMPORTANT:                                                            ║
echo ║ Go to where the folder of your map data is, right-click it, and choose     ║
echo ║ "Always keep on this device". It might get corrupted if you don't!         ║
echo ╚════════════════════════════════════════════════════════════════════════════╝

pause
