import {ItemView, MarkdownView, Notice, Plugin} from 'obsidian';
import {catalog, categories} from './catalog.js';

const viewType = 'symbol-keyboard';
const rowSizes = [10, 9, 8, 7];
const keyCount = rowSizes.reduce((total, size) => total + size, 0);
const segmenter = new Intl.Segmenter(undefined, {granularity: 'grapheme'});

class KeyboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.editing = false;
    this.selected = null;
    this.query = '';
    this.category = '';
    this.saving = false;
  }

  getViewType() { return viewType; }
  getDisplayText() { return 'Symbol Keyboard'; }
  getIcon() { return 'keyboard'; }

  async onOpen() {
    this.panel = this.contentEl.createDiv({cls: 'symbol-keyboard-panel'});
    this.render();
  }

  async onClose() {
    this.panel?.remove();
    this.panel = null;
  }

  render(message = '', focusKey = false) {
    const panel = this.panel;
    if (!panel) return;
    panel.empty();

    const toolbar = panel.createDiv({cls: 'sk-toolbar'});
    toolbar.createSpan({text: `${this.plugin.keys.filter(Boolean).length} / ${keyCount} assigned`});
    const mode = toolbar.createEl('button', {text: this.editing ? 'Done' : 'Edit keys'});
    mode.disabled = this.saving;
    mode.onclick = () => {
      this.editing = !this.editing;
      this.selected = null;
      this.render();
      this.panel?.querySelector('.sk-toolbar button')?.focus();
    };

    const keyboard = panel.createDiv({cls: 'sk-keyboard'});
    keyboard.setAttribute('role', 'group');
    keyboard.setAttribute('aria-label', this.editing ? 'Choose a key to edit' : 'Symbol keys');

    let index = 0;
    let activeButton;
    rowSizes.forEach((size, row) => {
      const line = keyboard.createDiv({cls: 'sk-row'});
      line.style.setProperty('--sk-row', row);
      for (let column = 0; column < size; column++) {
        const key = index++;
        const assignment = this.plugin.keys[key];
        const selected = this.selected === key;
        const button = line.createEl('button', {
          cls: assignment ? 'sk-key sk-filled' : 'sk-key',
          text: assignment?.symbol ?? (this.editing ? '+' : '·'),
          attr: {'aria-label': `Key ${key + 1}: ${assignment ? assignment.name + ' ' + assignment.symbol : 'Empty'}`},
        });
        button.title = assignment?.name ?? `Empty key ${key + 1}`;
        button.disabled = this.saving || (!this.editing && !assignment);
        if (this.editing) button.setAttribute('aria-pressed', String(selected));
        if (selected) activeButton = button;
        button.onmousedown = event => {
          if (!this.editing) event.preventDefault();
        };
        button.onclick = () => {
          if (this.editing) {
            this.selected = key;
            this.render('', true);
          } else if (this.plugin.insert(assignment.symbol)) {
            status.textContent = `Inserted ${assignment.symbol}.`;
          } else {
            status.textContent = 'Click inside a note in editing mode, then try again.';
          }
        };
      }
    });

    const prompt = this.editing
      ? this.selected === null ? 'Choose a key to assign.' : `Choose a symbol for key ${this.selected + 1}.`
      : this.plugin.keys.some(Boolean) ? 'Click in a note, then press a symbol key.' : 'Select Edit keys to build your keyboard.';
    const status = panel.createEl('p', {cls: 'sk-status', text: message || prompt, attr: {role: 'status'}});
    if (this.editing && this.selected !== null) this.renderLibrary(panel, status);
    if (focusKey) activeButton?.focus();
  }

  renderLibrary(panel, status) {
    const library = panel.createDiv({cls: 'sk-library'});
    const filters = library.createDiv({cls: 'sk-filters'});
    const search = filters.createEl('input', {
      type: 'search', attr: {'aria-label': 'Search symbols', placeholder: 'Search symbols, e.g. 1/2'},
    });
    search.value = this.query;
    const category = filters.createEl('select', {attr: {'aria-label': 'Symbol category'}});
    category.createEl('option', {value: '', text: 'All symbols'});
    for (const name of categories) category.createEl('option', {value: name, text: name});
    category.value = this.category;
    const results = library.createDiv({cls: 'sk-results'});
    results.setAttribute('role', 'group');
    results.setAttribute('aria-label', 'Matching symbols');

    const update = () => {
      results.empty();
      const words = this.query.trim().toLowerCase().split(/\s+/);
      const matches = catalog.filter(item =>
        (!this.category || item.category === this.category) &&
        words.every(word => `${item.name} ${item.symbol} ${item.category.toLowerCase()}`.includes(word))
      );
      for (const item of matches) {
        const button = results.createEl('button', {
          text: item.symbol, attr: {title: item.name, 'aria-label': `${item.name} ${item.symbol}`},
        });
        button.onclick = () => void this.assign(item);
        button.disabled = this.saving;
      }
      if (!matches.length) results.createSpan({text: 'No matching symbols.'});
    };
    search.oninput = () => { this.query = search.value; update(); };
    category.onchange = () => { this.category = category.value; update(); };
    update();

    const form = library.createEl('form', {cls: 'sk-custom'});
    const custom = form.createEl('input', {
      type: 'text', attr: {'aria-label': 'Custom symbol', placeholder: 'Paste a custom symbol', required: ''},
    });
    form.createEl('button', {text: 'Assign', type: 'submit'}).disabled = this.saving;
    form.onsubmit = event => {
      event.preventDefault();
      const symbol = custom.value.trim();
      if (!symbol || [...segmenter.segment(symbol)].length !== 1) {
        status.textContent = 'Enter one symbol or emoji.';
        return;
      }
      void this.assign({symbol, name: 'Custom symbol'});
    };
    if (this.plugin.keys[this.selected]) {
      const clear = library.createEl('button', {cls: 'sk-clear', text: 'Clear key'});
      clear.disabled = this.saving;
      clear.onclick = () => void this.assign(null);
    }
  }

  async assign(item) {
    if (this.selected === null || this.saving) return;
    const key = this.selected;
    this.saving = true;
    this.render('Saving key…');
    try {
      await this.plugin.saveKey(key, item);
      this.selected = null;
      this.query = '';
      this.category = '';
      this.saving = false;
      this.render(item ? `Assigned ${item.symbol} to key ${key + 1}. Choose another key.` : `Cleared key ${key + 1}.`);
      this.panel?.querySelectorAll('.sk-key')[key]?.focus();
    } catch {
      this.saving = false;
      this.render('Could not save the key. Choose a symbol to retry.', true);
    }
  }
}

