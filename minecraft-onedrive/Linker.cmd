@echo off
Rem Workaround for .ps1 files not being clickable to run
PowerShell -NoExit -Command "Get-Content '%~dpnx0' | Select-Object -Skip 4 | Out-String | Invoke-Expression"
exit

$MinecraftDirectory = "$env:APPDATA\.minecraft"
$OneDriveDirectory = "$env:USERPROFILE\OneDrive"

$MadeLinks = $false
$ExitMessage = "Okay, bye!"

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

function Exit-If {
	Param($TestFunction, $ExitCondition)

	$TestResult, $ErrorMessage = & $TestFunction

	$ExitConditionMet = $false

	if ($ExitCondition -and $TestResult) {
		$ExitConditionMet = $true
	}

	if ((-not $ExitCondition) -and (-not $TestResult)) {
		$ExitConditionMet = $true
	}

	if ($ExitConditionMet) {
		Write-Host $ErrorMessage
		Exit-Prompt
	}

}

function Path-Exists {
	Param($TestPath)

	$result = Test-Path $TestPath

	return ,$result, "The path $TestPath doesn't exist, please check."
}

function Is-Container {
	Param($TestPath)

	$result = Test-Path -Path $TestPath -PathType container

	return ,$result,"The path $TestPath isn't a directory."
}

function Directory-Exists {
	Param($TestPath)

	$TestResult = $false

	if (Test-Path $TestPath) {
		if (Is-Container $TestPath) {
			if (-not ((Get-Item -Path $TestPath -Force).LinkType -eq "Junction")) {
				$TestResult = $true
			}
		}
	}

	return ,$TestResult,"There's already a folder at $TestPath, you need to move it to your OneDrive folder before running this script."
}

function Link-Exists {
	Param ($LinkPath)

	$TestResult = $false
	$ErrorMessage = ''

	if (Test-Path $LinkPath) {
		if ((Get-Item -Path $LinkPath -Force).LinkType -eq "Junction") {
			$LinkTarget = (Get-Item $LinkPath).Target

			$TestResult = $true
			$ErrorMessage = "There's already a link at $LinkPath and it points to $LinkTarget. Do you need to use this script?"
		}
	}

	return ,$TestResult,$ErrorMessage
}

function Get-Path {
	Param($PathQueryPrompt)

	$EnteredPath = Read-Host -Prompt $PathQueryPrompt

	if ($EnteredPath -eq '') {
		$EnteredPath = Get-Path $PathQueryPrompt
	}

	return $EnteredPath
}

function Make-Junction {
	Param($LinkPath, $LinkTarget)

	try {
	    New-Item -Path $LinkPath -ItemType Junction -Value $LinkTarget | Out-Null
	}

	catch {
		Write-Host "Couldn't create a link, there was an error:"
		Write-Host $_
		Exit-Prompt
	}
}

function Get-Path-Prompt {
	Param ($DirectoryType)

	return "Enter the path to the $DirectoryType folder within your OneDrive folder, not including the path to OneDrive itself (eg. Games\Minecraft\$DirectoryType)"
}

function Make-Link {
	Param($LinkType)

	$LinkPath = "$MinecraftDirectory\$LinkType"

	Exit-If { Directory-Exists $LinkPath } $true
	Exit-If { Link-Exists $LinkPath } $true

	$LocalPath = Get-Path $(Get-Path-Prompt $LinkType)
	$FullPath = "$OneDriveDirectory\$LocalPath"

	Exit-If { Path-Exists $FullPath } $false
	Exit-If { Is-Container $FullPath } $false

	Make-Junction $LinkPath $FullPath
}

function Prompt-Link-Type {
	Param($LinkType, $DefaultChoice)

	Write-Host "Do you want to link your $LinkType folder? [y/n] [default: $DefaultChoice]"

	$DoLink = (Read-Host).ToLower()

	if ($DoLink -eq "") { $DoLink = $DefaultChoice }

	switch ($DoLink) {
		"y" {
			Make-Link $LinkType
			$global:MadeLinks = $true
		}

		"n" { return }
	}
}

# ----------------------------------------------------------------------------

# TODO: hash(?) of folder names with labels for nicer phrasing

Prompt-Link-Type "mods" "y"
Prompt-Link-Type "saves" "y"
Prompt-Link-Type "screenshots" "y"
Prompt-Link-Type "XaeroWaypoints" "n"
Prompt-Link-Type "XaeroWorldMap" "n"

if ($MadeLinks) {
	$ExitMessage = "Done. IMPORTANT: Make sure the Minecraft folder in your OneDrive with these folders is set to 'always keep on this device'."
}

Write-Host $ExitMessage
Exit-Prompt
