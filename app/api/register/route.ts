import { connectToMONGO } from "@/utils/database";
import { User } from "@/models/User";
import { hashPassword } from "@/utils/password";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();
  await connectToMONGO();

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Response(JSON.stringify({ error: "Email already in use" }), {
      status: 400,
    });
  }

  // Hash password
  const hashedPassword = hashPassword(password);

  // Create new user
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return new Response(
    JSON.stringify({ message: "User created successfully" }),
    {
      status: 201,
    }
  );
}
