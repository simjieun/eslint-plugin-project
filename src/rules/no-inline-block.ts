import { TSESLint } from '@typescript-eslint/utils';
const rule: TSESLint.RuleModule<'noInlineBlock', []> = {
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow inline blocks',
            url: 'https://eslint.org/docs/rules/no-inline-block', // @todo: 이건 나중에 바꾸기
        },
        fixable: 'code',
        schema: [],
        messages: {
            noInlineBlock: 'Inline blocks are not allowed.',
        },
    },
    create(context) {
        console.log('context:', context);

        return {
            Program() {
                console.log('Inside Program Node:', context);
            },
        };
    },
}
export default rule;
