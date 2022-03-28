import ApplicationDatasetAddForm from "../../components/ApplicationDataset/ApplicationDatasetAddForm"
import { Container } from "../../elements"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ApplicationDatasetAddScreen = () => {

  const { applicationId } = useParams()

  return (
    <Container maxWidth="1024px">
      <ApplicationDatasetAddForm applicationId={applicationId} />
    </Container>
  )
}

export default ApplicationDatasetAddScreen