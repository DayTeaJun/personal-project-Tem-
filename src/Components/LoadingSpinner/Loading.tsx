import { Backdrop, Box, CircularProgress } from '@mui/material';

interface LoadingType {
	BackDrop?: boolean;
}

const Loading = ({ BackDrop }: LoadingType) => {
	if (BackDrop) {
		return (
			<Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<CircularProgress />
			</Backdrop>
		);
	} else {
		return (
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					right: '50%',
					transform: 'translate(-50%,-50%)',
					zIndex: 9999,
					padding: '10px',
				}}
			>
				<CircularProgress color='success' />
			</Box>
		);
	}
};

export default Loading;
