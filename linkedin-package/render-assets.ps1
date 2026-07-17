Add-Type -AssemblyName System.Drawing

$OutDir = Join-Path $PSScriptRoot "assets\final"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$assets = @(
  @{ Name="banner-final"; Width=1584; Height=396; Title="Samuel Carrera Paes"; Subtitle="Direcao criativa para transformar intencao em presenca"; Dark=$false },
  @{ Name="banner-var-01"; Width=1584; Height=396; Title="Paes Consultoria"; Subtitle="Portfolio autoral"; Dark=$false },
  @{ Name="banner-var-02"; Width=1584; Height=396; Title="Intencao em presenca"; Subtitle="Imagem - espaco - experiencia"; Dark=$true },
  @{ Name="post-01"; Width=1200; Height=1200; Title="Intencao precisa virar presenca"; Subtitle="Paes Consultoria"; Dark=$false },
  @{ Name="post-02"; Width=1200; Height=1200; Title="Marca e o que o espaco confirma"; Subtitle="Leitura de Marca"; Dark=$false },
  @{ Name="post-03"; Width=1200; Height=1200; Title="12 cases publicados"; Subtitle="Portfolio autoral"; Dark=$false },
  @{ Name="post-04"; Width=1200; Height=1200; Title="Sem operacao, direcao criativa vira intencao nao sustentada"; Subtitle="Operacao Criativa"; Dark=$true },
  @{ Name="carousel-01"; Width=1080; Height=1350; Title="Marca como sistema de percepcao"; Subtitle="Carrossel educativo"; Dark=$false },
  @{ Name="carousel-02"; Width=1080; Height=1350; Title="Evento como comunicacao 360 graus"; Subtitle="Provence Raiz"; Dark=$true },
  @{ Name="institucional"; Width=1200; Height=1200; Title="Paes Consultoria"; Subtitle="Direcao criativa"; Dark=$false },
  @{ Name="servico"; Width=1200; Height=1200; Title="Imagem - espaco - experiencia"; Subtitle="Servicos"; Dark=$false },
  @{ Name="educacional"; Width=1200; Height=1200; Title="Biblioteca"; Subtitle="O pensamento que sustenta a pratica"; Dark=$false },
  @{ Name="contato"; Width=1200; Height=1200; Title="Vamos transformar intencao em presenca?"; Subtitle="paesconsultoria.com"; Dark=$true }
)

function New-Brush($hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

foreach ($asset in $assets) {
  $bitmap = New-Object System.Drawing.Bitmap $asset.Width, $asset.Height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bg = if ($asset.Dark) { "#11100e" } else { "#f3eee7" }
  $fg = if ($asset.Dark) { "#fffaf2" } else { "#111111" }
  $muted = if ($asset.Dark) { "#d8d0c4" } else { "#6f6a62" }
  $line = if ($asset.Dark) { "#3a352d" } else { "#d8d0c4" }

  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml($bg))
  $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($line)), 2
  $graphics.DrawRectangle($pen, 42, 42, ($asset.Width - 84), ($asset.Height - 84))

  $eyebrowFont = New-Object System.Drawing.Font "Arial", 18, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $titleSize = if ($asset.Width -gt 1300) { 70 } elseif ($asset.Width -gt 1100) { 64 } else { 58 }
  $titleFont = New-Object System.Drawing.Font "Georgia", $titleSize, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $subtitleFont = New-Object System.Drawing.Font "Arial", 24, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $smallFont = New-Object System.Drawing.Font "Arial", 18, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)

  $graphics.DrawString("PAES CONSULTORIA", $eyebrowFont, (New-Brush $muted), 76, 72)
  $titleRect = New-Object System.Drawing.RectangleF 76, ($asset.Height / 2 - 70), ($asset.Width - 152), 160
  $format = New-Object System.Drawing.StringFormat
  $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $graphics.DrawString($asset.Title, $titleFont, (New-Brush $fg), $titleRect, $format)
  $graphics.DrawString($asset.Subtitle, $subtitleFont, (New-Brush $muted), 76, ($asset.Height / 2 + 54))

  $url = "paesconsultoria.com"
  $urlSize = $graphics.MeasureString($url, $smallFont)
  $graphics.DrawString($url, $smallFont, (New-Brush $muted), ($asset.Width - 76 - $urlSize.Width), ($asset.Height - 72))

  $file = Join-Path $OutDir ($asset.Name + ".png")
  $bitmap.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

Write-Output "Rendered $($assets.Count) PNG assets."
