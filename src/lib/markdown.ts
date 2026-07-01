const markdownLinkPattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

export function renderMarkdownLinks(value: string) {
  let html = "";
  let lastIndex = 0;

  for (const match of value.matchAll(markdownLinkPattern)) {
    const [raw, label, href] = match;
    const index = match.index ?? 0;

    html += escapeHtml(value.slice(lastIndex, index));
    html += `<a href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    lastIndex = index + raw.length;
  }

  html += escapeHtml(value.slice(lastIndex));
  return html;
}

export function stripMarkdownLinks(value: string) {
  return value.replace(markdownLinkPattern, "$1");
}
