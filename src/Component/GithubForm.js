import { useState } from "react";
import axios from "axios";
import './Github.css'

function GitHubForm() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);

      setUser(response.data);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Enter a GitHub username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <button type="submit">Submit</button>

      {error && <p>Error: {error}</p>}

      {user && (
        <div className="card">
          
          <div className="con">
          <div className="img"> <img src={user.avatar_url} alt={user.login} />
          </div>
          
           <div className="contain">
          <h2>{user.login}</h2>
          <p>
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </p>
          <p>
            <span className="label">Public Repos:</span>
            <span className="value">{user.public_repos}</span>
          </p>
          <p>
            <span className="label">Public Gists:</span>
            <span className="value">{user.public_gists}</span>
          </p>
          <p>
            <span className="label">Profile Created:</span>
            <span className="value">{new Date(user.created_at).toISOString().split('T')[0]}</span>
          </p>
          </div> </div>
          
           {/* <div className="con">
         <div className="img"><img src={user.avatar_url} alt={user.login}/>
         </div>
         <div className="contain">
         <h2>{user.login}</h2>
         <p><span className="label">Name:</span>{user.name}</p>
         <p><span className="label">Public Repos:</span><span className="value">{user.public_repos}</span></p>
         <p><span className="label">Public Gists:</span><span className="value">{user.public_gists}</span></p>
         <p><span className="label">Profile Created:</span><span className="value">{new Date(user.created_at).toISOString().split('T')[0]}</span></p>
         </div>
         </div>*/}
        </div> 
        
      )}
    </form>
  );
}

export default GitHubForm;