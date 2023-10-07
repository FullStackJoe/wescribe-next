import SignUp from "@/components/SignUp.jsx";
import Layout from "@/components/layout";

export default function Login() {
  return (
    <>
      <Layout>
        <div className="py-10 flex justify-center items-center w-1/1">
          <SignUp />
        </div>
      </Layout>
    </>
  );
}
