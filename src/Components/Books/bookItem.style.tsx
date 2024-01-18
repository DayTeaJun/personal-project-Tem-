import styled from 'styled-components';

export const BookImg = styled.img`
	width: 128px;
	text-align: center;
	border-radius: 10px;
`;

const Container = styled.div`
	border: 0.5px #eee solid;
	background-color: #fff;
	padding: 10px;
	width: 150px;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		transform: scale(1.3);
		transition: transform 0.5s;
	}
`;

const H2 = styled.h2`
	font-size: 14px;
	font-weight: bold;
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	&:hover {
		text-decoration: underline;
	}
`;

const P = styled.p`
	font-size: 12px;
	color: #a1a1a1;
	margin-top: 5px;
`;

const Price = styled.p`
	font-size: 12px;
	font-weight: bold;
	margin-top: 5px;
	text-align: end;
`;

export const B = {
	Container,
	H2,
	P,
	Price,
};
