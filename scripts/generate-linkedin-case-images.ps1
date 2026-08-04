Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$OutputDir = Join-Path $Root "public\images\social\linkedin"
New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

$NodeCode = @"
import { loadCasesData } from './scripts/case-seo-data.mjs';

const cases = await loadCasesData(process.cwd());
console.log(JSON.stringify(cases.map((caseItem) => ({
  number: caseItem.number,
  title: caseItem.title,
  category: caseItem.category,
  slug: caseItem.slug,
  source: caseItem.thumb || caseItem.gallery?.[0],
}))));
"@

$CasesJson = & node --input-type=module -e $NodeCode
if ($LASTEXITCODE -ne 0) {
  throw "Node case export failed."
}

$Cases = $CasesJson | ConvertFrom-Json

function New-Color([string] $Hex, [int] $Alpha = 255) {
  $clean = $Hex.TrimStart("#")
  return [System.Drawing.Color]::FromArgb(
    $Alpha,
    [Convert]::ToInt32($clean.Substring(0, 2), 16),
    [Convert]::ToInt32($clean.Substring(2, 2), 16),
    [Convert]::ToInt32($clean.Substring(4, 2), 16)
  )
}

function Draw-ImageCover(
  [System.Drawing.Graphics] $Graphics,
  [System.Drawing.Image] $Image,
  [System.Drawing.Rectangle] $Destination,
  [float] $Opacity = 1.0
) {
  $srcAspect = [double] $Image.Width / [double] $Image.Height
  $destAspect = [double] $Destination.Width / [double] $Destination.Height

  if ($srcAspect -gt $destAspect) {
    $srcHeight = $Image.Height
    $srcWidth = [int] [Math]::Round($srcHeight * $destAspect)
    $srcX = [int] [Math]::Round(($Image.Width - $srcWidth) / 2)
    $srcY = 0
  } else {
    $srcWidth = $Image.Width
    $srcHeight = [int] [Math]::Round($srcWidth / $destAspect)
    $srcX = 0
    $srcY = [int] [Math]::Round(($Image.Height - $srcHeight) / 2)
  }

  $attributes = New-Object System.Drawing.Imaging.ImageAttributes
  if ($Opacity -lt 0.999) {
    $matrix = New-Object System.Drawing.Imaging.ColorMatrix
    $matrix.Matrix33 = $Opacity
    $attributes.SetColorMatrix($matrix)
  }

  $Graphics.DrawImage(
    $Image,
    $Destination,
    $srcX,
    $srcY,
    $srcWidth,
    $srcHeight,
    [System.Drawing.GraphicsUnit]::Pixel,
    $attributes
  )
  $attributes.Dispose()
}

function Draw-ImageContain(
  [System.Drawing.Graphics] $Graphics,
  [System.Drawing.Image] $Image,
  [System.Drawing.Rectangle] $Bounds
) {
  $scale = [Math]::Min(
    [double] $Bounds.Width / [double] $Image.Width,
    [double] $Bounds.Height / [double] $Image.Height
  )

  $width = [int] [Math]::Round($Image.Width * $scale)
  $height = [int] [Math]::Round($Image.Height * $scale)
  $x = $Bounds.X + [int] [Math]::Round(($Bounds.Width - $width) / 2)
  $y = $Bounds.Y + [int] [Math]::Round(($Bounds.Height - $height) / 2)

  $Graphics.DrawImage($Image, (New-Object System.Drawing.Rectangle $x, $y, $width, $height))
}

function Get-WrappedLines(
  [System.Drawing.Graphics] $Graphics,
  [string] $Text,
  [System.Drawing.Font] $Font,
  [int] $MaxWidth
) {
  $lines = New-Object System.Collections.Generic.List[string]
  $current = ""

  foreach ($word in ($Text -split "\s+")) {
    if ([string]::IsNullOrWhiteSpace($word)) {
      continue
    }

    $candidate = if ($current.Length -eq 0) { $word } else { "$current $word" }
    if ($Graphics.MeasureString($candidate, $Font).Width -le $MaxWidth) {
      $current = $candidate
    } else {
      if ($current.Length -gt 0) {
        $lines.Add($current)
      }
      $current = $word
    }
  }

  if ($current.Length -gt 0) {
    $lines.Add($current)
  }

  return $lines
}

function Draw-WrappedText(
  [System.Drawing.Graphics] $Graphics,
  [string] $Text,
  [System.Drawing.Font] $Font,
  [System.Drawing.Brush] $Brush,
  [int] $X,
  [int] $Y,
  [int] $MaxWidth,
  [int] $LineHeight
) {
  $lines = Get-WrappedLines $Graphics $Text $Font $MaxWidth
  $currentY = $Y
  foreach ($line in $lines) {
    $Graphics.DrawString($line, $Font, $Brush, [float] $X, [float] $currentY)
    $currentY += $LineHeight
  }
  return $currentY
}

