import generateOpenApiSpec from "@omer-x/next-openapi-json-generator";
import ReactSwagger from "@omer-x/next-swagger-jsdoc/ReactSwagger";
import { NewUserDTO, UserDTO, UserPatchDTO } from "~/models/user";

const Page = async () => {
  const spec = await generateOpenApiSpec({
    UserDTO,
    NewUserDTO,
    UserPatchDTO,
  });
  return <ReactSwagger spec={spec} />;
};

export default Page;
