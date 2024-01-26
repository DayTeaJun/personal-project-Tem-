import {
	DocumentData,
	collection,
	getDocs,
	limit,
	orderBy,
	query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BookData } from '../../Types/bookType';
import { appFirestore } from '../../Firebase/config';
import BookItem from './BookItem';
import { Box } from '@mui/material';
import { Loading } from '../LoadingSpinner/Loading';

export const BookBest = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [likedBooks, setLikedBooks] = useState<DocumentData | BookData[]>();

	useEffect(() => {
		const fetchLikedMeetups = async () => {
			try {
				const LikesRef = collection(appFirestore, 'BooksLikes');
				const likedQuery = query(LikesRef, orderBy('likeBy', 'desc'), limit(2));

				const likedQuerySnapshot = await getDocs(likedQuery);
				const likedQueryData = likedQuerySnapshot.docs.map((doc) => doc.data());
				console.log(likedQueryData);

				setIsLoading(false);
				setLikedBooks(likedQueryData);
			} catch (error) {
				console.error(error);
				setIsLoading(true);
			}
		};

		fetchLikedMeetups();
	}, []);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{likedBooks && (
					<>
						{likedBooks.map((item: BookData) => (
							<BookItem
								item={item}
								page={item.page}
								id={item.id}
								search={item.search}
								key={item.isbn}
							></BookItem>
						))}
					</>
				)}
				{isLoading && <Loading />}
			</Box>
		</>
	);
};
