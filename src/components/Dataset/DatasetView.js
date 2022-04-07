import styled from "styled-components";
import { Grid, Flex, Box, Typography } from "../../elements";
import { TitleWrapper } from "../../molecules";
import { useEffect, useState } from "react";
import axios from "axios"
import Multiselect from "../core/Input/Multiselect";
import { useForm } from "react-hook-form";
import Chart from "react-apexcharts";
import { Button } from "../../molecules"
import { RiLinkM, RiLinkUnlinkM } from "react-icons/ri"

const DatasetView = ({ applicationDatasetOptions }) => {

  const [options, setOptions] = useState([])
  const [data, setData] = useState()
  const [chainToApplication, setChainToApplication] = useState(false)

  const [chartOptions, setChartOptions] = useState({
    xaxis: {
      type: 'datetime'
    },
    legend: {
      position: "bottom"
    },
    grid: {
      show: true
    },
    chart: {
      background: "transparent"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5]
    },
    title: {
      text: 'Page Statistics',
      align: 'left'
    },
  })

  const [chartSeries, setChartSeries] = useState([])

  const { control, watch } = useForm({
    defaultValues: {
      datasetId: []
    }
  });

  const datasetId = watch("datasetId")

  useEffect(() => {
    if (chainToApplication)
      setOptions(applicationDatasetOptions)
    else
      getDatasetUnchainedOptions()
  }, [applicationDatasetOptions, chainToApplication])


  const getDatasetUnchainedOptions = () => {
    axios.get('/data-sets/options').then(res => {
      setOptions(res.data.results)
    })
  }

  const updateChartSeries = (item) => {
    const chartDatas = item.datas.map(function (val) {
      return {
        x: val.createdAt,
        y: val.value
      }
    })

    return { name: item.title, data: chartDatas }
  }

  useEffect(() => {
    if (datasetId && datasetId.length > 0) {
      axios.get(`/data-sets/multiple-with-datas/`, {
        params: {
          dataset_ids: datasetId
        }
      }).then(res => {

        const chartData=res.data.result.map(updateChartSeries)
        setChartSeries(chartData)
      })
    }else {
      setChartSeries([])
    }
  }, [datasetId,chainToApplication])

  return (
    <Box mt="5">
      <Flex>
        <TitleWrapper>
          Dataset View
        </TitleWrapper>
      </Flex>
      <Flex flex='1 1 auto'>
        <Multiselect
          name={"datasetId"}
          control={control}
          multi
          placeholder="Choose Dataset for View"
          options={options ? Object.values(options).map(option => ({ value: option.id, label: option.title })) : []}
        />
        <Button type="submit" variant={chainToApplication ? 'red' : 'secondary'} my='2' size='medium'
          onClick={() => setChainToApplication(!chainToApplication)}>
          {
            chainToApplication
              ? <Grid justifyContent="center" alignItems="center" gridGap={1} gridAutoFlow="column"><RiLinkUnlinkM />unchain</Grid>
              : <Grid justifyContent="center" alignItems="center" gridGap={1} gridAutoFlow="column"><RiLinkM />chain</Grid>
          }
        </Button>

      </Flex>
      {
        chartSeries && chartSeries.length>0 ?
          <Box>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              width="100%"
              height="500vh" />
          </Box>
          : "No Data Found"
      }
    </Box>
  )
}

export default DatasetView