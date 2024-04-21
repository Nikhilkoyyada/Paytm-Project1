
import { TextField } from '@mui/material';

const SignUp = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '96px', margin: 'auto' }}>
			<div style={{ width: 450, padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(192, 213, 224, 0)', backdropFilter: 'blur(20px)', webkitBackdropFilter: 'blur(20px)' }}>
				<h1 style={{ fontSize: '3xl', fontWeight: 'semibold', textAlign: 'center', color: 'rgba(107, 114, 128, 1)' }}>
					Sign Up <span style={{ color: 'rgba(59, 130, 246, 1)' }}> ChatApp</span>
				</h1>

				<form>
					<div style={{ marginBottom: '1rem' }}>
						<TextField
							id="standard-basic"
							label="Full Name"
							variant="standard"
							fullWidth
							margin="normal"
							placeholder="John Doe"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<TextField
							id="standard-basic"
							label="Username"
							variant="standard"
							fullWidth
							margin="normal"
							placeholder="johndoe"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<TextField
							id="standard-basic"
							label="Password"
							variant="standard"
							type="password"
							fullWidth
							margin="normal"
							placeholder="Enter Password"
						/>
					</div>

					<div style={{ marginBottom: '1rem' }}>
						<TextField
							id="standard-basic"
							label="Confirm Password"
							variant="standard"
							type="password"
							fullWidth
							margin="normal"
							placeholder="Confirm Password"
						/>
					</div>

			

					<a style={{ fontSize: 'sm', textDecoration: 'underline', color: 'rgba(59, 130, 246, 1)', marginTop: '0.5rem', display: 'inline-block' }} href='#'>
						Already have an account?
					</a>

					<div>
						<button style={{ width: '100%', marginTop: '0.5rem', border: '1px solid rgba(107, 114, 128, 1)', borderRadius: '0.25rem' }}>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
