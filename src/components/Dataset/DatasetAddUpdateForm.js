import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import TextInput from "../core/Input/TextInput";
import { TitleWrapper, Button } from "../../molecules"
import { Flex, Form, Grid, Container } from "../../elements";
import Multiselect from "../core/Input/Multiselect";
import DataTypes from "../../constants/DataTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DatasetAddUpdateForm = ({ data, datasetId }) => {

  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: datasetId
      ? yup.string().min(2).max(40)
      : yup.string().min(2).max(40).required(),
    data_type: datasetId
      ? yup.string().min(1).max(30)
      : yup.string().min(2).max(40).required(),
    description: yup.string()
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control } = useForm({ resolver, defaultValues: data });

  useEffect(() => {
    reset(data)
  }, [data])

  const add = (data) => {
    axios.post('/data-sets/', data)
  }

  const update = ({ datasetId, data }) => {
    axios.put(`/data-sets/${datasetId}`, data).then(()=>{
      navigate("/dataset")
    })
  }

  const submit = (data) => {
    if (datasetId) {
      update({ datasetId, data })
    } else {
      add(data)
    }
  }

  return (
    <Container >
      <Flex>
        <TitleWrapper>
          Dataset {datasetId ? "Update" : "Add"}
        </TitleWrapper>
      </Flex>

      <Form onSubmit={handleSubmit(data => submit(data))}>
        <Grid gridColumn={2} mx={2} gridGap={1} >
          <TextInput
            label={"Title"}
            {...register("title")}
            errorMessage={errors.title?.message}
          />
          <Multiselect
            name={"data_type"}
            label={"Key Title"}
            control={control}
            options={Object.values(DataTypes).map(dataType => ({ value: dataType, label: dataType }))}
            errorMessage={errors.data_type?.message}
          />
          <TextInput
            label={"Description"}
            {...register("description")}
            errorMessage={errors.description?.message}
            textarea
          />
          <Button type="submit" variant='secondary' mt='2' size='medium'>
            {datasetId ? "Update" : "Add"}
          </Button>
        </Grid>
      </Form>

    </Container>
  )
}

export default DatasetAddUpdateForm