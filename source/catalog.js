const groups = {
  'Arrows': '← left arrow|→ right arrow|↑ up arrow|↓ down arrow|↔ left right arrow|↕ up down arrow|↳ down then right arrow|↵ return arrow|⇒ implies double right arrow|➜ bold right arrow|↗ northeast arrow|↘ southeast arrow',
  'Checks & bullets': '☐ empty checkbox ballot box|☑ checked checkbox ballot box|☒ crossed checkbox|✓ check mark tick|✔ heavy check mark|✗ cross wrong|✘ heavy cross|• bullet dot|◦ hollow bullet|▪ square bullet|‣ triangular bullet|· middle dot',
  'Fractions': '½ one half 1/2|⅓ one third 1/3|⅔ two thirds 2/3|¼ one quarter 1/4|¾ three quarters 3/4|⅕ one fifth 1/5|⅖ two fifths 2/5|⅗ three fifths 3/5|⅘ four fifths 4/5|⅙ one sixth 1/6|⅚ five sixths 5/6|⅛ one eighth 1/8|⅜ three eighths 3/8|⅝ five eighths 5/8|⅞ seven eighths 7/8|⁄ fraction slash',
  'Card suits': '♠︎ spade suit solid|♥︎ heart suit solid|♦︎ diamond suit solid|♣︎ club suit solid|♤ spade suit outline|♡ heart suit outline|♢ diamond suit outline|♧ club suit outline',
  'Box drawing': '┌ top left corner|┐ top right corner|└ bottom left corner|┘ bottom right corner|─ horizontal line|│ vertical line|├ left tee|┤ right tee|┬ top tee|┴ bottom tee|┼ cross junction|╭ rounded top left corner|╮ rounded top right corner|╰ rounded bottom left corner|╯ rounded bottom right corner|═ double horizontal line|║ double vertical line|╔ double top left corner|╗ double top right corner|╚ double bottom left corner|╝ double bottom right corner',
  'Typography': '© copyright|® registered trademark|™ trademark|℠ service mark|— em dash|– en dash|… ellipsis|“ left double quote|” right double quote|‘ left single quote|’ apostrophe right single quote|« left guillemet|» right guillemet|§ section sign|¶ paragraph pilcrow|† dagger|‡ double dagger|№ numero number|⁎ asterisk',
  'Math & units': '° degree angle temperature|℃ degrees Celsius|℉ degrees Fahrenheit|′ prime feet minutes|″ double prime inches seconds|µ micro|Ω ohm omega|× multiplication times|÷ division|± plus minus|− minus|≈ approximately equal|≠ not equal|≤ less than or equal|≥ greater than or equal|∞ infinity|√ square root|π pi|∑ summation|² squared superscript two|³ cubed superscript three',
  'Currency': '$ dollar|¢ cent|€ euro|£ pound sterling|¥ yen yuan|₹ rupee|₩ won|₽ ruble|₿ bitcoin',
  'Stars & shapes': '★ solid star|☆ outline star|✦ four point star sparkle|✧ outline sparkle|◆ solid diamond|◇ outline diamond|■ solid square|□ outline square|● solid circle|○ outline circle|▲ up triangle|▼ down triangle|◈ diamond in diamond',
  'Emoji': '✅ check button|❌ cross mark|⚠️ warning|⭐ star|✨ sparkles|📌 pin pushpin|🔗 link|💡 light bulb idea|📎 paperclip|🔥 fire|🎉 party popper|🚀 rocket|❤️ red heart|👍 thumbs up|🙂 smile|😂 tears of joy laugh|👀 eyes|🐶 dog|💀 skull|♠️ spade suit|♥️ heart suit|♦️ diamond suit|♣️ club suit|👩🏽‍💻 woman technologist developer',
};
export const categories = Object.keys(groups);
export const catalog = Object.entries(groups).flatMap(([category, entries]) =>
  entries.split('|').map(entry => {
    const [symbol, ...words] = entry.split(' ');
    return {symbol, name: words.join(' '), category};
  })
);
