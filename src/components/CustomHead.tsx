import Head from 'next/head';
import Script from 'next/script';

const CustomHead = () => (
  <>
    {/* Google Analytics */}
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-93QB1E2CK5"
    ></Script>
    <Script id={'ga'}>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-93QB1E2CK5');
      `}
    </Script>

    {/*Hotjar Tracking Code*/}
    <Script id={'hotjar'}>
      {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3651658,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
    </Script>
  </>
);

export default CustomHead;
