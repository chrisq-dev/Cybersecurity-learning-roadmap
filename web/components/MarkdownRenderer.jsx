'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';

// Markdown can reference arbitrary local or external images, so this renderer uses
// plain <img> instead of next/image with a fixed allowlist.
/* eslint-disable @next/next/no-img-element */

// Strip leading `?` from table cell text (leftover from old interactive format)
function stripInteractivePrefix(text) {
  if (typeof text === 'string' && text.startsWith('?')) return text.slice(1).trim();
  return text;
}

// Remove .md extension from local/relative file paths and links in markdown text,
// but ignore code blocks, inline code, and absolute URLs.
function removeMdExtensionFromText(content) {
  if (!content) return '';
  const parts = content.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  return parts.map((part, index) => {
    // Odd indexes are code blocks or inline code, keep them unchanged
    if (index % 2 !== 0) return part;
    
    // Even indexes are normal text, replace local filename.md with filename
    return part.replace(/(\bhttps?:\/\/\S+)|(\b[\w\-]+(?:\/[\w\-]+)*)\.md\b/g, (match, url, filepath) => {
      if (url) return url;
      return filepath;
    });
  }).join('');
}

export default function MarkdownRenderer({ content, basePath = '' }) {
  const processedContent = removeMdExtensionFromText(content);
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          a({ node, children, href, ...props }) {
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
              let newHref = href.replace(/\.md(#.*)?$/, '$1');
              if (newHref.startsWith('./')) newHref = newHref.substring(2);
              return <Link href={newHref} {...props}>{children}</Link>;
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
          },
          img({ node, src, alt, ...props }) {
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
              let resolvedPath = src;
              if (src.startsWith('./')) resolvedPath = src.substring(2);
              if (src.startsWith('../')) {
                resolvedPath = src.replace('../', '');
              } else if (basePath) {
                resolvedPath = `${basePath}/${resolvedPath}`;
              }
              resolvedPath = resolvedPath.replace(/\/+/g, '/');
              return <img src={`/api/images/${resolvedPath}`} alt={alt || ''} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '1rem 0' }} {...props} />;
            }
            return <img src={src} alt={alt || ''} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '1rem 0' }} {...props} />;
          },
          input({ node, checked, type, ...props }) {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  defaultChecked={checked}
                  {...props}
                  readOnly
                  style={{ cursor: 'default', marginRight: '8px' }}
                />
              );
            }
            return <input type={type} {...props} />;
          },
          blockquote({ node, children, ...props }) {
            const firstChild = node.children?.[0];
            let isAlert = false;
            let alertType = '';
            if (firstChild?.tagName === 'p') {
              const firstText = firstChild.children?.[0];
              if (firstText?.type === 'text') {
                const alertMatch = firstText.value?.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                if (alertMatch) {
                  isAlert = true;
                  alertType = alertMatch[1].toLowerCase();
                }
              }
            }
            if (isAlert) {
              const cleanChildren = React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'p') {
                  const pChildren = React.Children.map(child.props.children, (pChild, idx) => {
                    if (idx === 0 && typeof pChild === 'string') {
                      return pChild.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '');
                    }
                    return pChild;
                  });
                  return React.cloneElement(child, {}, pChildren);
                }
                return child;
              });
              return <div className={`alert-box alert-${alertType}`}>{cleanChildren}</div>;
            }
            return <blockquote {...props}>{children}</blockquote>;
          },
          // Strip the `?` prefix from td cells (old interactive format → show answer as plain text)
          td({ node, children, ...props }) {
            const processedChildren = React.Children.map(children, child => {
              if (typeof child === 'string') return stripInteractivePrefix(child);
              return child;
            });
            return <td {...props}>{processedChildren}</td>;
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
