# Madison Deluxe Spa & Wellness Center

A modern, elegant website for booking spa, massage, and wellness appointments.

## Features

- **Homepage** — Hero section, services showcase, about, and contact info
- **Services** — Massage therapy, spa treatments, and wellness programs with pricing
- **Booking** — Full appointment form with service selection, date/time picker, and confirmation
- **Responsive** — Mobile-friendly design with elegant spa aesthetic

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage
│   ├── book/page.tsx     # Booking page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   └── BookingForm.tsx
└── data/
    └── services.ts       # Service catalog & time slots
```

## Customization

- **Services & pricing** — Edit `src/data/services.ts`
- **Contact info** — Update `src/components/Footer.tsx`
- **Colors & branding** — Adjust `tailwind.config.ts` and `globals.css`
