@echo off
Rem Workaround for .ps1 files not being clickable to run
PowerShell -NoExit -Command "Get-Content '%~dpnx0' | Select-Object -Skip 4 | Out-String | Invoke-Expression"
goto :eof

<#

# TODO
function Backup-Check {
	Write-Host "Have you made a backup?"
	$DidBackup = (Read-Host).ToUpper()

	switch ($userResponse) {
		"Y" { }
		"N" { }
	}
}

#>

function Exit-Prompt {
	Write-Host "Press enter to quit."
	$Host.UI.ReadLine()
	exit
}

$ScreenshotsLinkPath = "$env:APPDATA\.minecraft\screenshots"

If (Test-Path $ScreenshotsLinkPath) {
	if ((Get-Item -Path $ScreenshotsLinkPath -Force).LinkType -eq "Junction") {
		$LinkTarget = (Get-Item $ScreenshotsLinkPath).Target

		Write-Host "There's already a link at $ScreenshotsLinkPath and it points to $LinkTarget. Do you need to use this script?"
		Exit-Prompt
	}

	Write-Host "There's already a folder at $ScreenshotsLinkPath, you need to move it to your OneDrive folder before running this script."
	Exit-Prompt
}

$ScreenshotsContainerPath = ''

function Get-Screenshots-Container-Path {
	$EnteredPath = Read-Host -Prompt "Enter the path to the folder within your OneDrive folder where you'll keep your screenshots folder, not including the path to OneDrive itself (eg. Games\Minecraft)"

	If ($EnteredPath -eq '') {
		$EnteredPath = Get-Screenshots-Container-Path
	}

	return $EnteredPath
}

$ScreenshotsContainerPath = Get-Screenshots-Container-Path

$ScreenshotsFullPath = "$env:USERPROFILE\OneDrive\$ScreenshotsContainerPath\screenshots"

If (-Not (Test-Path $ScreenshotsFullPath)) {
	Write-Host "The path $ScreenshotsFullPath doesn't exist, please check."
	Exit-Prompt
}

If (-Not (Test-Path -Path $ScreenshotsFullPath -PathType container)) {
	Write-Host "The path $ScreenshotsFullPath isn't a directory."
	Exit-Prompt
}

function make-junction {
	Param($link, $target)

	try {
	    New-Item -Path $link -ItemType Junction -Value $target | Out-Null
	}

	catch {
		Write-Host "Couldn't create a link, there was an error:"
		Write-Host $_
		Exit-Prompt
	}
}

make-junction $ScreenshotsLinkPath $ScreenshotsFullPath

Write-Host "Done."

Exit-Prompt
