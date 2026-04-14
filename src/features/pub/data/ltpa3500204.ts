export type PlanAccordionItem = {
	value: string;
	trigger: string;
	content: string[];
};

export const planAccordionItems: PlanAccordionItem[] = [
	{
		value: 'item-1',
		trigger: '기관플랜(5)',
		content: [
			'(지점)올인원플랜(15~40세)',
			'(지점)올인원플랜(15~40세)',
			'(지점)올인원플랜(15~40세)',
			'(지점)올인원플랜(15~40세)',
		],
	},
	{
		value: 'item-2',
		trigger: '기관플랜(0)',
		content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
	},
	{
		value: 'item-3',
		trigger: '모집자플랜(0)',
		content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
	},
];
