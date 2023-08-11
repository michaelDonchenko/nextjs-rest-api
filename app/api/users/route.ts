import {createUser, getUsers} from "@/lib/actions/users";
import errorHandler from "@/lib/errorHandler";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await createUser(data);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(errorHandler(error), {status: 400});
  }
}

export async function GET() {
  try {
    const users = await getUsers();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(errorHandler(error), {status: 400});
  }
}
