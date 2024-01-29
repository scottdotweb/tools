@echo off
Rem Workaround for .ps1 files not being clickable to run
PowerShell -NoExit -Command "Get-Content '%~dpnx0' | Select-Object -Skip 4 | Out-String | Invoke-Expression"
exit

$GameDirectoryPath     = "$env:APPDATA\.minecraft"
$OneDriveDirectoryPath = "$env:USERPROFILE\OneDrive"

$syncItems = [ordered]@{
	mods = @{
		sync = 'y'
		label = 'mods'
		path = ''
	}
	saves = @{
		sync = 'y'
		label = 'saved games'
		path = ''
	}
	screenshots = @{
		sync = 'y'
		label = 'screenshots'
		path = ''
	}
	XaeroWaypoints = @{
		sync = 'n'
		label = "Xaero's World Map waypoints"
		path = ''
	}
	XaeroWorldMap = @{
		sync = 'n'
		label = "Xaero's World Map data"
		path = ''
	}
}

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

	return ,$TestResult,"There's already a folder at: $TestPath`nYou need to move it to your OneDrive folder before running this script."
}

function Link-Exists {
	Param ($LinkPath)

	$TestResult = $false
	$ErrorMessage = ''

	if (Test-Path $LinkPath) {
		if ((Get-Item -Path $LinkPath -Force).LinkType -eq "Junction") {
			$LinkTarget = (Get-Item $LinkPath).Target

			$TestResult = $true
			$ErrorMessage = "There's already a link at: $LinkPath`nIt points to: $LinkTarget`nDo you need to use this script?"
		}
	}

	return ,$TestResult,$ErrorMessage
}

function Confirm-Path {
	Param($EnteredPath)

	$Confirmed = (Read-Host -Prompt "You entered:`n$EnteredPath`nIs this correct? [y/n]").ToLower()

	if ($Confirmed -eq 'y') {
		return $true
	} elseif ($Confirmed -eq 'n') {
		return $false
	} else {
		$Confirmed = Confirm-Path $EnteredPath
	}
}

function Pin-If-Unpinned {
	Param($Path)

	# https://msdn.microsoft.com/en-us/library/windows/desktop/gg258117%28v=vs.85%29.aspx 
	$FILE_ATTRIBUTE_PINNED = 0x00080000 

	if (((Get-Item $Path).Attributes -band $FILE_ATTRIBUTE_PINNED) -eq 0) {
		Write-Host -NoNewline "Telling OneDrive to keep directory local... "

		# TODO: This is just not working. Why?
		attrib.exe -u +p $Path /d /s

		Write-Host "done."
	}
}

function Get-Sync-Folder-Local-Path {
	$prompt = "Inside your OneDrive folder, where are the folders you want to sync?`nDon't include the path to your OneDrive folder itself.`nFor example: Games\Minecraft`nEnter path"

	# TODO: Accept and convert slashes in path

	$EnteredPath = Read-Host -Prompt $prompt

	if (Confirm-Path $EnteredPath) {
		return $EnteredPath
	} else {
		$EnteredPath = Get-Sync-Folder-Local-Path
	}

}

function Get-Sync-Folder-Path {
	Param ($DirectoryType)

	$SyncFolderLocalPath = Get-Sync-Folder-Local-Path

	$SyncFolderFullPath = "$OneDriveDirectoryPath\$SyncFolderLocalPath"

	# TODO: Allow entering again

	Exit-If { Path-Exists  $SyncFolderFullPath } $false
	Exit-If { Is-Container $SyncFolderFullPath } $false

	# TODO: Not currently working
	# Pin-If-Unpinned $SyncFolderFullPath

	Write-Host "Important!`nAfter this script is finished, right-click that folder and choose 'Always keep on this device'."

	return $SyncFolderFullPath
}

function Set-Sync-Choice {
	Param($LinkType)

	$DefaultChoice =  $syncItems[$LinkType]['sync']
	$LinkTypeLabel = $syncItems[$LinkType]['label']

	Write-Host "Do you want to link your $LinkTypeLabel folder? [y/n] [default: $DefaultChoice]"

	$SyncChoice = (Read-Host).ToLower()

	if ($SyncChoice -eq "") {
		$SyncChoice = $DefaultChoice
	} elseif (($SyncChoice -ne 'y') -and ($SyncChoice -ne 'n')) {
		Set-Sync-Choice $LinkType
	} else {
		$syncItems[$LinkType]['sync'] = $SyncChoice
	}

	# TODO: offer choice to skip error or exit

	if ($SyncChoice -eq 'y') {
		$LinkPath = "$GameDirectoryPath\$LinkType"

		Exit-If { Directory-Exists $LinkPath } $true
		Exit-If { Link-Exists $LinkPath } $true

		$LinkTargetPath = "$SyncFolderPath\$LinkType"

		Exit-If { Path-Exists $LinkTargetPath } $false
		Exit-If { Is-Container $LinkTargetPath } $false
	}
}

function Make-Link {
	Param($LinkPath, $LinkTargetPath)

	try {
		New-Item -Path $LinkPath -ItemType Junction -Value $LinkTargetPath | Out-Null
	}

	catch {
		Write-Host "Couldn't create a link, there was an error:"
		Write-Host $_
		Exit-Prompt
	}
}

# ----------------------------------------------------------------------------

$SyncFolderPath = Get-Sync-Folder-Path

foreach ($LinkType in $syncItems.keys) {
	Set-Sync-Choice $LinkType
}

foreach ($LinkType in $syncItems.keys) {
	$LinkPath = "$GameDirectoryPath\$LinkType"
	$LinkTargetPath = "$SyncFolderPath\$LinkType"

	$LinkTypeLabel = $syncItems[$LinkType]['label']

	Write-Host -NoNewLine "Linking $LinkTypeLabel folder... "
	Make-Link $LinkPath $LinkTargetPath
	Write-Host "done."
}

Exit-Prompt
