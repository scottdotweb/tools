@echo off
Rem Workaround for .ps1 files not being clickable to run
PowerShell -NoExit -Command "Get-Content '%~dpnx0' | Select-Object -Skip 4 | Out-String | Invoke-Expression"
exit

function Exit-Prompt {
	Write-Host "Press enter to quit."
	$Host.UI.ReadLine()
	exit
}

function Get-Sync-Folder {
	Param ($DirectoryType)

	$prompt = "Inside your OneDrive folder, where are the folders you want to sync?`nDon't include the path to your OneDrive folder itself.`nFor example: Games/Minecraft`nEnter path"

	return Read-Host -Prompt $prompt
}

function Pin-If-Unpinned {
	Param($Path)

	# https://msdn.microsoft.com/en-us/library/windows/desktop/gg258117%28v=vs.85%29.aspx 
	$FILE_ATTRIBUTE_PINNED = 0x00080000 

	if (((Get-Item $Path).Attributes -band $FILE_ATTRIBUTE_PINNED) -eq 0) {
		Write-Host -NoNewline "Telling OneDrive to keep directory local... "

		attrib.exe $Path -U +P

		Write-Host "done."
	}
}

$SyncFolderLocalPath = Get-Sync-Folder

Write-Host $SyncFolderLocalPath

$FullSyncFolderPath = "$env:USERPROFILE\OneDrive\$SyncFolderLocalPath"

Pin-If-Unpinned $FullSyncFolderPath

Exit-Prompt
