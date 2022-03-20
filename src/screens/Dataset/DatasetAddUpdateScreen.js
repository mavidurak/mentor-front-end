import DatasetAddUpdateForm from "../../components/Dataset/DatasetAddUpdateForm"
import { Container } from "../../elements"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DatasetAddUpdateScreen = () => {

  const [data, setData] = useState({})

  const { datasetId } = useParams()

  useEffect(() => {
    if (datasetId) {
      setData(null)
      axios.get(`/data-sets/${datasetId}`).then(res =>
        setData(res.data)
      )
    }else{
      setData({
        title:"",
        data_type:"",
        description: ""
      })
    }
  }, [datasetId])

  return (
    <Container maxWidth="1024px">
      {
        !data ? <div>loading</div> :
          <DatasetAddUpdateForm data={data} datasetId={datasetId} />
      }
    </Container>
  )
}

export default DatasetAddUpdateScreen