import { ImageResponse } from 'next/server';
// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'My RegenScore';
export const size = {
  width: 1200,
  height: 1200,
};

const truncateEthAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const contentType = 'image/png';

// Image generation
export default async function Image({
  params,
}: {
  params: { address: string };
}) {
  // Font
  const interSemiBold = fetch(
    new URL('../../../public/fonts/Inter-SemiBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  const address = params?.address;

  if (!address) return new ImageResponse(<div>nothing</div>);

  //TODO: GRAB SCORE FROM DB
  const res = await fetch('https://regenscore.vercel.app/api/myscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address }),
  });

  const resData = await res.json();
  const score = resData?.score;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          fontFamily: 'Inter',
          background: '#F9DD94',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '100px',
            fontWeight: '700',
            lineHeight: '86.045px',
          }}
        >
          {score}
        </h1>
        <div>{truncateEthAddress(address)}</div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
