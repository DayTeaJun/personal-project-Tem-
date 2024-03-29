import styled, { keyframes } from 'styled-components';

const animateToastBottom = keyframes`
  0% {
    left: 50%;
    transform: translate(-50%, 100px);
  }
  100% {
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const animateToastTop = keyframes`
  0% {
    left: 50%;
    transform: translate(-50%, -100px);
  }
  100% {
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const Container = styled.div<{ position: 'bottom' | 'top' }>`
	position: absolute;
	top: 5%;
	right: 50%;
	transform: translateX(-50%);
	z-index: 20;
	display: flex;
	height: 3rem;
	width: 25%;
	max-width: 73rem;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	background-color: #b1b1b1;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
	animation: ${({ position }) =>
			position === 'top' ? animateToastTop : animateToastBottom}
		0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const P = styled.p`
	font-size: 1em;
	color: #fff;
`;

export const T = {
	Container,
	P,
};
