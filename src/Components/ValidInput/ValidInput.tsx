import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { LS } from '../../Pages/LoginSignup/LoginSignup.style';
import useDebounce from '../../Hook/useDebounce';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { appFirestore } from '../../Firebase/config';
import { InputValueType } from '../../Types/userType';

interface ValidInputProps {
	setInputValue: Dispatch<SetStateAction<InputValueType>>;
}

export default function ValidInput({ setInputValue }: ValidInputProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [intro, setIntro] = useState('');
	const [validEmail, setValidEmail] = useState(' ');
	const [validName, setValidName] = useState(' ');
	const userRef = collection(appFirestore, 'user');
	const debounceEmail = useDebounce<string>(email);
	const debounceName = useDebounce<string>(displayName);

	const handleData = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'myEmail') {
			setEmail(e.target.value);
			setInputValue((prev) => ({ ...prev, email: e.target.value }));
		} else if (e.target.id === 'myPassword') {
			setPassword(e.target.value);
			setInputValue((prev) => ({ ...prev, password: e.target.value }));
		} else if (e.target.id === 'myNickName') {
			setDisplayName(e.target.value);
			setInputValue((prev) => ({ ...prev, displayName: e.target.value }));
		} else if (e.target.id === 'intro') {
			setIntro(e.target.value);
			setInputValue((prev) => ({ ...prev, intro: e.target.value }));
		}
	};

	const validCheck = async (validCheck: string) => {
		const Query = query(
			userRef,
			where(`${validCheck}`, '==', validCheck === 'email' ? email : displayName)
		);
		const querySnapshot = await getDocs(Query);
		if (querySnapshot.docs.length > 0) {
			if (validCheck === 'email') {
				setValidEmail('중복된 이메일입니다.');
			} else {
				setValidName('중복된 닉네임입니다.');
			}
		} else {
			if (validCheck === 'email') {
				setValidEmail('');
			} else {
				setValidName('');
			}
		}
	};

	useEffect(() => {
		validCheck('email');
		validCheck('displayName');
	}, [debounceEmail, debounceName]);

	return (
		<>
			<LS.Label htmlFor='myEmail'>이메일</LS.Label>
			<LS.Input
				type='email'
				id='myEmail'
				required
				value={email}
				onChange={handleData}
			/>
			{validEmail ? <LS.P>{validEmail}</LS.P> : <LS.P>&nbsp;</LS.P>}
			<LS.Label htmlFor='myPassword'>비밀번호</LS.Label>
			<LS.Input
				type='password'
				id='myPassword'
				required
				value={password}
				onChange={handleData}
			/>

			<LS.Label htmlFor='myNickName'>닉네임</LS.Label>
			<LS.Input
				type='text'
				id='myNickName'
				required
				value={displayName}
				onChange={handleData}
			/>
			<LS.P>{validName || '\u00A0'}</LS.P>
			<LS.Label htmlFor='intro'>자기 소개</LS.Label>
			<LS.Input type='text' id='intro' value={intro} onChange={handleData} />
		</>
	);
}
