import generateOpenApiSpec from "@omer-x/next-openapi-json-generator";
import { NewUserDTO, UserDTO, UserPatchDTO } from "~/models/user";

export async function GET() {
  const spec = await generateOpenApiSpec({
    UserDTO,
    NewUserDTO,
    UserPatchDTO,
  });
  return Response.json(spec);
}
