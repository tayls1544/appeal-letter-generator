# Appeal Letter Generator

A professional appeal letter generator for UK parking tickets and train fines. Built with Next.js and Claude AI.

## Features

- **Simple Form Interface** - Enter your details and appeal information
- **AI-Powered Generation** - Claude AI generates professional, persuasive appeal letters
- **Email Preview** - Review your letter before sending
- **One-Click Copy** - Easily copy the letter to your clipboard
- **Clean, Professional Design** - Minimal interface focused on usability

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### Installation

1. **Clone/download the project**

```bash
cd appeal-letter-generator
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Fill out the form** with:
   - Reference number (from your ticket)
   - Your name
   - Company being appealed to
   - Fine amount
   - Reason for appeal
   - Key facts and context

2. **Click "Generate Appeal Letter"** - Claude AI will create a professional letter

3. **Review the generated letter** in the preview

4. **Click "Copy to Clipboard"** to copy it

5. **Paste into your email client** and send

## Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Add your `ANTHROPIC_API_KEY` environment variable in Vercel settings
4. Deploy!

## API Reference

### POST `/api/generate-appeal`

Generates a professional appeal letter based on the provided details.

**Request body:**
```json
{
  "referenceNumber": "PCN123456789",
  "userName": "John Smith",
  "company": "National Parking Enforcement",
  "fineAmount": "130",
  "reason": "Unclear signage",
  "keyFacts": "The sign was partially obscured by a tree..."
}
```

**Response:**
```json
{
  "email": "Dear Sir or Madam,\n\nI am writing to appeal..."
}
```

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Anthropic Claude API
- **Deployment**: Vercel

## Future Enhancements (Phase 2)

- Usage limits (2-3 free generations per user)
- User authentication
- Letter history and storage
- Email signature customization
- Multiple language support
- Appeal success rate tracking

## License

MIT

## Support

For issues or feedback, please open an issue on GitHub.