function Save-Jpeg(
  [System.Drawing.Bitmap] $Bitmap,
  [string] $Path,
  [long] $Quality = 90
) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } |
    Select-Object -First 1

  $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
  $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    $Quality
  )

  $Bitmap.Save($Path, $codec, $parameters)
  $parameters.Dispose()
}

$Cream = New-Color "#F4F0E9"
$Stone = New-Color "#1C1917"
$Muted = New-Color "#78716C"
$Line = New-Color "#1C1917" 36
$Panel = New-Color "#F4F0E9" 238
$WhiteVeil = New-Color "#F4F0E9" 205

$TitleBrush = New-Object System.Drawing.SolidBrush $Stone
$MutedBrush = New-Object System.Drawing.SolidBrush $Muted
$LinePen = New-Object System.Drawing.Pen $Line, 1
$PanelBrush = New-Object System.Drawing.SolidBrush $Panel
$WhiteVeilBrush = New-Object System.Drawing.SolidBrush $WhiteVeil

$Serif = New-Object System.Drawing.Font "Georgia", 46, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$SerifSmall = New-Object System.Drawing.Font "Georgia", 28, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Pixel)
$Sans = New-Object System.Drawing.Font "Arial", 16, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$SansSmall = New-Object System.Drawing.Font "Arial", 13, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)

foreach ($Case in $Cases) {
  $sourceRelative = $Case.source.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
  $sourcePath = Join-Path (Join-Path $Root "public") $sourceRelative
  if (-not (Test-Path -LiteralPath $sourcePath)) {
    throw "Missing source image for $($Case.slug): $sourcePath"
  }

  $outputPath = Join-Path $OutputDir "$($Case.slug).jpg"
  $image = [System.Drawing.Image]::FromFile($sourcePath)
  $bitmap = New-Object System.Drawing.Bitmap 1200, 627
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  try {
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $graphics.Clear($Cream)
    Draw-ImageCover $graphics $image (New-Object System.Drawing.Rectangle 0, 0, 1200, 627) 0.16
    $graphics.FillRectangle($WhiteVeilBrush, 0, 0, 1200, 627)

    $imageAspect = [double] $image.Width / [double] $image.Height
    if ($imageAspect -ge 1.25) {
      Draw-ImageCover $graphics $image (New-Object System.Drawing.Rectangle 0, 0, 760, 627) 1.0
      $graphics.FillRectangle($PanelBrush, 738, 0, 462, 627)
      $textX = 800
    } else {
      $frame = New-Object System.Drawing.Rectangle 54, 42, 662, 543
      $graphics.FillRectangle((New-Object System.Drawing.SolidBrush (New-Color "#FFFFFF" 96)), $frame)
      Draw-ImageContain $graphics $image $frame
      $graphics.DrawRectangle($LinePen, $frame)
      $graphics.FillRectangle($PanelBrush, 738, 0, 462, 627)
      $textX = 800
    }

    $graphics.DrawLine($LinePen, 760, 72, 760, 555)

    $eyebrow = "CASE $($Case.number) / PORTFOLIO"
    $graphics.DrawString($eyebrow, $SansSmall, $MutedBrush, [float] $textX, [float] 88)

    $categoryLines = Get-WrappedLines $graphics $Case.category $SansSmall 315
    $titleFont = $Serif
    $titleLineHeight = 53
    $titleLines = Get-WrappedLines $graphics $Case.title $titleFont 330
    if ($titleLines.Count -gt 4) {
      $titleFont = New-Object System.Drawing.Font "Georgia", 40, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
      $titleLineHeight = 47
    }

    $afterTitle = Draw-WrappedText $graphics $Case.title $titleFont $TitleBrush $textX 150 330 $titleLineHeight
    $graphics.DrawLine($LinePen, $textX, ($afterTitle + 24), 1128, ($afterTitle + 24))

    $categoryY = $afterTitle + 52
    foreach ($line in $categoryLines) {
      $graphics.DrawString($line.ToUpperInvariant(), $SansSmall, $MutedBrush, [float] $textX, [float] $categoryY)
      $categoryY += 19
    }

    $graphics.DrawString("Samuel Paes", $SerifSmall, $TitleBrush, [float] $textX, [float] 505)
    $graphics.DrawString("PAES CONSULTORIA", $Sans, $MutedBrush, [float] $textX, [float] 548)

    Save-Jpeg $bitmap $outputPath 90
    $info = Get-Item -LiteralPath $outputPath
    Write-Output ("OK {0} {1} bytes" -f $Case.slug, $info.Length)
  } finally {
    $graphics.Dispose()
    $bitmap.Dispose()
    $image.Dispose()
  }
}

$TitleBrush.Dispose()
$MutedBrush.Dispose()
$LinePen.Dispose()
$PanelBrush.Dispose()
$WhiteVeilBrush.Dispose()
$Serif.Dispose()
$SerifSmall.Dispose()
$Sans.Dispose()
$SansSmall.Dispose()
