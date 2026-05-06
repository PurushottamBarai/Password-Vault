# Secure Vault - Password Generator

A modern, fast, and visually appealing React application to generate secure passwords directly in your browser.

## Features
- **Customizable Length**: Generate passwords anywhere from 8 to 64 characters.
- **Character Options**: Choose to include numbers and special symbols.
- **One-Click Copy**: Easily copy your generated password to your clipboard.
- **Strength Meter**: Real-time feedback on how secure your password is.
- **Dark Mode UI**: Clean, premium aesthetic designed for ease of use.

## Password Strength Meter Logic

The app evaluates your password in real-time based on a point system (Max 4 points):

- **+1 Point**: Password length is greater than 12 characters.
- **+1 Point**: Password length is greater than 16 characters.
- **+1 Point**: "Include Numbers" is enabled.
- **+1 Point**: "Include Symbols" is enabled.

**Score Breakdown:**
- **0 or 1 Point**: **Weak** (Red)
- **2 or 3 Points**: **Good** (Orange)
- **4 Points**: **Strong** (Green)

To achieve a "Strong" password, you need to use a combination of numbers, symbols, and an adequate length (>16 chars).

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
