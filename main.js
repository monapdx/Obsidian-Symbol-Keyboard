var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// obsidian-build/main.js
var main_exports = {};
__export(main_exports, {
  default: () => SymbolKeyboardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// obsidian-build/catalog.js
var groups = {
  "Arrows": "\u2190 left arrow|\u2192 right arrow|\u2191 up arrow|\u2193 down arrow|\u2194 left right arrow|\u2195 up down arrow|\u21B3 down then right arrow|\u21B5 return arrow|\u21D2 implies double right arrow|\u279C bold right arrow|\u2197 northeast arrow|\u2198 southeast arrow",
  "Checks & bullets": "\u2610 empty checkbox ballot box|\u2611 checked checkbox ballot box|\u2612 crossed checkbox|\u2713 check mark tick|\u2714 heavy check mark|\u2717 cross wrong|\u2718 heavy cross|\u2022 bullet dot|\u25E6 hollow bullet|\u25AA square bullet|\u2023 triangular bullet|\xB7 middle dot",
  "Fractions": "\xBD one half 1/2|\u2153 one third 1/3|\u2154 two thirds 2/3|\xBC one quarter 1/4|\xBE three quarters 3/4|\u2155 one fifth 1/5|\u2156 two fifths 2/5|\u2157 three fifths 3/5|\u2158 four fifths 4/5|\u2159 one sixth 1/6|\u215A five sixths 5/6|\u215B one eighth 1/8|\u215C three eighths 3/8|\u215D five eighths 5/8|\u215E seven eighths 7/8|\u2044 fraction slash",
  "Card suits": "\u2660\uFE0E spade suit solid|\u2665\uFE0E heart suit solid|\u2666\uFE0E diamond suit solid|\u2663\uFE0E club suit solid|\u2664 spade suit outline|\u2661 heart suit outline|\u2662 diamond suit outline|\u2667 club suit outline",
  "Box drawing": "\u250C top left corner|\u2510 top right corner|\u2514 bottom left corner|\u2518 bottom right corner|\u2500 horizontal line|\u2502 vertical line|\u251C left tee|\u2524 right tee|\u252C top tee|\u2534 bottom tee|\u253C cross junction|\u256D rounded top left corner|\u256E rounded top right corner|\u2570 rounded bottom left corner|\u256F rounded bottom right corner|\u2550 double horizontal line|\u2551 double vertical line|\u2554 double top left corner|\u2557 double top right corner|\u255A double bottom left corner|\u255D double bottom right corner",
  "Typography": "\xA9 copyright|\xAE registered trademark|\u2122 trademark|\u2120 service mark|\u2014 em dash|\u2013 en dash|\u2026 ellipsis|\u201C left double quote|\u201D right double quote|\u2018 left single quote|\u2019 apostrophe right single quote|\xAB left guillemet|\xBB right guillemet|\xA7 section sign|\xB6 paragraph pilcrow|\u2020 dagger|\u2021 double dagger|\u2116 numero number|\u204E asterisk",
  "Math & units": "\xB0 degree angle temperature|\u2103 degrees Celsius|\u2109 degrees Fahrenheit|\u2032 prime feet minutes|\u2033 double prime inches seconds|\xB5 micro|\u03A9 ohm omega|\xD7 multiplication times|\xF7 division|\xB1 plus minus|\u2212 minus|\u2248 approximately equal|\u2260 not equal|\u2264 less than or equal|\u2265 greater than or equal|\u221E infinity|\u221A square root|\u03C0 pi|\u2211 summation|\xB2 squared superscript two|\xB3 cubed superscript three",
  "Currency": "$ dollar|\xA2 cent|\u20AC euro|\xA3 pound sterling|\xA5 yen yuan|\u20B9 rupee|\u20A9 won|\u20BD ruble|\u20BF bitcoin",
  "Stars & shapes": "\u2605 solid star|\u2606 outline star|\u2726 four point star sparkle|\u2727 outline sparkle|\u25C6 solid diamond|\u25C7 outline diamond|\u25A0 solid square|\u25A1 outline square|\u25CF solid circle|\u25CB outline circle|\u25B2 up triangle|\u25BC down triangle|\u25C8 diamond in diamond",
  "Emoji": "\u2705 check button|\u274C cross mark|\u26A0\uFE0F warning|\u2B50 star|\u2728 sparkles|\u{1F4CC} pin pushpin|\u{1F517} link|\u{1F4A1} light bulb idea|\u{1F4CE} paperclip|\u{1F525} fire|\u{1F389} party popper|\u{1F680} rocket|\u2764\uFE0F red heart|\u{1F44D} thumbs up|\u{1F642} smile|\u{1F602} tears of joy laugh|\u{1F440} eyes|\u{1F436} dog|\u{1F480} skull|\u2660\uFE0F spade suit|\u2665\uFE0F heart suit|\u2666\uFE0F diamond suit|\u2663\uFE0F club suit|\u{1F469}\u{1F3FD}\u200D\u{1F4BB} woman technologist developer"
};
var categories = Object.keys(groups);
var catalog = Object.entries(groups).flatMap(
  ([category, entries]) => entries.split("|").map((entry) => {
    const [symbol, ...words] = entry.split(" ");
    return { symbol, name: words.join(" "), category };
  })
);

// obsidian-build/main.js
var viewType = "symbol-keyboard";
var rowSizes = [10, 9, 8, 7];
var keyCount = rowSizes.reduce((total, size) => total + size, 0);
var segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
var KeyboardView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.editing = false;
    this.selected = null;
    this.query = "";
    this.category = "";
    this.saving = false;
  }
  getViewType() {
    return viewType;
  }
  getDisplayText() {
    return "Symbol Keyboard";
  }
  getIcon() {
    return "keyboard";
  }
  async onOpen() {
    this.panel = this.contentEl.createDiv({ cls: "symbol-keyboard-panel" });
    this.render();
  }
  async onClose() {
    this.panel?.remove();
    this.panel = null;
  }
  render(message = "", focusKey = false) {
    const panel = this.panel;
    if (!panel) return;
    panel.empty();
    const toolbar = panel.createDiv({ cls: "sk-toolbar" });
    toolbar.createSpan({ text: `${this.plugin.keys.filter(Boolean).length} / ${keyCount} assigned` });
    const mode = toolbar.createEl("button", { text: this.editing ? "Done" : "Edit keys" });
    mode.disabled = this.saving;
    mode.onclick = () => {
      this.editing = !this.editing;
      this.selected = null;
      this.render();
      this.panel?.querySelector(".sk-toolbar button")?.focus();
    };
    const keyboard = panel.createDiv({ cls: "sk-keyboard" });
    keyboard.setAttribute("role", "group");
    keyboard.setAttribute("aria-label", this.editing ? "Choose a key to edit" : "Symbol keys");
    let index = 0;
    let activeButton;
    rowSizes.forEach((size, row) => {
      const line = keyboard.createDiv({ cls: "sk-row" });
      line.style.setProperty("--sk-row", row);
      for (let column = 0; column < size; column++) {
        const key = index++;
        const assignment = this.plugin.keys[key];
        const selected = this.selected === key;
        const button = line.createEl("button", {
          cls: assignment ? "sk-key sk-filled" : "sk-key",
          text: assignment?.symbol ?? (this.editing ? "+" : "\xB7"),
          attr: { "aria-label": `Key ${key + 1}: ${assignment ? assignment.name + " " + assignment.symbol : "Empty"}` }
        });
        button.title = assignment?.name ?? `Empty key ${key + 1}`;
        button.disabled = this.saving || !this.editing && !assignment;
        if (this.editing) button.setAttribute("aria-pressed", String(selected));
        if (selected) activeButton = button;
        button.onmousedown = (event) => {
          if (!this.editing) event.preventDefault();
        };
        button.onclick = () => {
          if (this.editing) {
            this.selected = key;
            this.render("", true);
          } else if (this.plugin.insert(assignment.symbol)) {
            status.textContent = `Inserted ${assignment.symbol}.`;
          } else {
            status.textContent = "Click inside a note in editing mode, then try again.";
          }
        };
      }
    });
    const prompt = this.editing ? this.selected === null ? "Choose a key to assign." : `Choose a symbol for key ${this.selected + 1}.` : this.plugin.keys.some(Boolean) ? "Click in a note, then press a symbol key." : "Select Edit keys to build your keyboard.";
    const status = panel.createEl("p", { cls: "sk-status", text: message || prompt, attr: { role: "status" } });
    if (this.editing && this.selected !== null) this.renderLibrary(panel, status);
    if (focusKey) activeButton?.focus();
  }
  renderLibrary(panel, status) {
    const library = panel.createDiv({ cls: "sk-library" });
    const filters = library.createDiv({ cls: "sk-filters" });
    const search = filters.createEl("input", {
      type: "search",
      attr: { "aria-label": "Search symbols", placeholder: "Search symbols, e.g. 1/2" }
    });
    search.value = this.query;
    const category = filters.createEl("select", { attr: { "aria-label": "Symbol category" } });
    category.createEl("option", { value: "", text: "All symbols" });
    for (const name of categories) category.createEl("option", { value: name, text: name });
    category.value = this.category;
    const results = library.createDiv({ cls: "sk-results" });
    results.setAttribute("role", "group");
    results.setAttribute("aria-label", "Matching symbols");
    const update = () => {
      results.empty();
      const words = this.query.trim().toLowerCase().split(/\s+/);
      const matches = catalog.filter(
        (item) => (!this.category || item.category === this.category) && words.every((word) => `${item.name} ${item.symbol} ${item.category.toLowerCase()}`.includes(word))
      );
      for (const item of matches) {
        const button = results.createEl("button", {
          text: item.symbol,
          attr: { title: item.name, "aria-label": `${item.name} ${item.symbol}` }
        });
        button.onclick = () => void this.assign(item);
        button.disabled = this.saving;
      }
      if (!matches.length) results.createSpan({ text: "No matching symbols." });
    };
    search.oninput = () => {
      this.query = search.value;
      update();
    };
    category.onchange = () => {
      this.category = category.value;
      update();
    };
    update();
    const form = library.createEl("form", { cls: "sk-custom" });
    const custom = form.createEl("input", {
      type: "text",
      attr: { "aria-label": "Custom symbol", placeholder: "Paste a custom symbol", required: "" }
    });
    form.createEl("button", { text: "Assign", type: "submit" }).disabled = this.saving;
    form.onsubmit = (event) => {
      event.preventDefault();
      const symbol = custom.value.trim();
      if (!symbol || [...segmenter.segment(symbol)].length !== 1) {
        status.textContent = "Enter one symbol or emoji.";
        return;
      }
      void this.assign({ symbol, name: "Custom symbol" });
    };
    if (this.plugin.keys[this.selected]) {
      const clear = library.createEl("button", { cls: "sk-clear", text: "Clear key" });
      clear.disabled = this.saving;
      clear.onclick = () => void this.assign(null);
    }
  }
  async assign(item) {
    if (this.selected === null || this.saving) return;
    const key = this.selected;
    this.saving = true;
    this.render("Saving key\u2026");
    try {
      await this.plugin.saveKey(key, item);
      this.selected = null;
      this.query = "";
      this.category = "";
      this.saving = false;
      this.render(item ? `Assigned ${item.symbol} to key ${key + 1}. Choose another key.` : `Cleared key ${key + 1}.`);
      this.panel?.querySelectorAll(".sk-key")[key]?.focus();
    } catch {
      this.saving = false;
      this.render("Could not save the key. Choose a symbol to retry.", true);
    }
  }
};
var SymbolKeyboardPlugin = class extends import_obsidian.Plugin {
  async onload() {
    const saved = await this.loadData();
    this.keys = Array.from({ length: keyCount }, (_, index) => {
      const item = saved?.keys?.[index];
      return typeof item?.symbol === "string" && typeof item.name === "string" ? item : null;
    });
    const workspace = this.app.workspace;
    this.registerView(viewType, (leaf) => new KeyboardView(leaf, this));
    const track = (leaf) => {
      if (leaf?.getViewState().type === "markdown") this.noteLeaf = leaf;
    };
    this.registerEvent(workspace.on("active-leaf-change", track));
    workspace.onLayoutReady(() => track(workspace.getMostRecentLeaf()));
    const open = () => {
      void this.showKeyboard().catch(() => new import_obsidian.Notice("Could not open Symbol Keyboard."));
    };
    this.addRibbonIcon("keyboard", "Open Symbol Keyboard", open);
    this.addCommand({ id: "open", name: "Open keyboard", callback: open });
  }
  async showKeyboard() {
    const workspace = this.app.workspace;
    const active = workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (active) this.noteLeaf = active.leaf;
    let leaf = workspace.getLeavesOfType(viewType)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      if (!leaf) throw new Error("No sidebar leaf available");
      await leaf.setViewState({ type: viewType, active: false });
    }
    await workspace.revealLeaf(leaf);
  }
  insert(symbol) {
    const workspace = this.app.workspace;
    let view = workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!view && this.noteLeaf) {
      for (const leaf of workspace.getLeavesOfType("markdown")) {
        if (leaf === this.noteLeaf && leaf.view instanceof import_obsidian.MarkdownView) view = leaf.view;
      }
    }
    if (!view?.file || view.getMode() !== "source") return false;
    view.editor.replaceSelection(symbol);
    view.editor.focus();
    return true;
  }
  saveKey(index, item) {
    const save = () => {
      const keys = this.keys.slice();
      keys[index] = item;
      return this.saveData({ keys }).then(() => {
        this.keys = keys;
        for (const leaf of this.app.workspace.getLeavesOfType(viewType)) {
          if (leaf.view instanceof KeyboardView && !leaf.view.saving) leaf.view.render();
        }
      });
    };
    const pending = (this.pendingSave ?? Promise.resolve()).then(save);
    this.pendingSave = pending.catch(() => {
    });
    return pending;
  }
};
