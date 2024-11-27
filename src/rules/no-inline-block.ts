import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

const rule: TSESLint.RuleModule<"noInlineBlock" | "suggestReplaceBlock", []> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description: "Disallow inline blocks",
      url: "https://eslint.org/docs/rules/no-inline-block", // @todo: 이건 나중에 바꾸기
    },
    fixable: "whitespace",
    hasSuggestions: true,
    schema: [],
    messages: {
      noInlineBlock:
        "Block-level elements (e.g., <{{blockElement}}>) are not allowed inside inline elements (e.g., <{{inlineElement}}>.",
      suggestReplaceBlock:
        "Consider removing the block-level element <{{blockElement}}> or wrapping it appropriately.",
    },
  },
  create(context) {
    // Define block and inline elements
    const blockElements = [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "dd",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "p",
      "pre",
      "section",
      "table",
      "tfoot",
      "ul",
      "video",
    ];
    const inlineElements = [
      "a",
      "abbr",
      "acronym",
      "b",
      "bdo",
      "big",
      "br",
      "button",
      "cite",
      "code",
      "dfn",
      "em",
      "i",
      "img",
      "input",
      "kbd",
      "label",
      "map",
      "object",
      "output",
      "q",
      "samp",
      "script",
      "select",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "textarea",
      "time",
      "tt",
      "var",
    ];

    function isInlineElement(node: TSESTree.JSXOpeningElement): boolean {
      const elementName =
        node.name.type === "JSXIdentifier" ? node.name.name : "";
      return inlineElements.includes(elementName);
    }

    function isBlockElement(node: TSESTree.JSXOpeningElement): boolean {
      const elementName =
        node.name.type === "JSXIdentifier" ? node.name.name : "";
      return blockElements.includes(elementName);
    }

    return {
      JSXElement(node) {
        const parent = node.parent;

        if (
          parent &&
          parent.type === "JSXElement" &&
          isInlineElement(parent.openingElement) &&
          isBlockElement(node.openingElement)
        ) {
          const blockElement =
            node.openingElement.name.type === "JSXIdentifier"
              ? node.openingElement.name.name
              : "";
          const inlineElement =
            parent.openingElement.name.type === "JSXIdentifier"
              ? parent.openingElement.name.name
              : "";
          context.report({
            node,
            messageId: "noInlineBlock",
            data: {
              blockElement,
              inlineElement,
            },
            suggest: [
              {
                messageId: "suggestReplaceBlock",
                data: { blockElement },
                fix: (fixer) =>
                  fixer.replaceText(
                    node,
                    `<!-- Block-level element <${blockElement}> should not be inside inline elements -->`
                  ),
              },
            ],
          });
        }
      },
    };
  },
};
export default rule;
