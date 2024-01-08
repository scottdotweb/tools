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

function Get-Screenshots-Container-Path {
	$EnteredPath = Read-Host -Prompt "Enter the path to the folder within your OneDrive folder where you'll keep your screenshots folder, not including the path to OneDrive itself (eg. Games\Minecraft)"

	if ($EnteredPath -eq '') {
		$EnteredPath = Get-Screenshots-Container-Path
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

# ---------------------------------------------------------------------------

$ScreenshotsLinkPath = "$env:APPDATA\.minecraft\screenshots"
$ScreenshotsContainerPath = ''

Exit-If { Directory-Exists $ScreenshotsLinkPath } $true
Exit-If { Link-Exists $ScreenshotsLinkPath } $true

$ScreenshotsFullPath = "$env:USERPROFILE\OneDrive\$(Get-Screenshots-Container-Path)\screenshots"

Exit-If { Path-Exists $ScreenshotsFullPath } $false

Exit-If { Is-Container $ScreenshotsFullPath } $false

Make-Junction $ScreenshotsLinkPath $ScreenshotsFullPath

Write-Host "Done."

Exit-Prompt
