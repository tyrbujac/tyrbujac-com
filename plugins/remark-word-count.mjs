import { toString } from 'mdast-util-to-string';

export function remarkWordCount() {
  return function (tree, file) {
    let wordCount = 0;

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2 && toString(node) === 'References') {
        break;
      }
      if (node.type === 'paragraph') {
        wordCount += toString(node).split(/\s+/).filter(Boolean).length;
      }
    }

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.wordCount = wordCount;
  };
}
