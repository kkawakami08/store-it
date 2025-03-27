import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

interface OtpModalProps {
  email: string;
  accountId: string;
}

const OtpModal = ({ email, accountId }: OtpModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //call API to verify otp
    } catch (error) {
      console.log("Failed to verify OTP");
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    //call api to resend otp
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className=" flex flex-col items-center ">
        <AlertDialogHeader className="flex relative justify-center  w-full">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
          </AlertDialogTitle>
          <Image
            className="absolute top-0 left-0"
            src="/assets/icons/close-dark.svg"
            alt="close"
            width={20}
            height={20}
            onClick={() => setIsOpen(false)}
          />
          <AlertDialogDescription className="text-center font-bold">
            We have sent a code to{" "}
            <span className="pl-1 text-cyan-700">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP
          maxLength={6}
          value={password}
          onChange={setPassword}
          className="  "
        >
          <InputOTPGroup className="">
            <InputOTPSlot index={0} className="size-16" />
            <InputOTPSlot index={1} className="size-16" />
            <InputOTPSlot index={2} className="size-16" />
            <InputOTPSlot index={3} className="size-16" />
            <InputOTPSlot index={4} className="size-16" />
            <InputOTPSlot index={5} className="size-16" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter className=" w-full">
          <div className="flex w-full flex-col gap-4 ">
            <AlertDialogAction
              onClick={handleSubmit}
              type="button"
              className="mt-5 primary-btn"
            >
              Submit
              {isLoading && (
                <Image
                  src={"/assets/icons/loader.svg"}
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="mt-2 text-center ">
              Didn&apos;t get a code?
              <Button
                type="button"
                variant={"link"}
                className="pl-1 text-cyan-700"
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