export default class SymbolKeyboardPlugin extends Plugin {
  async onload() {
    const saved = await this.loadData();
    this.keys = Array.from({length: keyCount}, (_, index) => {
      const item = saved?.keys?.[index];
      return typeof item?.symbol === 'string' && typeof item.name === 'string' ? item : null;
    });

    const workspace = this.app.workspace;
    this.registerView(viewType, leaf => new KeyboardView(leaf, this));
    const track = leaf => {
      if (leaf?.getViewState().type === 'markdown') this.noteLeaf = leaf;
    };
    this.registerEvent(workspace.on('active-leaf-change', track));
    workspace.onLayoutReady(() => track(workspace.getMostRecentLeaf()));

    const open = () => {
      void this.showKeyboard().catch(() => new Notice('Could not open Symbol Keyboard.'));
    };
    this.addRibbonIcon('keyboard', 'Open Symbol Keyboard', open);
    this.addCommand({id: 'open', name: 'Open keyboard', callback: open});
  }

  async showKeyboard() {
    const workspace = this.app.workspace;
    const active = workspace.getActiveViewOfType(MarkdownView);
    if (active) this.noteLeaf = active.leaf;
    let leaf = workspace.getLeavesOfType(viewType)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      if (!leaf) throw new Error('No sidebar leaf available');
      await leaf.setViewState({type: viewType, active: false});
    }
    await workspace.revealLeaf(leaf);
  }

  insert(symbol) {
    const workspace = this.app.workspace;
    let view = workspace.getActiveViewOfType(MarkdownView);
    if (!view && this.noteLeaf) {
      for (const leaf of workspace.getLeavesOfType('markdown')) {
        if (leaf === this.noteLeaf && leaf.view instanceof MarkdownView) view = leaf.view;
      }
    }
    if (!view?.file || view.getMode() !== 'source') return false;
    view.editor.replaceSelection(symbol);
    view.editor.focus();
    return true;
  }

  saveKey(index, item) {
    const save = () => {
      const keys = this.keys.slice();
      keys[index] = item;
      return this.saveData({keys}).then(() => {
        this.keys = keys;
        for (const leaf of this.app.workspace.getLeavesOfType(viewType)) {
          if (leaf.view instanceof KeyboardView && !leaf.view.saving) leaf.view.render();
        }
      });
    };
    const pending = (this.pendingSave ?? Promise.resolve()).then(save);
    this.pendingSave = pending.catch(() => {});
    return pending;
  }
}
