import ApplicationAddUpdateForm from "../../components/Application/ApplicationAddUpdateForm"
import { Container } from "../../elements"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ApplicationAddUpdateScreen = () => {

  const [data, setData] = useState({})

  const { applicationId } = useParams()

  /*
  const getMax = (max, current) => {
    return current.createdAt > max.createdAt ?
      current.createdAt : max.createdAt
  }*/

  useEffect(() => {
    if (applicationId) {
      setData(null)
      axios.get(`/applications/${applicationId}`).then(res => {

        const dataset_ids = Object.values(res.data.application_datasets)
          .map(option => option.data_set.id)
        res.data.dataset_ids = dataset_ids

        /*If we want update location with interface
        const lastLocation = res.data.locations.reduce(getMax,{createdAt:0})
        res.data.longitude = lastLocation.longitude
        res.data.latitude = lastLocation.latitude
        */

        setData(res.data)
      })
    } else {
      setData({
        title: "",
        description: ""
      })
    }
  }, [applicationId])

  return (
    <Container maxWidth="1024px">
      {
        !data ? <div>loading</div> :
          <ApplicationAddUpdateForm data={data} applicationId={applicationId} />
      }
    </Container>
  )
}

export default ApplicationAddUpdateScreen