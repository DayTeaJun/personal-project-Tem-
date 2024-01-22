import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../Api/searchApi';
import errorImg from '../../Assets/No-img.svg';
import { CommentForm } from '../../Components/Comments/CommentForm';
import { D } from './bookDetail.style';
import { BData } from '../../Types/bookData';
import { useEffect, useState } from 'react';
import BookLikes from '../../Components/Books/BookLikes';
import { ContainerBookImg } from '../../Components/Books/bookItem.style';

export default function BookDetail() {
	const { id, search } = useParams<{ id: string; search: string }>();
	const [item, setItem] = useState<BData>();

	const { data: books, isLoading } = useQuery({
		queryKey: ['bookDetail', search],
		queryFn: () => getBooks(search!),
		enabled: !!search,
	});

	useEffect(() => {
		if (!isLoading && books) {
			const item: BData = books.find(
				(_: BData, index: number) => index === parseInt(id!)
			);
			setItem(item);
		}
	}, [books]);

	return (
		<D.Main>
			{item ? (
				<>
					<D.Section key={item.isbn}>
						<D.Container>
							{item.thumbnail ? (
								<ContainerBookImg>
									<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
								</ContainerBookImg>
							) : (
								<ContainerBookImg>
									<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
								</ContainerBookImg>
							)}
							<D.Alink
								onClick={() => {
									window.open(item.url);
								}}
							>
								다음 검색으로 이동
							</D.Alink>
						</D.Container>

						<D.Container>
							<D.ContainerH2Likes>
								<D.H2>{item.title}</D.H2>
								<BookLikes item={item} id={id} search={search} />
							</D.ContainerH2Likes>
							<D.Dl>
								<D.Dt>작가</D.Dt>
								<D.Dd>
									{item.authors !== undefined || '' ? item.authors : '미상'}
								</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판사</D.Dt>
								<D.Dd>
									{item.publisher !== (undefined || '')
										? item.publisher
										: '미상'}
								</D.Dd>
							</D.Dl>
							{item.contents !== (undefined || '') ? (
								<D.Dl>
									<D.Dt>내용</D.Dt>
									<D.Dd>{item.contents}</D.Dd>
								</D.Dl>
							) : (
								<></>
							)}

							<D.Dl>
								<D.Dt>가격</D.Dt>
								<D.Dd>{item.price.toLocaleString('ko-KR')}원</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>ISBN</D.Dt>
								<D.Dd>{item.isbn}</D.Dd>
							</D.Dl>
							<D.Dl>
								<D.Dt>출판일</D.Dt>
								<D.Dd>{item.datetime.substr(0, 10).replaceAll('-', '. ')}</D.Dd>
							</D.Dl>
						</D.Container>
					</D.Section>
					<CommentForm />
				</>
			) : (
				<>{item && <h2>not found</h2>}</>
			)}

			{isLoading && <h2>Loading...</h2>}
		</D.Main>
	);
}
