import { getBooks } from '../../Api/searchApi';
import { useQuery } from '@tanstack/react-query';
import { BookData } from '../../Types/bookType';
import { useParams } from 'react-router-dom';
import { S } from '../HomeFeed/homFeed.style';
import BookItem from '../../Components/Books/BookItem';
import { Paginaition } from '../../Components/Pagination/Pagination';
import { BookItemSkeleton } from '../../Components/Books/BookItem.skeleton';

export default function SearchView() {
	const { searchView, page } = useParams<{
		searchView: string;
		page: string;
	}>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['books', searchView, page],
		queryFn: () => getBooks(searchView || '', 14, page),
		enabled: !!searchView,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<S.SectionSearch>
				{isLoading ? (
					<>
						{Array.from({ length: 14 }).map((_, index) => (
							<BookItemSkeleton key={index} />
						))}
					</>
				) : (
					<>
						{books.map((item: BookData, index: number) => (
							<BookItem
								item={item}
								page={page}
								id={index}
								search={searchView || ''}
								key={item.isbn}
							></BookItem>
						))}
					</>
				)}
			</S.SectionSearch>

			<Paginaition page={page} searchView={searchView} />
		</>
	);
}