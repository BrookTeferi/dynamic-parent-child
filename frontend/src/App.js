import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [nodes, setNodes] = useState([]);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    const response = await axios.get('/api/nodes/');
    setNodes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/nodes/', { name, parent: parentId });
    setName('');
    setParentId(null);
    fetchNodes();
  };

  return (
    <div>
      <h1>Parent-Child Structure</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter node name" />
        <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value="">No Parent</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>{node.name}</option>
          ))}
        </select>
        <button type="submit">Add Node</button>
      </form>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.name}
            {node.children.length > 0 && (
              <ul>
                {node.children.map((child) => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;