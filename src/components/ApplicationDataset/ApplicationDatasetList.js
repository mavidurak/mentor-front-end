import Table from "../core/Table/"
import { useMemo, useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { Button } from "../../molecules"
import { RiDeleteBin5Line, RiEditFill } from "react-icons/ri";
import styled from "styled-components";
import { Grid } from "../../elements";
import { useParams } from "react-router-dom";

const ApplicationDatasetList = () => {

  const [data, setData] = useState([])

  const { applicationId } = useParams()

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 50
      },
      {
        Header: 'Title',
        accessor: 'data_set.title',
      },
      {
        Header: 'Description',
        accessor: 'data_set.description',
      },
      {
        Header: 'Data Type',
        accessor: 'data_set.data_type',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ row }) => (
          new Date(row.original.createdAt).toLocaleDateString()
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <Grid justifyContent="center" alignItems="center" mx={2} gridGap={2} gridAutoFlow="column">
            <Button size="small" variant="secondary" backgroundColor="red" onClick={() => deleteApplication(row.original.id)}>
              <RiDeleteBin5Line />
            </Button>
          </Grid>
        ),
        width: 100,
      },

    ],
    []
  )

  //const data = useMemo(() => makeData(100000), [])
  const deleteApplication = (id) => {
    axios.delete('/application-datasets/' + id).then(
      () => getDatasets()
    )
  }

  const getDatasets = () => {
    axios.get('/application-datasets/' + applicationId).then(res => {
      setData(res.data.result)
    })
  }

  useEffect(() => {
    getDatasets()
  }, [])

  return (
    <>
      <SLink to={`/application/${applicationId}/dataset/add`} >
        <RiEditFill />
      </SLink>
      <Table columns={columns} data={data} />
    </>
  )
}

export default ApplicationDatasetList

export const SLink = styled(Link)`
  padding: 7px 15px;
  border-radius: 8px;
  display: block;
  color: #F51963;
  text-decoration: none;
  align-self: center;
  max-width: 60px;
  justify-content: center;
  background-color: black;
  &:hover {
    background-color: gray;
  }
`;
