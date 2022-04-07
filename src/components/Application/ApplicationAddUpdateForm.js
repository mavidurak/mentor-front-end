import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import TextInput from "../core/Input/TextInput";
import { TitleWrapper, Button } from "../../molecules"
import { Flex, Form, Grid, Container } from "../../elements";
import Multiselect from "../core/Input/Multiselect";
import CheckboxInput from "../core/Input/CheckboxInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import MapView from "../core/Map";


const ApplicationAddUpdateForm = ({ data, applicationId }) => {

  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required().min(2).max(40),
    dataset_ids: yup.array().min(1).required(),
    description: yup.string().min(2).max(30).required(),
    permission_read: yup.bool().required(),
    permission_write: yup.bool().required(),
    permission_delete: yup.bool().required(),
  });

  const [coords, setCoords] = useState([])

  const [datasetOptions, setDatasetOptions] = useState([])
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

  useEffect(() => {
    axios.get('/data-sets/').then(res => {
      setDatasetOptions(res.data.results)
    })
  }, [])

  const add = (data) => {
    const coord = coords[0].toJSON()
    axios.post('/applications/', {
      title: data.title,
      description: data.description,
      dataset_ids: data.dataset_ids,
      permission_read: data.permission_read,
      permission_write: data.permission_write,
      permission_delete: data.permission_delete,
      longitude: coord.lng,
      latitude: coord.lat
    }).then(() => {
      navigate("/application")
    })
  }

  const update = ({ applicationId, data }) => {

    axios.put(`/applications/${applicationId}`, {
      title: data.title,
      description: data.description,
      permission_read: data.permission_read,
      permission_write: data.permission_write,
      permission_delete: data.permission_delete
    }).then(() => {
      navigate("/application")
    })
  }

  const submit = (data) => {
    if (applicationId) {
      update({ applicationId, data })
    } else {
      add(data)
    }
  }
  return (
    <Container >
      <Flex>
        <TitleWrapper>
          Application {applicationId ? "Update" : "Add"}
        </TitleWrapper>
      </Flex>

      <Form onSubmit={handleSubmit(data => submit(data))}>
        <Grid gridColumn={2} mx={2} gridGap={1} >
          <TextInput
            label={"Title"}
            {...register("title")}
            errorMessage={errors.title?.message}
          />
          {!applicationId &&
            <Multiselect
              name={"dataset_ids"}
              label={"Dataset Titles"}
              control={control}
              multi
              options={Object.values(datasetOptions).map(option => ({ value: option.id, label: option.title }))}
              errorMessage={errors.dataset_ids?.message}
            />
          }
          <TextInput
            label={"Description"}
            {...register("description")}
            errorMessage={errors.description?.message}
            textarea
          />
        </Grid>
        <Grid gridTemplateColumns={[
          "repeat(3, 1fr)"
        ]}
          gridColumn={2} mx={2} gridGap={1} >
          <CheckboxInput
            label={"Permission Read"}
            {...register("permission_read")}
            errorMessage={errors.permission_read?.message}
          />
          <CheckboxInput
            label={"Permission Write"}
            {...register("permission_write")}
            errorMessage={errors.permission_write?.message}
          />

          <CheckboxInput
            label={"Permission Delete"}
            {...register("permission_delete")}

            errorMessage={errors.permission_delete?.message}
          />
        </Grid>
        <Grid gridColumn={2} mx={2} gridGap={1} >
          {!applicationId &&
            <MapView enableClick={1} markerChange={coords => setCoords(coords)} />
          }
          <Button type="submit" variant='secondary' mt='2' size='medium'>
            {applicationId ? "Update" : "Add"}
          </Button>
        </Grid>
      </Form>

    </Container>
  )
}

export default ApplicationAddUpdateForm