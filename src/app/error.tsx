"use client";
import * as React from "react";
import Container from "@/components/Container";
import LayoutHeader from "@/components/LayoutHeader";
import Layout from "@/components/Layout";

const Error: React.FunctionComponent = () => {
  return (
    <Layout>
      <Container>
        <LayoutHeader title="500 Error: Server Error" />
        <div className="prose">
          <p>The was an issue loading this page.</p>
        </div>
      </Container>
    </Layout>
  );
};

export default Error;
