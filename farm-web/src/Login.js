import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // If using React Router for navigation
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const responseData = await response.json();
        const isFarmer = responseData.isFarmer;
        const farmerName = responseData.farmerName; // Fetch the farmer's name from the response
        const userName = responseData.userName; 
        const adminName = responseData.adminName;
        
        // Redirect to respective pages with user's name
        if (isFarmer) {
          navigate(`/farmerlanding?name=${encodeURIComponent(farmerName)}`);
      } else if (responseData.isAdmin) {
        navigate('/dashboard', { state: { adminName } }); // Redirect to admin sidebar
      } else {
          navigate(`/landing?name=${encodeURIComponent(userName)}`);
      }
      
        
        // Reset email and password fields
        setEmail('');
        setPassword('');
    } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.error);
    }
    
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const spanStyle = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '50%',
    height: '3px',
    backgroundColor: '#00AC7F',
    transition: 'width 0.2s ease'
  };

  const handleTextMouseEnter = (e) => {
    e.target.style.color = '#00AC7F';
    e.target.parentNode.querySelector('.underline').style.width = '100%'; // Expand underline on text hover
  };

  const handleTextMouseLeave = (e) => {
    e.target.style.color = 'black';
    e.target.parentNode.querySelector('.underline').style.width = '50%'; // Shrink underline on text hover leave
  };

  return (
    <div>
      {/* Navigation Header */}
      <nav style={{ backgroundColor: '#fff', height: '50px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderBottom: '5px solid transparent', }}>
        <img src={require('./uss.png')} alt="logo" style={{ height: '100px' }} />
        <div>
          <Link
            to="/farmer_signup"
            style={{
              color: 'black',
              marginLeft: '50px',
              textDecoration: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span
              onMouseEnter={handleTextMouseEnter}
              onMouseLeave={handleTextMouseLeave}
              style={{ position: 'relative', zIndex: 1 }} 
            >
              Become a seller
            </span>
            <span
              className="underline"
              style={{ ...spanStyle }}
            />
          </Link>
          <Link
            to="/login"
            style={{ color: 'black', marginLeft: '10px', textDecoration: 'none', transition: 'backgroundColor 0.2s ease', padding: '8px 20px', borderRadius: '5px', border: '1px solid transparent'}}
            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#00AC7F'; }}
            onMouseLeave={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = 'white'; }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{ color: 'black', marginRight: '20px', textDecoration: 'none', transition: 'backgroundColor 0.2s ease', padding: '8px 15px', borderRadius: '5px', border: '1px solid transparent'}}
            onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#00AC7F'; }}
            onMouseLeave={(e) => { e.target.style.color = 'black'; e.target.style.backgroundColor = 'white'; }}
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Main Login Content */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', marginBottom:'200px'}}>
        <div style={{  marginBottom:'100px',display: 'flex', borderRadius: '10px', backgroundColor: '#ffffff', overflow: 'hidden', height: '500px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ backgroundColor: '#ffffff', flex: 2 }}>
            <img src={require('./u.jpg')} alt="Farmers" style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h2 style={{ color: 'black', fontSize: '22px', marginBottom: '10px', marginLeft: '10px' }}>
                  Welcome to <span style={{ color: '#00AC7F' }}>Fresh Farms</span>
                </h2>
              </div>
              <div style={{ marginBottom: '500px', backgroundColor: 'transparent', height:'200px' }}>
                <label style={{ marginTop: '10px', color: '#333' }}>
                  <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '10px', height: '20px', border: '1px solid #ccc', transition: 'border-color 0.3s ease' }} />
                </label>
                <label style={{ marginTop: '10px', color: '#333' }}>
                  <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '10px', height: '20px', border: '1px solid #ccc', transition: 'border-color 0.3s ease' }} />
                </label>
                <button type="submit" style={{ padding: '10px 20px', marginTop: '30px', marginBottom: '30px',backgroundColor: '#06C265', border: 'none', height: '40px', borderRadius: '10px', cursor: 'pointer', color: '#fff', transition: 'background-color 0.3s ease', boxShadow: '0 4px 6px rgba(0, 123, 255, 0.1)' }}>Login</button>
                <div>
                  <p style={{ marginTop: '10px', textAlign: 'center' }}>Don't have an account? <Link to="/signup" style={{ color: '#28a745', textDecoration: 'none' }}>Sign Up</Link></p>
                  <p style={{ marginTop: '10px', textAlign: 'center' }}> <Link to="/farmer_signup" style={{ color: '#28a745', textDecoration: 'none' }}>Become a Seller</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
