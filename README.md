# auto_retry_antigravity

[English](#english) | [中文](#中文)

## English

This folder contains the auto-retry scripts and helper tools for Antigravity on macOS and Windows.

### What this does
Antigravity shows an error dialog with a **Retry** button when the agent crashes. The scripts here auto-detect that button and click it, so the retry happens automatically.

### Files
- `auto-retry.js` — injected into Antigravity’s main workbench UI.
- `auto-retry-panel.js` — injected into the Antigravity agent panel iframe (`cascade-panel.html`).
- `reinstall-auto-retry.sh` — one-click reinstall script for **macOS**.
- `reinstall-auto-retry.ps1` — one-click reinstall script for **Windows** (PowerShell).

### How to reinstall after an update

**macOS:**

```
sudo /Users/pepsi/Documents/auto_retry_antigravity/reinstall-auto-retry.sh
```

**Windows (PowerShell — run as Administrator):**

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\auto_retry_antigravity\reinstall-auto-retry.ps1"
```

Then restart Antigravity.

### How to restore / disable

**macOS:**

```
sudo cp "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html"

sudo cp "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html"

sudo rm -f "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/auto-retry.js" \
           "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/auto-retry-panel.js"
```

**Windows (PowerShell — run as Administrator):**

```powershell
$AgBase = "$env:LOCALAPPDATA\Programs\Antigravity\resources\app"

Copy-Item "$AgBase\out\vs\code\electron-browser\workbench\workbench.html.bak" `
          "$AgBase\out\vs\code\electron-browser\workbench\workbench.html" -Force

Copy-Item "$AgBase\extensions\antigravity\cascade-panel.html.bak" `
          "$AgBase\extensions\antigravity\cascade-panel.html" -Force

Remove-Item "$AgBase\out\vs\code\electron-browser\workbench\auto-retry.js" -ErrorAction SilentlyContinue
Remove-Item "$AgBase\extensions\antigravity\auto-retry-panel.js" -ErrorAction SilentlyContinue
```

### Notes
- Any modification inside the app bundle can trigger Antigravity’s “installation has been modified” warning.
- Updates may overwrite injected files — use the reinstall script if needed.

## 中文

这个文件夹包含了 Antigravity（macOS 及 Windows 版）的自动重试脚本和辅助工具。

### 作用说明
当 agent 崩溃时，Antigravity 会弹出带有 **Retry** 按钮的错误对话框。这里的脚本会自动检测该按钮并点击，从而自动重试。

### 文件说明
- `auto-retry.js` — 注入到 Antigravity 主 workbench 界面。
- `auto-retry-panel.js` — 注入到 Antigravity 的 agent 面板 iframe（`cascade-panel.html`）。
- `reinstall-auto-retry.sh` — 一键重装脚本（**macOS**）。
- `reinstall-auto-retry.ps1` — 一键重装脚本（**Windows**，PowerShell）。

### 更新后如何重新注入

**macOS：**

```
sudo /Users/pepsi/Documents/auto_retry_antigravity/reinstall-auto-retry.sh
```

**Windows（以系统管理员身份执行 PowerShell）：**

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\auto_retry_antigravity\reinstall-auto-retry.ps1"
```

然后重启 Antigravity。

### 如何恢复 / 禁用

**macOS：**

```
sudo cp "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html"

sudo cp "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html"

sudo rm -f "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/auto-retry.js" \
           "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/auto-retry-panel.js"
```

**Windows（以系统管理员身份执行 PowerShell）：**

```powershell
$AgBase = "$env:LOCALAPPDATA\Programs\Antigravity\resources\app"

Copy-Item "$AgBase\out\vs\code\electron-browser\workbench\workbench.html.bak" `
          "$AgBase\out\vs\code\electron-browser\workbench\workbench.html" -Force

Copy-Item "$AgBase\extensions\antigravity\cascade-panel.html.bak" `
          "$AgBase\extensions\antigravity\cascade-panel.html" -Force

Remove-Item "$AgBase\out\vs\code\electron-browser\workbench\auto-retry.js" -ErrorAction SilentlyContinue
Remove-Item "$AgBase\extensions\antigravity\auto-retry-panel.js" -ErrorAction SilentlyContinue
```

### 注意事项
- 只要修改了 app 包内文件，就可能触发 “installation has been modified” 提示。
- 更新可能会覆盖注入文件，必要时使用重装脚本。
