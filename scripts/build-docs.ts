import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

interface DocSection {
  id: string;
  title: string;
  icon: string;
  productId: string;
  items: { id: string; label: string }[];
}

interface DocContent {
  id: string;
  title: string;
  description: string;
  productId: string;
  content: DocBlock[];
}

interface DocBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'code' | 'list' | 'note' | 'prereq' | 'table';
  content?: string;
  items?: string[];
  language?: string;
  variant?: 'info' | 'warning' | 'success';
  rows?: { label: string; value: string }[];
}

interface FrontMatter {
  id: string;
  title: string;
  description: string;
  product: string;
  section: string;
  icon?: string;
  order?: number;
}

// Convert markdown AST to DocBlock structure
function convertToBlocks(markdown: string): DocBlock[] {
  const tree = remark().use(remarkParse).parse(markdown);
  const blocks: DocBlock[] = [];

  function processNode(node: Node, skipChildren = false): void {
    if (node.type === 'code') {
      const codeNode = node as any;
      blocks.push({
        type: 'code',
        content: codeNode.value || '',
        language: codeNode.lang || undefined,
      });
      return;
    }

    if (node.type === 'heading') {
      const headingNode = node as any;
      const depth = headingNode.depth || 1;
      const text = extractTextWithFormatting(headingNode);
      
      if (depth === 1) {
        // Skip H1 as it's usually the title, but process children for any nested content
        if (!skipChildren && (node as any).children) {
          (node as any).children.forEach((child: Node) => processNode(child));
        }
        return;
      } else if (depth === 2) {
        blocks.push({ type: 'heading', content: text });
      } else if (depth === 3) {
        blocks.push({ type: 'subheading', content: text });
      }
      return;
    }

    if (node.type === 'list') {
      const listNode = node as any;
      const items: string[] = [];
      const codeBlocksAfterList: DocBlock[] = [];
      
      if (listNode.children) {
        for (const listItem of listNode.children) {
          if (listItem.type === 'listItem') {
            // Extract text from list item, handling nested structures
            const itemParts: string[] = [];
            let hasCodeBlock = false;
            
            if (listItem.children) {
              for (const child of listItem.children) {
                if (child.type === 'code') {
                  // Extract code block separately
                  hasCodeBlock = true;
                  const codeNode = child as any;
                  codeBlocksAfterList.push({
                    type: 'code',
                    content: codeNode.value || '',
                    language: codeNode.lang || undefined,
                  });
                } else if (child.type === 'paragraph') {
                  const paraText = extractTextWithFormatting(child);
                  if (paraText.trim()) {
                    itemParts.push(paraText);
                  }
                } else if (child.type === 'list') {
                  // Handle nested list - convert to inline representation
                  const nestedItems: string[] = [];
                  if (child.children) {
                    for (const nestedItem of child.children) {
                      if (nestedItem.type === 'listItem') {
                        const nestedText = extractTextWithFormatting(nestedItem);
                        if (nestedText.trim()) {
                          nestedItems.push(nestedText);
                        }
                      }
                    }
                  }
                  if (nestedItems.length > 0) {
                    itemParts.push(nestedItems.map(item => `  - ${item}`).join('\n'));
                  }
                } else {
                  // Other content types
                  const text = extractTextWithFormatting(child);
                  if (text.trim()) {
                    itemParts.push(text);
                  }
                }
              }
            }
            
            const itemText = itemParts.join('\n');
            if (itemText.trim() || hasCodeBlock) {
              // If there's a code block, add a placeholder or just the text
              items.push(itemText.trim() || '');
            }
          }
        }
      }
      
      if (items.length > 0) {
        blocks.push({ type: 'list', items });
        // Add any code blocks that were found in list items
        blocks.push(...codeBlocksAfterList);
      }
      // Don't process children - we've already extracted them
      return;
    }

    if (node.type === 'blockquote') {
      const blockquoteNode = node as any;
      if (blockquoteNode.children) {
        const noteTexts: string[] = [];
        for (const child of blockquoteNode.children) {
          if (child.type === 'paragraph') {
            const text = extractTextWithFormatting(child);
            if (text.trim()) {
              noteTexts.push(text);
            }
          }
        }
        if (noteTexts.length > 0) {
          const noteText = noteTexts.join(' ');
          let variant: 'info' | 'warning' | 'success' = 'info';
          if (noteText.includes('⚠') || noteText.toLowerCase().includes('warning')) {
            variant = 'warning';
          } else if (noteText.toLowerCase().includes('success') || noteText.includes('✓')) {
            variant = 'success';
          }
          blocks.push({ type: 'note', content: noteText, variant });
        }
      }
      return;
    }

    if (node.type === 'paragraph') {
      // Check if this paragraph is inside a list item - if so, skip it (handled by list processing)
      let parent = (node as any).parent;
      while (parent) {
        if (parent.type === 'listItem' || parent.type === 'list') {
          return; // Skip - handled by list processing
        }
        parent = parent.parent;
      }

      const paraNode = node as any;
      const text = extractTextWithFormatting(paraNode);
      
      if (text.trim()) {
        blocks.push({ type: 'paragraph', content: text });
      }
      return;
    }

    // For other node types, process children if not skipping
    if (!skipChildren && (node as any).children) {
      (node as any).children.forEach((child: Node) => processNode(child));
    }
  }

  // Process root children
  if ((tree as any).children) {
    (tree as any).children.forEach((child: Node) => processNode(child));
  }

  return blocks;
}

