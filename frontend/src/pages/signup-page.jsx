import { Button } from "../components/button";
import { Footer } from "../components/card-footer";
import { Input } from "../components/input";

export function SignupPage() {
  return (
    <div className="bg-zinc-400 w-screen h-screen flex justify-center items-center">
      <div className="bg-zinc-50 w-[23vw] h-[80vh] rounded-lg drop-shadow-md">
        <div className="flex flex-col justify-center px-2">
          <div className="py-5 text-center">
            <span className="font-bold text-3xl pt-5 font-[Poppins]">
              Sign Up
            </span>
            <p className="text-zinc-600 my-2">
              Enter Your Information To Create an Account
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <Input label={"First Name"} placeholder={"John"} type={"text"} />
            <Input label={"Last Name"} placeholder={"John"} type={"text"} />
            <Input
              label={"Email"}
              placeholder={"Johndoe@example.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              placeholder={"********"}
              type={"password"}
            />
          </div>
          <div className="my-6">
          <Button
          label={"Sign Up"}
          />
          <Footer
          label1={"Already Have an Account ?"}
          label2={"Login"}
          link={"/signin"}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
