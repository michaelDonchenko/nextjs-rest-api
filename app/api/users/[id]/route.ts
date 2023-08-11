import {deleteUser} from "@/lib/actions/users";
import errorHandler from "@/lib/errorHandler";
import {NextResponse} from "next/server";

type Id = string | undefined;

export async function DELETE(request: Request, context: {params: {id: Id}}) {
  try {
    const id: Id = context.params.id;

    if (!id) {
      throw new Error("No id provided");
    }

    const user = await deleteUser(+id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(errorHandler(error), {status: 400});
  }
}
