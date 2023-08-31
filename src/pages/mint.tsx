import dynamic from "next/dynamic";
import MintYour from "@/components/MintYour";
import TrackedActivity from "@/pages/TrackedActivity";

const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

export default function Mint() {
  return (
    <Layout>
      <MintYour />
      <TrackedActivity />
    </Layout>
  );
}
