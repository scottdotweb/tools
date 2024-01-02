@echo off

rem TODO: We can do the backup ourselves using xcopy after prompting for path

set /p HasBackup="Have you backed up your Minecraft saves folder? [y/n] "

if not "%HasBackup%"=="Y" if not "%HasBackup%"=="y" (
	echo Please back up your Minecraft folder first.
	pause
	exit
)

set /p SavesOnedrivePath="Enter the path to your Minecraft saves folder within your OneDrive folder, not including the path to OneDrive itself (eg. Games\Minecraft\saves): "

if not defined SavesOnedrivePath (
	echo Please start again and enter something this time.
	pause
	exit
)

set SavesFullPath=%userprofile%\OneDrive\%SavesOnedrivePath%

rem TODO: Presumably we can test if it's a junction and that it points to
rem the right place, in which case we can exit as successful rather than unsure

if exist "%appdata%\.minecraft\saves" (
	echo There's already a saves in %appdata%\.minecraft, please check.
	pause
	exit
)

if not exist %SavesFullPath% (
	echo There's no Minecraft saves folder at %SavesFullPath%, please check.
	pause
	exit
)

mklink /J "%appdata%\.minecraft\saves" "%SavesFullPath%"

chcp 65001 >nul

echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║ VERY IMPORTANT:                                                            ║
echo ║ Go to where your Minecraft saves folder is, right-click it, and choose     ║
echo ║ "Always keep on this device". It might get corrupted if you don't!         ║
echo ╚════════════════════════════════════════════════════════════════════════════╝

pause
