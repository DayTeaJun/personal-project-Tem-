import { useNavigate } from 'react-router-dom';
import errorImg from '../../Assets/No-img.svg';
import { BookItemProps } from '../../Types/bookType';
import { Box, Typography } from '@mui/material';

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

	if (comment) {
		return (
			<Box
				onClick={onMoveBookDetail}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexShrink: 0,
					gap: '5px',
					cursor: 'pointer',
					width: '90%',
					height: '100px',
					padding: '10px',
					borderRadius: '5px',
					backgroundColor: 'background.book',
				}}
			>
				<Typography
					component='h2'
					fontSize={'1.2em'}
					fontWeight={'bold'}
					sx={{
						color: 'text.primary',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						textDecorationLine: 'none',
					}}
				>
					{item.title}
				</Typography>
				<Typography
					component='h2'
					fontSize={'1em'}
					fontWeight={'500'}
					sx={{
						color: 'text.primary',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						textDecorationLine: 'none',
					}}
				>
					{comment}
				</Typography>
				<Typography
					component='p'
					fontSize={'0.8em'}
					sx={{
						color: 'text.secondary',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{item.createdTime?.toDate().toLocaleString()}
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: '120px',
				height: '210px',
				borderRadius: '5px',
				padding: '10px',
				backgroundColor: 'background.book',
				cursor: 'pointer',
				'&:hover': {
					transform: 'translateY(-0.5em)',
					transition: 'transform 0.5s',
					boxShadow:
						'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
				},
			}}
			onClick={onMoveBookDetail}
		>
			<Box
				sx={{
					width: '100px',
					height: '140px',
					textAlign: 'center',
					borderRadius: '10px',
				}}
			>
				{item.thumbnail ? (
					<img src={item.thumbnail} alt={`책 ${item.title}의 이미지`} />
				) : (
					<img src={errorImg} alt={`책 ${item.title}의 이미지`} />
				)}
			</Box>

			<Typography
				component='h2'
				fontSize={'0.9em'}
				fontWeight={'bold'}
				sx={{
					color: 'text.primary',
					marginTop: '5px',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{item.title}
			</Typography>
			<Typography
				component='p'
				fontSize={'0.8em'}
				sx={{
					color: 'text.secondary',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{item.authors.length > 1 ? item.authors.join(' | ') : item.authors}
			</Typography>
		</Box>
	);
};

export default BookItem;
