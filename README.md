# Symbol Keyboard for Obsidian

Assign Unicode symbols and emoji to your own keyboard and insert them directly into a Markdown note.

## Install on desktop

1. Extract this ZIP.
2. Copy the extracted `symbol-keyboard` folder into `.obsidian/plugins/` inside your vault. Create the `plugins` folder if necessary. Use your vault’s configured Obsidian folder if you renamed it.
3. Restart Obsidian. In **Settings → Community plugins**, enable community plugins if needed, then turn on **Symbol Keyboard**.
4. Click the keyboard icon in the left ribbon or run **Symbol Keyboard: Open keyboard** from the Command Palette.

## Use

Open a note in Live Preview or Source mode. In the right sidebar, click **Edit keys**, choose a specific key, then select a symbol or paste a custom one. Select another key to keep building your layout. Select an occupied key to replace or clear it.

Click **Done**, click in your note, then click a symbol key. It inserts at the cursor or replaces selected text. The sidebar stays open while you type. Assignments are saved per vault. Your Chrome extension has its own separate layout.

## Build from source

The `symbol-keyboard` folder is ready to install. The editable sources are in `source`. To rebuild, run the following from the extracted directory with Node.js installed:

```sh
npx --yes esbuild@0.28.2 source/main.js --bundle --format=cjs --platform=node --target=es2020 --external:obsidian --outfile=symbol-keyboard/main.js
```
