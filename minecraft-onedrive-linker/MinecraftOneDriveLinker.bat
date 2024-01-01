@echo off

set /p HasBackup="Have you backed up your Minecraft folder? [y/n] "

if not "%HasBackup%"=="Y" if not "%HasBackup%"=="y" (
	echo Please back up your Minecraft folder first.
	pause
	exit
)

set /p MinecraftFolderLocation="Enter the path to your Minecraft folder within your OneDrive folder, not including the path to OneDrive itself (eg. path\to\folder): "

if not defined MinecraftFolderLocation (
	echo Please start again and enter something this time.
	pause
	exit
)

set MinecraftFolderPath=%userprofile%\OneDrive\%MinecraftFolderLocation%\.minecraft

if exist "%appdata%\.minecraft" (
	echo There's already a .minecraft in %appdata%, please check.
	pause
	exit
)

if not exist %MinecraftFolderPath% (
	echo There's no Minecraft folder at %MinecraftFolderPath%, please check.
	pause
	exit
)

mklink /J "%appdata%\.minecraft" "%userprofile%\OneDrive\%MinecraftFolderLocation%\.minecraft"

chcp 65001 >nul

echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║ VERY IMPORTANT:                                                            ║
echo ║ Go to where your Minecraft folder is, right-click it, and choose           ║
echo ║ "Always keep on this device". It might get corrupted if you don't!         ║
echo ╚════════════════════════════════════════════════════════════════════════════╝

pause
