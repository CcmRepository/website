Build Application

Install NVM :
1. Open Terminal
2. < pwd > check path /Users/antonius
3. < ls -al > check if you don't have ".zshrc" file, you can create this file use < touch .zshrc >
4. Go to "https://github.com/nvm-sh/nvm" and get this code < curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash >
5. Check NVM version < nvm --version >
6. < nvm ls-remote > to check all node version can install OR < nvm ls > to check all node version have installed
7. < nvm install v22.14.0 >



antonius@Antoniuss-MacBook-Pro ~ % npm create vite@latest

Ok to proceed? (y) y

Project name: antonius-apps
Select a framework: React
Select a variant: TypeScript

Done. Now run:

  cd antonius-apps
  npm install
  npm run dev

antonius@Antoniuss-MacBook-Pro ~ % cd antonius-apps
antonius@Antoniuss-MacBook-Pro antonius-apps % npm install
antonius@Antoniuss-MacBook-Pro antonius-apps % npm run dev


Add Project To Git Hub
1. Create new repository at Git Hub
2. Input project name
3. Set public or private
4. Copy this terminal code from : < git commit -m "first commit" > until < git push -u origin main >
5. Back to VS Code open terminal
6. < git init >
7. < git add . >
8. Paste code before


Vercel Environment
1. Install the Vercel CLI : npm install -g vercel
2. Link your Vercel project with your local directory : vercel link
3. Pull environment variables locally for use with application development : vercel env pull

Vercel Deployment
Preview : vercel
Production : vercel --prod


npx vercel@latest


app/
├── page.js                    → Home page
├── shop/
│   ├── page.js                → Shop (filters, sorting, products)
│   └── [id]/
│       └── page.js            → Product detail page
├── book-online/
│   └── page.js                → Services booking page
├── portfolio/
│   └── page.js                → Portfolio page
├── layout.js                  → Main layout (header/footer)
└── globals.css                → Global styles
