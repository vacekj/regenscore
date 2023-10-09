import { ImageResponse } from 'next/server';
import supabase from '@/utils/supabase-client';
// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'My RegenScore';
export const size = {
  width: 1100,
  height: 500,
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

  //Only from database, it won't calculate if it doesn't exist
  const res = await fetch('https://regenscore.vercel.app/api/myscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address }),
  });

  const resData = await res.json();
  const score = resData?.score;

  const { data: percentile, error } = await supabase
    .from('percentiles')
    .select('*')
    .eq('address', address)
    .single();

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          fontSize: 48,
          fontFamily: 'Inter',
          background: '#F9DD94',
          width: '1100px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://i.imgur.com/JnQ95Ak.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '200px',
            fontWeight: '700',
            lineHeight: '86.045px',
            margin: '0 -250px 0 0',
          }}
        >
          {score}
        </h1>

        <p
          style={{
            fontSize: '48px',
            margin: '60px -250px 0 0',
            color: '#354728',
          }}
        >
          Top {(100 - (percentile?.percentile_rank_all ?? 0) * 100).toFixed(0)}%
          of users
        </p>

        <div
          style={{
            color: 'white',
            fontSize: '36px',
            margin: '10px -250px 0 0',
          }}
        >
          {truncateEthAddress(address)}
        </div>
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
