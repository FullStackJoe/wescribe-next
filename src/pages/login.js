import Layout from "@/components/layout.js";
import SignIn from "@/components/SignIn.jsx";

export default function Login() {
  return (
    <>
      <Layout>
        <div className="py-10 flex justify-center items-center w-1/1">
          <SignIn />
        </div>
      </Layout>
    </>
  );
}
