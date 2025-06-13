import { AuthForm } from "@/components/admin/auth-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          NeuraX <span className="text-blue-400">Admin</span>
        </h1>
        <AuthForm />
      </div>
    </div>
  )
}
