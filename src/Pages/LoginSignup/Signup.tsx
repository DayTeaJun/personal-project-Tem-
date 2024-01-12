import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';
import { SignupForm } from './LoginSignup.style';
import { useSignup } from '../../Hook/FirebaseHook/useSignup';
import persImg from '../../Assets/No-img.svg';
import { ImgPreview } from '../../Hook/useImgPreview';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const { error, isPending, signup } = useSignup();
	const { imageSrc, imgUrl, onUpload } = ImgPreview();

	const handleData = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'email') {
			setEmail(e.target.value);
		} else if (e.target.type === 'password') {
			setPassword(e.target.value);
		} else if (e.target.type === 'text') {
			setDisplayName(e.target.value);
		}
	};

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(email, password, displayName);
		signup({ email, password, displayName });
	};

	return (
		<SignupForm onSubmit={handleSubmit}>
			<fieldset>
				<legend>회원가입</legend>
				<label htmlFor='profileImg'>프로필 이미지</label>
				<img src={imageSrc || persImg} />
				<input
					id='profileImg'
					type='file'
					accept='image/*'
					onChange={(e) => onUpload(e)}
				/>
				<label htmlFor='myEmail'>Email</label>
				<input
					type='email'
					id='myEmail'
					required
					value={email}
					onChange={handleData}
				/>

				<label htmlFor='myPassword'>Password</label>
				<input
					type='password'
					id='myPassword'
					required
					value={password}
					onChange={handleData}
				/>

				<label htmlFor='myNickName'>Nickname</label>
				<input
					type='text'
					id='myNickName'
					required
					value={displayName}
					onChange={handleData}
				/>

				<button type='submit'>회원가입</button>
			</fieldset>
		</SignupForm>
	);
}
