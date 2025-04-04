import Container from "@/components/Container";
import * as React from "react";
import LayoutHeader from "@/components/LayoutHeader";
import Layout from "@/components/Layout";

const NotFound: React.FunctionComponent = () => {
  return (
    <Layout>
      <Container>
        <LayoutHeader title="404 Error: Page Not Found" />
        <div className="prose">
          <p>The page you requested could not be found.</p>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFound;
