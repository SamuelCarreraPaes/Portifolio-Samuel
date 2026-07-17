param(
  [switch]$NoOpenChrome,
  [switch]$NoOpenTeamViewer,
  [switch]$NoOpenApprovedText
)

$ErrorActionPreference = "Stop"

$packageRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$approvedText = Join-Path $packageRoot "linkedin-apply-approved.txt"
$protocol = Join-Path $packageRoot "TEAMVIEWER_COMPUTER_USE_PROTOCOL.md"
$profileUrl = "https://www.linkedin.com/in/samuel-paes-54143a173/"
$teamViewer = "C:\Program Files\TeamViewer\TeamViewer.exe"

function Open-IfExists {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [string]$ArgumentList
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    Write-Warning "Nao encontrado: $Path"
    return
  }

  if ($ArgumentList) {
    Start-Process -FilePath $Path -ArgumentList $ArgumentList
  } else {
    Start-Process -FilePath $Path
  }
}

function Get-ChromePath {
  $candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
      return $candidate
    }
  }

  return $null
}

Write-Host ""
Write-Host "Paes Consultoria / LinkedIn - ambiente seguro" -ForegroundColor Cyan
Write-Host "------------------------------------------------"
Write-Host "Este launcher nao armazena credenciais, senhas, 2FA, ID ou codigo TeamViewer."
Write-Host ""

if (-not $NoOpenTeamViewer) {
  Open-IfExists -Path $teamViewer
}

if (-not $NoOpenApprovedText) {
  Open-IfExists -Path "$env:WINDIR\System32\notepad.exe" -ArgumentList "`"$approvedText`""
  Open-IfExists -Path "$env:WINDIR\System32\notepad.exe" -ArgumentList "`"$protocol`""
}

if (-not $NoOpenChrome) {
  $chrome = Get-ChromePath
  if ($chrome) {
    Start-Process -FilePath $chrome -ArgumentList $profileUrl
  } else {
    Start-Process $profileUrl
  }
}

Write-Host ""
Write-Host "Checklist antes de entregar ao Codex:" -ForegroundColor Yellow
Write-Host "[ ] TeamViewer conectado a uma sessao remota real, se for usar remoto."
Write-Host "[ ] Mouse e teclado respondem na sessao remota."
Write-Host "[ ] LinkedIn autenticado no perfil correto."
Write-Host "[ ] Perfil aberto: $profileUrl"
Write-Host "[ ] Nenhum modal de edicao pendente."
Write-Host "[ ] Nenhuma credencial visivel."
Write-Host ""
Write-Host "Quando estiver pronto, volte ao Codex e mande: continuar." -ForegroundColor Green
