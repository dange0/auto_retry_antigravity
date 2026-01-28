# auto_retry_antigravity

[English](#english) | [中文](#中文)

## English

This folder contains the auto-retry scripts and helper tools for Antigravity on macOS.

### What this does
Antigravity shows an error dialog with a **Retry** button when the agent crashes. The scripts here auto-detect that button and click it, so the retry happens automatically.

### Files
- `auto-retry.js` — injected into Antigravity’s main workbench UI.
- `auto-retry-panel.js` — injected into the Antigravity agent panel iframe (`cascade-panel.html`).
- `reinstall-auto-retry.sh` — one-click reinstall script to reapply the scripts after Antigravity updates.

### How to reinstall after an update
Run:

```
sudo /Users/pepsi/Documents/auto_retry_antigravity/reinstall-auto-retry.sh
```

Then restart Antigravity.

### How to restore / disable
If you want to revert the changes, restore the backups created in the app bundle:

```
sudo cp "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html"

sudo cp "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html"

sudo rm -f "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/auto-retry.js" \
           "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/auto-retry-panel.js"
```

### Notes
- Any modification inside the app bundle can trigger Antigravity’s “installation has been modified” warning.
- Updates may overwrite injected files — use the reinstall script if needed.

## 中文

这个文件夹包含了 Antigravity（macOS 版）的自动重试脚本和辅助工具。

### 作用说明
当 agent 崩溃时，Antigravity 会弹出带有 **Retry** 按钮的错误对话框。这里的脚本会自动检测该按钮并点击，从而自动重试。

### 文件说明
- `auto-retry.js` — 注入到 Antigravity 主 workbench 界面。
- `auto-retry-panel.js` — 注入到 Antigravity 的 agent 面板 iframe（`cascade-panel.html`）。
- `reinstall-auto-retry.sh` — 一键重装脚本，用于在 Antigravity 更新后重新注入。

### 更新后如何重新注入
运行：

```
sudo /Users/pepsi/Documents/auto_retry_antigravity/reinstall-auto-retry.sh
```

然后重启 Antigravity。

### 如何恢复 / 禁用
如需恢复原状，请还原 app 包内的备份文件：

```
sudo cp "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html"

sudo cp "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html.bak" \
        "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/cascade-panel.html"

sudo rm -f "/Applications/Antigravity.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/auto-retry.js" \
           "/Applications/Antigravity.app/Contents/Resources/app/extensions/antigravity/auto-retry-panel.js"
```

### 注意事项
- 只要修改了 app 包内文件，就可能触发 “installation has been modified” 提示。
- 更新可能会覆盖注入文件，必要时使用重装脚本。
