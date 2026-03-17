#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$AgBase = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity\resources\app'
$AgWbDir = Join-Path $AgBase 'out\vs\code\electron-browser\workbench'
$AgPanelDir = Join-Path $AgBase 'extensions\antigravity'

$SrcDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SrcWb = Join-Path $SrcDir 'auto-retry.js'
$SrcPanel = Join-Path $SrcDir 'auto-retry-panel.js'

if (-not (Test-Path $SrcWb) -or -not (Test-Path $SrcPanel)) {
    Write-Error "Missing source scripts in $SrcDir`nExpected: auto-retry.js and auto-retry-panel.js"
    exit 1
}

if (-not (Test-Path $AgBase)) {
    Write-Error "Antigravity not found at $AgBase"
    exit 1
}

# Backup targets (once)
$wbHtml = Join-Path $AgWbDir 'workbench.html'
$wbBak  = "$wbHtml.bak"
if ((Test-Path $wbHtml) -and -not (Test-Path $wbBak)) {
    Copy-Item $wbHtml $wbBak
    Write-Host "Backed up workbench.html"
}

$panelHtml = Join-Path $AgPanelDir 'cascade-panel.html'
$panelBak  = "$panelHtml.bak"
if ((Test-Path $panelHtml) -and -not (Test-Path $panelBak)) {
    Copy-Item $panelHtml $panelBak
    Write-Host "Backed up cascade-panel.html"
}

# Copy scripts
Copy-Item $SrcWb (Join-Path $AgWbDir 'auto-retry.js') -Force
Copy-Item $SrcPanel (Join-Path $AgPanelDir 'auto-retry-panel.js') -Force
Write-Host "Copied auto-retry scripts."

# Inject script tags if missing
if (Test-Path $wbHtml) {
    $content = Get-Content $wbHtml -Raw
    if ($content -notmatch 'auto-retry\.js') {
        $content = $content -replace '</body>', "  <script src=`"auto-retry.js`"></script>`n</body>"
        Set-Content $wbHtml $content -NoNewline
        Write-Host "Injected auto-retry.js into workbench.html"
    }
}

if (Test-Path $panelHtml) {
    $content = Get-Content $panelHtml -Raw
    if ($content -notmatch 'auto-retry-panel\.js') {
        $content = $content -replace '</body>', "  <script src=`"auto-retry-panel.js`"></script>`n</body>"
        Set-Content $panelHtml $content -NoNewline
        Write-Host "Injected auto-retry-panel.js into cascade-panel.html"
    }
}

Write-Host "`nReinstall complete. Please restart Antigravity."
