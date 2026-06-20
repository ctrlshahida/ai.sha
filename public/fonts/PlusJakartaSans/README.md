# Plus Jakarta Sans — Local Font Files

Drop your `.woff2` font files here, then switch `layout.tsx` to use `next/font/local`.

## Download

1. Go to https://fonts.google.com/specimen/Plus+Jakarta+Sans
2. Click **Download family**
3. Unzip and convert `.ttf` → `.woff2` using https://cloudconvert.com/ttf-to-woff2
   (or use the pre-converted files from https://fontsource.org/fonts/plus-jakarta-sans)

## Files to place here

```
PlusJakartaSans-Light.woff2      (300)
PlusJakartaSans-Regular.woff2    (400)
PlusJakartaSans-Medium.woff2     (500)
PlusJakartaSans-SemiBold.woff2   (600)
PlusJakartaSans-Bold.woff2       (700)
PlusJakartaSans-ExtraBold.woff2  (800)
```

## Switch to local in layout.tsx

Replace the `Plus_Jakarta_Sans` Google import with:

```ts
import localFont from 'next/font/local';

const jakartaSans = localFont({
  src: [
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Light.woff2',     weight: '300' },
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Regular.woff2',   weight: '400' },
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Medium.woff2',    weight: '500' },
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.woff2',  weight: '600' },
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Bold.woff2',      weight: '700' },
    { path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-jakarta-var',
  display: 'swap',
});
```

Until then, the app uses Google Fonts automatically (no action needed).
