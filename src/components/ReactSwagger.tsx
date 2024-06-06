"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import type { OpenApiDocument } from "@omer-x/openapi-types";

type ReactSwaggerProps = {
  spec: OpenApiDocument,
};

const ReactSwagger = ({
  spec,
}: ReactSwaggerProps) => (
  <SwaggerUI
    spec={spec}
    url="/swagger"
  />
);

export default ReactSwagger;
