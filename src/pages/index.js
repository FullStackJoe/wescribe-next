import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>WeScribe - Abonnement scanner</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-start justify-center min-h-screen mx-10">
          <div className="rounded-full border border-gray-300 overflow-hidden mb-4">
            <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
              <Image
                priority
                src="/images/profile.jpeg"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full"
              />
            </Link>
          </div>
          <h1 className="md:text-4xl text-2xl font-bold my-2">
            Velkommen til <span className="text-[#BD0060]">WeScribe.</span>
          </h1>
          <h2 className="md:text-3xl text-1xl">
            Et projekt udarbejdet af{" "}
            <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
              Johan Hyldig Nielsen
            </Link>
          </h2>
          <p className="md:text-xl my-1 mb-6">
            Fontend er lavet i Next.js (React) - Backend er lavet i Next.js,
            postgreSQL og Firebase Auth.
          </p>
          <p className="md:text-xl my-1 font-bold">
            WeScribe er stedet hvor du nemt kan danne et overblik over alle dine
            aboennementer, og finde billigere løsninger.
          </p>
          <p className="md:text-xl my-1">
            - Opret en bruger (eller log in med test@test.dk pass: 123456)
          </p>
          <p className="md:text-xl my-1">- Tilføj dine abonnementer</p>
          <p className="md:text-xl my-1 mb-6">
            - WeScribe giver dig overblik over dine abonnementer, og præsenterer
            dig for billigere løsninger!
          </p>
          <h2 className="font-bold mt-4">
            Bemærk: WeScribe er stadig work in progress, så visse funktioner er
            ikke klar endnu
          </h2>
          <h2 className="font-bold my-4">
            Siden er ikke 100% responsiv endnu - Brugeroplevelse er bedst på en
            computer
          </h2>
          <Link
            href="https://github.com/FullStackJoe/wescribe-next"
            className="text-[#BD0060] md:text-xl font-bold"
          >
            Klik her for at komme til git-repository
          </Link>
          <h2></h2>
          <Link
            href="/home"
            className="text-[#BD0060] md:text-xl my-4 pb-6 md:pb-0 font-bold"
          >
            Klik her for at komme til WeScribe.dk
          </Link>
        </div>
      </div>
    </>
  );
}

// <>
// <Head>
//   <title>WeScribe - Abonnement scanner</title>
// </Head>
// <div className="flex flex-col items-center justify-center min-h-screen">
//   <div className="flex flex-col items-start justify-center min-h-screen mx-10">
//     <div className="rounded-full border border-gray-300 overflow-hidden mb-4">
//       <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
//         <Image
//           priority
//           src="/images/profile.jpeg"
//           alt="Profile Picture"
//           width={128}
//           height={128}
//           className="rounded-full"
//         />
//       </Link>
//     </div>
//     <h1 className="text-4xl font-bold my-2">
//       Velkommen til <span className="text-[#BD0060]">WeScribe.</span>
//     </h1>
//     <h2 className="text-3xl">
//       Et projekt udarbejdet af{" "}
//       <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
//         Johan Hyldig Nielsen
//       </Link>
//     </h2>
//     <p className="text-xl my-1">
//       Font end er lavet i Next.js (React) - Backend er lavet i Next.js og
//       postgreSQL.
//     </p>
//     <p className="text-xl my-2">
//       WeScribe er stedet hvor du nemt kan danne et overblik over alle dine
//       aboennementer, og finde billigere løsninger.
//     </p>
//     <div className="flex flex-col items-start">
//       <p className="text-xl my-1">
//         - Opret en bruger (eller log in med test@test.dk pass: 123456)
//       </p>
//       <p className="text-xl my-1">- Tilføj dine abonnementer</p>
//       <p className="text-xl my-1">
//         - WeScribe giver dig overblik over dine abonnementer, og
//         præsenterer dig for billigere løsninger!
//       </p>
//       <h2 className="font-bold my-8">
//         Bemærk: WeScribe er stadig work in progress, så visse funktioner
//         er ikke klar endnu
//       </h2>
//       <Link
//         href="https://github.com/FullStackJoe/wescribe-next"
//         className="text-[#BD0060] font-bold"
//       >
//         Klik her for at komme til git-repository
//       </Link>
//       <h2></h2>
//       <Link href="/home" className="text-[#BD0060] my-4 font-bold">
//         Klik her for at komme til WeScribe.dk
//       </Link>
//     </div>
//   </div>
// </div>
// </>
