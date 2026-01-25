import localFont from 'next/font/local';

export const ppObjectSans = localFont({
  src: [
    {
      path: '../../../public/fonts/PPObjectSans/PPObjectSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PPObjectSans/PPObjectSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PPObjectSans/PPObjectSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pp-object-sans',
  display: 'swap',
});
