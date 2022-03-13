import Table from "../core/Table/"
import { useMemo, useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { Button } from "../../molecules"
import { RiDeleteBin5Line, RiEditFill } from "react-icons/ri";
import styled from "styled-components";
import { Flex, FlexItem, Grid } from "../../elements";


const DatasetList = () => {

  const [data, setData] = useState([])

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 50
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Data Type',
        accessor: 'data_type',
      },
      {
        Header: 'Updated At',
        accessor: 'createdAt',
        Cell: ({ row }) => (
          new Date(row.original.createdAt).toLocaleDateString()
        ),
      },
      {
        Header: 'Status',
        accessor: 'updatedAt',
        Cell: ({ row }) => (
          new Date(row.original.updatedAt).toLocaleDateString()
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <Grid justifyContent="center" alignItems="center"  mx={2} gridGap={2} gridAutoFlow="column">
            <SLink to={`${row.original.id}/add-update`} >
              <RiEditFill/>
            </SLink>
            <Button size="small" variant="secondary" backgroundColor="red">
              <RiDeleteBin5Line/>
            </Button>
          </Grid>
        ),
        width: 100,
      },

    ],
    []
  )

  //const data = useMemo(() => makeData(100000), [])

  const getDatasets = () => {
    axios.get('data-sets/').then(res => {
      setData(res.data.results)
    })
  }

  useEffect(() => {
    getDatasets()
  }, [])

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  )
}

export default DatasetList

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

