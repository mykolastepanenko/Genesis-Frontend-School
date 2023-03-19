import { Container } from "@mui/system";
import { useQuery } from "react-query";
import { useTitle } from "../../hooks/index";
import { getCources } from "../../services/fetch/courses";
import Content from "./elements/Content";
import ErrorContent from "./elements/ErrorContent";

function CoursePage() {
  const { data, isError, error } = useQuery("cources", getCources, {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  useTitle("Your courses");

  function errorOrContent() {
    if (isError) return <ErrorContent error={error} />;
    return <Content data={data} />;
  }

  const PageContent = () => errorOrContent();

  return (
    <Container sx={{ py: 5 }}>
      <PageContent />
    </Container>
  );
}

export default CoursePage;
