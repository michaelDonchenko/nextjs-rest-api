export default function (error: unknown) {
  if (error instanceof Error) {
    console.log("regular error: ", error.message);

    return {message: error.message};
  }

  return {message: "Uncaught error"};
}
