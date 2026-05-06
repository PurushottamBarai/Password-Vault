import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css"; // changed to point to index.css where our new styles will live

function App() {
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*/-+";

    // Original Logic
    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  // Calculate password strength
  const getStrength = () => {
    let score = 0;
    if (length > 12) score += 1;
    if (length > 16) score += 1;
    if (numberAllowed) score += 1;
    if (charAllowed) score += 1;

    if (score < 2) return { label: 'Weak', color: '#ff4d4f' };
    if (score < 4) return { label: 'Good', color: '#faad14' };
    return { label: 'Strong', color: '#52c41a' };
  };

  const strength = getStrength();

  return (
    <div className="app-container">
      <main className="generator-card">
        <header className="card-header">
          <h1>Secure Vault</h1>
          <p>Generate highly secure passwords instantly.</p>
        </header>

        <div className="output-section">
          <div className="password-display-wrapper">
            <input
              type="text"
              value={password}
              className="password-display"
              placeholder="Generating..."
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className={`copy-btn ${copied ? "copied" : ""}`}
              aria-label="Copy password"
            >
              {copied ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              )}
            </button>
          </div>
          
          <div className="strength-meter">
            <span className="strength-label">Strength:</span>
            <span className="strength-value" style={{ color: strength.color }}>
              {strength.label}
            </span>
            <div className="strength-bar-bg">
              <div 
                className="strength-bar-fill" 
                style={{ 
                  width: strength.label === 'Weak' ? '33%' : strength.label === 'Good' ? '66%' : '100%',
                  backgroundColor: strength.color
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="control-group length-control">
            <div className="control-header">
              <label htmlFor="lengthRange">Password Length</label>
              <span className="length-value">{length}</span>
            </div>
            <input
              id="lengthRange"
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          <div className="toggles-container">
            <div className="toggle-group">
              <label className="toggle" htmlFor="numInput">
                <input
                  id="numInput"
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">Include Numbers (0-9)</span>
            </div>

            <div className="toggle-group">
              <label className="toggle" htmlFor="charInput">
                <input
                  id="charInput"
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">Include Symbols (!@#$)</span>
            </div>
          </div>
        </div>
        
        <button className="generate-btn" onClick={generatePassword}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-12.28l5.67-5.67"/></svg>
          Regenerate Password
        </button>
      </main>
    </div>
  );
}

export default App;
