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
        <div className="flex flex-col items-start justify-center min-h-screen p-4 mx-20">
          {/* Added profile picture */}
          <div className="rounded-full border border-gray-300 overflow-hidden mb-4">
            <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
              <Image
                priority
                src="/images/profile.jpeg" // Updated image URL
                alt="Profile Picture"
                width={128} // Specify the width
                height={128} // Specify the height
                className="rounded-full" // Make the image round
              />
            </Link>
          </div>
          <h1 className="text-4xl font-bold my-2">Velkommen til WeScribe</h1>
          <h2 className="text-3xl">
            Et projekt udarbejdet af{" "}
            <Link href="https://www.linkedin.com/in/johan-hyldig-nielsen-abb1b5b9/">
              Johan Hyldig Nielsen
            </Link>
          </h2>
          <p className="text-xl my-1">
            Både frontend og backend er lavet id Next.js(React), og der er en
            PostgreSQL db.
          </p>
          <p className="text-xl my-2">
            WeScribe er stedet du får et overblik over alle dine aboennementer,
            og bliver præsenteret for billigere alternativer
          </p>
          <div className="flex flex-col items-start">
            <p className="text-xl my-1">
              {" "}
              - Opret en bruger (eller log in med test@test.dk pass: 123456)
            </p>
            <p className="text-xl m-1">
              - Tilføj dine abonnementer og dan overblik
            </p>
            <p className="text-xl m-1">
              - WeScribe præsnterer dig for abonnementer med samme indhold, til
              en lavere pris
            </p>
            <h2 className="font-bold my-8">
              Bemærk: WeScribe er stadig work in progress, så visse funktioner
              er ikke klar endnu
            </h2>
            <Link
              href="https://github.com/FullStackJoe/wescribe-next"
              className="text-[#BD0060] font-bold"
            >
              Klik her for at komme til git-repository
            </Link>
            <h2></h2>
            <Link href="/home" className="text-[#BD0060] my-4 font-bold">
              Klik her for at komme til WeScribe.dk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
