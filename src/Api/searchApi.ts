import { KakaoSearch } from './KakaoApi';

export const getBooks = async (
	searchTitle: string,
	size: number = 14,
	page: string = '1',
	target: string = 'title'
) => {
	try {
		const params = {
			query: searchTitle,
			sort: 'accuracy',
			size: size,
			target: target,
			page: page,
		};
		const result = await KakaoSearch(params);

		if (result) {
			return result.data;
		}
	} catch (error) {
		console.log('에러발생', error);
	}
};
