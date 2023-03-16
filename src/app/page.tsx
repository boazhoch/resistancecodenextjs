import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

import awsConfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import { Login } from "@/components/login";

// const isLocalhost =
//   window &&
//   Boolean(
//     window.location.hostname === "localhost" ||
//       // [::1] is the IPv6 localhost address.
//       window.location.hostname === "[::1]" ||
//       // 127.0.0.1/8 is considered localhost for IPv4.
//       window.location.hostname.match(
//         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//       )
//   );

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(",");

const [localRedirectSignOut, productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: true ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: true ? localRedirectSignOut : productionRedirectSignOut,
  },
};

Amplify.configure({ ...updatedAwsConfig, ssr: true });

export default function Home() {
  return (
    <>
      <h1
        className="text-black font-bold text-center p-10"
        style={{ fontSize: "12vmin" }}
      >
        הצטרפו למאבק להצלת מדינת ישראל ודמקורטיה
      </h1>
      <div className="text-center">
        <Login />
      </div>
    </>
  );
}
