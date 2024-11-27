import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../src/rules/no-inline-block";

const ruleTester = new RuleTester();

ruleTester.run("no-inline-block", rule, {
  valid: [
    {
      code: '<button type="button"><span>버튼명</span></button>',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ],
  invalid: [
    {
      code: "<span><p>버튼명</p></span>",
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [
        {
          messageId: "noInlineBlock",
          suggestions: [
            {
              messageId: "suggestReplaceBlock",
              output:
                "<span><!-- Block-level element <p> should not be inside inline elements --></span>",
            },
          ],
        },
      ],
    },
  ],
});
