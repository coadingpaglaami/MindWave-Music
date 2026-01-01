import * as React from "react";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
export const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#FFE9C0] via-[#FFFAD8] to-[#FFE6A3] relative">
      {/* Logo & Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-20 h-20">
            <Image
              src="/logo.png" // Replace with your actual logo path
              alt="Zenzi Wellness Logo"
              fill
              className="object-contain rounded-full bg-[#8B4513]"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#8B4513]">
              Zenzi Wellness
            </h1>
            <p className="text-lg text-[#A0522D]">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">Sign in to your admin account</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#DE7600] font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#DE7600]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@clinic.com"
                  className="pl-11 bg-gray-50 border-gray-200 focus:border-[#DE7600]"
                  defaultValue="admin@clinic.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#DE7600] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#DE7600]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-11 bg-gray-50 border-gray-200 focus:border-[#DE7600]"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-white font-medium text-lg shadow-lg bg-linear-to-r from-[#FF952B] to-[#FF4D46] hover:from-[#FF8000] hover:to-[#FF3838] transition-all duration-300"
            >
              Sign In
            </Button>
          </form>
        </div>
        {/* Footer Text */}
      </Card>
      <p className="absolute bottom-8 text-[#E65D14] opacity-60 text-sm font-medium">
        Secure admin access for Zenzi Wellness
      </p>
    </div>
  );
};