function extractTextWithFormatting(node: any): string {
  if (node.type === 'text') {
    return node.value || '';
  }
  
  if (node.type === 'inlineCode') {
    return `\`${node.value || ''}\``;
  }
  
  if (node.type === 'strong' || node.type === 'emphasis') {
    const text = node.children?.map((child: any) => extractTextWithFormatting(child)).join('') || '';
    return node.type === 'strong' ? `**${text}**` : `*${text}*`;
  }
  
  if (node.children) {
    return node.children.map((child: any) => extractTextWithFormatting(child)).join('');
  }
  
  return '';
}

// Read all markdown files from docs directory
function readDocsFiles(docsDir: string): Map<string, { frontMatter: FrontMatter; content: string }> {
  const files = new Map<string, { frontMatter: FrontMatter; content: string }>();
  const entries = fs.readdirSync(docsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const filePath = path.join(docsDir, entry.name);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      if (data.id && data.title && data.section && data.product) {
        files.set(entry.name, {
          frontMatter: data as FrontMatter,
          content: content.trim(),
        });
      } else {
        console.warn(`Warning: ${entry.name} is missing required front-matter fields`);
      }
    }
  }

  return files;
}

// Generate documentation structure
function generateDocs(files: Map<string, { frontMatter: FrontMatter; content: string }>) {
  const sectionsMap = new Map<string, DocSection>();
  const contents: Record<string, DocContent> = {};

  // First pass: create sections and collect items
  for (const [filename, { frontMatter }] of files) {
    const sectionId = frontMatter.section;
    
    if (!sectionsMap.has(sectionId)) {
      // Get section metadata from first file in section
      const sectionIcon = getSectionIcon(sectionId);
      sectionsMap.set(sectionId, {
        id: sectionId,
        title: getSectionTitle(sectionId),
        icon: sectionIcon,
        productId: frontMatter.product,
        items: [],
      });
    }

    const section = sectionsMap.get(sectionId)!;
    section.items.push({
      id: frontMatter.id,
      label: frontMatter.title,
    });
  }

  // Sort items within each section by order if specified
  for (const section of sectionsMap.values()) {
    section.items.sort((a, b) => {
      const aFile = Array.from(files.values()).find(f => f.frontMatter.id === a.id);
      const bFile = Array.from(files.values()).find(f => f.frontMatter.id === b.id);
      const aOrder = aFile?.frontMatter.order ?? 999;
      const bOrder = bFile?.frontMatter.order ?? 999;
      return aOrder - bOrder;
    });
  }

  // Second pass: convert content to blocks
  for (const [filename, { frontMatter, content }] of files) {
    const blocks = convertToBlocks(content);
    contents[frontMatter.id] = {
      id: frontMatter.id,
      title: frontMatter.title,
      description: frontMatter.description || '',
      productId: frontMatter.product,
      content: blocks,
    };
  }

  // Sort sections in desired order
  const sectionOrder: Record<string, number> = {
    'getting-started': 1,
    'security': 2,
    'operations': 3,
    'backup': 4,
    'monitoring': 5,
    'upgrades': 6,
  };
  
  const sortedSections = Array.from(sectionsMap.values()).sort((a, b) => {
    const aOrder = sectionOrder[a.id] ?? 999;
    const bOrder = sectionOrder[b.id] ?? 999;
    return aOrder - bOrder;
  });

  return {
    sections: sortedSections,
    contents,
  };
}

function getSectionTitle(sectionId: string): string {
  const titles: Record<string, string> = {
    'getting-started': 'Getting Started',
    'security': 'Security & Hardening',
    'operations': 'Operations',
    'backup': 'Backup & Restore',
    'monitoring': 'Monitoring',
    'upgrades': 'Upgrades',
  };
  return titles[sectionId] || sectionId;
}

function getSectionIcon(sectionId: string): string {
  const icons: Record<string, string> = {
    'getting-started': 'Rocket',
    'security': 'Shield',
    'operations': 'Terminal',
    'backup': 'Database',
    'monitoring': 'Activity',
    'upgrades': 'RefreshCw',
  };
  return icons[sectionId] || 'Rocket';
}

// Main execution
const docsDir = path.join(process.cwd(), 'docs');
const outputFile = path.join(process.cwd(), 'src', 'data', 'generated-documentation.ts');

console.log('Reading markdown files from docs/...');
const files = readDocsFiles(docsDir);
console.log(`Found ${files.size} documentation files`);

console.log('Generating documentation structure...');
const { sections, contents } = generateDocs(files);

console.log('Writing generated documentation...');
const output = `// Auto-generated file - DO NOT EDIT MANUALLY
// This file is generated from markdown files in docs/ by scripts/build-docs.ts
// Run "npm run build:docs" to regenerate

export interface Product {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "nginx-proxy-manager",
    name: "Nginx Proxy Manager – Hardened Edition",
    shortName: "Nginx Proxy Manager",
    description: "Enterprise-ready reverse proxy with automated SSL and security hardening",
  },
];

export interface DocSection {
  id: string;
  title: string;
  icon: string;
  productId: string;
  items: {
    id: string;
    label: string;
  }[];
}

export interface DocContent {
  id: string;
  title: string;
  description: string;
  productId: string;
  content: DocBlock[];
}

export interface DocBlock {
  type: "paragraph" | "heading" | "subheading" | "code" | "list" | "note" | "prereq" | "table";
  content?: string;
  items?: string[];
  language?: string;
  variant?: "info" | "warning" | "success";
  rows?: { label: string; value: string }[];
}

export const docSections: DocSection[] = ${JSON.stringify(sections, null, 2)};

export const docContents: Record<string, DocContent> = ${JSON.stringify(contents, null, 2)};

export const getDocContent = (id: string): DocContent | undefined => {
  return docContents[id];
};
`;

fs.writeFileSync(outputFile, output, 'utf-8');
console.log(`✓ Generated ${outputFile}`);
console.log(`  - ${sections.length} sections`);
console.log(`  - ${Object.keys(contents).length} documents`);

