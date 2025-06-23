import { connectToMONGO } from "@/utils/database";
import { User } from "@/models/User";
import { verifyPassword } from "@/utils/password";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToMONGO();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isValid = verifyPassword(password, user.password);
  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    }),
    { status: 200 }
  );
}
