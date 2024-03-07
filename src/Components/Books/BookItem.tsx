import { useNavigate } from 'react-router-dom';
import { B, ContainerBookImg } from './bookItem.style';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';
import { Box } from '@mui/material';

const BookItem = ({ item, id, page, search, like, comment }: BookItemProps) => {
	const navigate = useNavigate();
	const isbn = item.isbn;
	const onMoveBookDetail = () => {
		if (like) {
			const likeIsbn =
				like.split(' ')[0] === '' ? like.split(' ')[1] : like.split(' ')[0];
			navigate(`/search/like/${likeIsbn}/1/0`, { state: { isbn } });
		} else {
			navigate(`/search/${search}/${page}/${id}`, { state: { isbn } });
		}
	};

	return (
		<>
			{comment ? (
				<Box
					onClick={onMoveBookDetail}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						cursor: 'pointer',
						width: '90%',
						height: '100px',
						padding: '10px',
						borderRadius: '5px',
						backgroundColor: '#eee',
						'&:hover': { backgroundColor: '#e9e9e9' },
					}}
				>
					<B.H2 style={{ fontSize: '1.2em', textDecorationLine: 'none' }}>
						{item.title}
					</B.H2>
					<B.H2
						style={{
							fontWeight: '500',
						}}
					>
						{comment}
					</B.H2>
					<B.P>{item.createdTime?.toDate().toLocaleString()}</B.P>
				</Box>
			) : (
				<B.Container onClick={onMoveBookDetail}>
					{item.thumbnail ? (
						<ContainerBookImg>
							<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
						</ContainerBookImg>
					) : (
						<ContainerBookImg>
							<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
						</ContainerBookImg>
					)}
					<B.H2>{item.title}</B.H2>
					<B.P>
						{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
					</B.P>
				</B.Container>
			)}
		</>
	);
};

export default BookItem;
