import { Container } from "../../elements"
import ApplicationView from "../../components/Application/ApplicationView"
import { useState } from "react"

import DatasetView from "../../components/Dataset/DatasetView"

const Dashboard = () => {

  const [applicationDatasetOptions, setApplicationDatasetOptions] = useState()


  return (
    <Container>
      <ApplicationView setApplicationDatasetOptions={setApplicationDatasetOptions} />
      <DatasetView applicationDatasetOptions={applicationDatasetOptions?.map(a => a.data_set)} />
    </Container>
  )
}

export default Dashboard