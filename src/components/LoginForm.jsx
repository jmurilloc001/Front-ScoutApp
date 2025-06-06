import { useState } from 'react';
import Particles from './Particles/Particles';
import { BackButton } from './CommonsComponents';

const initialDataForm = {
  username: '',
  password: ''
}

export const LoginForm = ({handlerDoLogin, onBack}) => {

  const [form, setForm] = useState(initialDataForm)

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Particles
          particleColors={['#39045c', '#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="d-flex justify-content-center align-items-center" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <div className="login-form p-4 border rounded bg-light">
            <h2>Login</h2>
            <form onSubmit={(event) => {
              event.preventDefault();
              handlerDoLogin(form);
              setForm(initialDataForm); // Limpia el formulario
            }}>
              <div className="mb-3">
                <label htmlFor="user" className="form-label">User</label>
                <input
                  placeholder='Username'
                  name='username'
                  value={form.username}
                  onChange={(event) => setForm({
                    ...form,
                    username: event.target.value
                  })}
                  type="user"
                  className="form-control w-100"
                  id="user"
                  style={{ color: "purple" }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  placeholder='Password'
                  name='password'
                  value={form.password}
                  onChange={(event) => setForm({
                    ...form,
                    password: event.target.value
                  })}
                  type="password"
                  className="form-control w-100"
                  id="password"
                  style={{ color: "purple" }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary me-3">Login</button>
            </form>
          </div>
        </div>
        <BackButton onBack={onBack}></BackButton>
      </div>
    </>
  );
};