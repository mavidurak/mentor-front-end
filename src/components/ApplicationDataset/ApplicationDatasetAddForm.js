import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import TextInput from "../core/Input/TextInput";
import { TitleWrapper, Button } from "../../molecules"
import { Flex, Form, Grid, Container } from "../../elements";
import Multiselect from "../core/Input/Multiselect";
import DataTypes from "../../constants/DataTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ApplicationDatasetAddForm = ({ applicationId }) => {

  const navigate = useNavigate();

  const [datasetOptions, setDatasetOptions] = useState([])

  const validationSchema = yup.object({
    dataset_id: yup.string().min(1).max(30).required(),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    formState: { errors },
    control } = useForm({ resolver });

  useEffect(() => {
    axios.get('/application-datasets/unavaible-application-datasets/' + applicationId).then(res => {
      setDatasetOptions(res.data.results)
    })
  }, [])

  const add = (data) => {
    axios.post('/application-datasets/', {
      dataset_id: data.dataset_id,
      application_id: applicationId
    }).then(() => {
      navigate(`/application/${applicationId}/dataset`)
    })
  }

  return (
    <Container >
      <Flex>
        <TitleWrapper>
          Application Dataset Add
        </TitleWrapper>
      </Flex>

      <Form onSubmit={handleSubmit(data => add(data))}>
        <Grid gridColumn={2} mx={2} gridGap={1} >
          <Multiselect
            name={"dataset_id"}
            label={"Key Title"}
            control={control}
            options={Object.values(datasetOptions).map(option => ({ value: option.id, label: option.key }))}
            errorMessage={errors.dataset_id?.message}
          />
          <Button type="submit" variant='secondary' mt='2' size='medium'>
            Add
          </Button>
        </Grid>
      </Form>

    </Container>
  )
}

export default ApplicationDatasetAddForm