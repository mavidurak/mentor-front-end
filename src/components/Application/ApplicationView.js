import styled from "styled-components";
import { Grid, Box, Typography } from "../../elements";
import { useEffect, useState } from "react";
import axios from "axios"
import Multiselect from "../core/Input/Multiselect";
import { useForm } from "react-hook-form";
import Chart from "react-apexcharts";
import MapView from "../core/Map";

const ApplicationView = () => {

  const [options, setOptions] = useState([])
  const [data, setData] = useState()

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  })

  const [chartSeries, setChartSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ])

  const { control, watch } = useForm();

  const firstName = watch("applicationId")

  useEffect(() => {
    axios.get('/applications/options').then(res => {
      setOptions(res.data.results)
    })
  }, [])

  useEffect(() => {
    if (firstName)
      axios.get(`applications/with-dataset-options/${firstName}`).then(res => {
        setData(res.data.result)
      })
  }, [firstName])

  return (
    <Box>
      <Multiselect
        name={"applicationId"}
        control={control}
        placeholder="Choose Application for View"
        options={Object.values(options).map(option => ({ value: option.id, label: option.title }))}
      />
      {
        data &&
        <Grid justifyContent="center" alignItems="center" mx={2} gridGap={ [1, null, 2]} gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
        ]} >
          <Box>
            <Grid justifyContent="center" gridTemplateColumns={["1fr 1fr"]} alignItems="center" mx={2} gridGap={2} gridAutoFlow="row">
              <Typography>
                Id
              </Typography>
              <Typography>
                : {data.id}
              </Typography>
              <Typography>
                Title
              </Typography>
              <Typography>
                : {data.title}
              </Typography>
              <Typography>
                Description
              </Typography>
              <Typography>
                : {data.description}
              </Typography>
              <Typography>
                Permissions
              </Typography>
              <Typography>
                : {data.permission_read && "R"} {data.permission_write && "W"} {data.permission_delete && "D"}
              </Typography>
              <Typography>
                Creation Date
              </Typography>
              <Typography>
                : {new Date(data.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>
                Last Update
              </Typography>
              <Typography>
                : {new Date(data.updatedAt).toLocaleDateString()}
              </Typography>
            </Grid>

          </Box>
          <Box>
            {/*<Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
              height="100%"/>*/}
            <MapView
              locations={Object.values(data.locations).map(location => ({ lng: location.longitude, lat: location.latitude }))}
              centerLocation = {{lng:data.locations[0].longitude,lat:data.locations[0].latitude}}
            />
          </Box>
        </Grid>
      }
    </Box>
  )
}

export default ApplicationView