import { TranstackProvider } from "@/provider/TranstackProvider";
import { Login } from "@/webcomponent/login";

export default function LoginPage() {
  return (
    <TranstackProvider>
      <Login />
    </TranstackProvider>
  );
}
